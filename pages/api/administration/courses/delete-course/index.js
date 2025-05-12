import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  
  try {
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get course_id from request body
    const { course_id } = req.body

    // Get existing course
    const existingCourse = await prisma.course.findUnique({
      where: { id: course_id }
    })

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' })
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
    return res.json({ 
      message: 'Course deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-course:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete course' })
  }
}