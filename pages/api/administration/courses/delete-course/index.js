import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get course_id from request body
    const { course_id } = await request.json()

    // Get existing course
    const existingCourse = await prisma.course.findUnique({
      where: { id: course_id }
    })

    if (!existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Get all classrooms for this course
      const classrooms = await tx.classroom.findMany({
        where: { course_id: course_id },
        select: { id: true }
      })
      
      const classroomIds = classrooms.map(classroom => classroom.id)

      // Delete classroom related records
      for (const classroomId of classroomIds) {
        // Delete ClassroomTeachers
        await tx.classroomTeachers.deleteMany({
          where: { classroom_id: classroomId }
        })

        // Delete Enrollments
        await tx.enrollment.deleteMany({
          where: { classroom_id: classroomId }
        })

        // Delete ClassroomThreads and related records
        const threads = await tx.classroomThread.findMany({
          where: { classroom_id: classroomId },
          select: { id: true }
        })

        const threadIds = threads.map(thread => thread.id)

        // Delete ClassroomPosts and attachments
        await tx.classroomPostAttachments.deleteMany({
          where: { post: { thread_id: { in: threadIds } } }
        })

        await tx.classroomPost.deleteMany({
          where: { thread_id: { in: threadIds } }
        })

        await tx.classroomThread.deleteMany({
          where: { classroom_id: classroomId }
        })

        // Delete Assignments and related records
        const assignments = await tx.assignment.findMany({
          where: { classroom_id: classroomId },
          select: { id: true }
        })

        const assignmentIds = assignments.map(assignment => assignment.id)

        await tx.submissionAttachments.deleteMany({
          where: { submission: { assignment_id: { in: assignmentIds } } }
        })

        await tx.submission.deleteMany({
          where: { assignment_id: { in: assignmentIds } }
        })

        await tx.assignment.deleteMany({
          where: { classroom_id: classroomId }
        })
      }

      // Delete Classrooms
      await tx.classroom.deleteMany({
        where: { course_id: course_id }
      })

      // Finally delete the Course
      await tx.course.delete({
        where: { id: course_id }
      })
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Course deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-course:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}