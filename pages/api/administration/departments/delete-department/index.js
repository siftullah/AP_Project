export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser,clerkClient } from '@clerk/nextjs/server'
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

    // Get department_id from request body
    const { department_id } = await request.json()

    // Get existing department
    const existingDepartment = await prisma.department.findUnique({
      where: { id: department_id }
    })

    if (!existingDepartment) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete from DepartmentGroup
      await tx.departmentGroup.deleteMany({
        where: { department_id: department_id }
      })

      // Delete from Course and related Classrooms
      const courses = await tx.course.findMany({
        where: { dept_id: department_id },
        select: { id: true }
      })
      
      const courseIds = courses.map(course => course.id)

      // Delete classroom related records
      for (const courseId of courseIds) {
        const classrooms = await tx.classroom.findMany({
          where: { course_id: courseId },
          select: { id: true }
        })
        
        const classroomIds = classrooms.map(classroom => classroom.id)

        // Delete ClassroomTeachers
        await tx.classroomTeachers.deleteMany({
          where: { classroom_id: { in: classroomIds } }
        })

        // Delete Enrollments
        await tx.enrollment.deleteMany({
          where: { classroom_id: { in: classroomIds } }
        })

        // Delete ClassroomThreads and related records
        const threads = await tx.classroomThread.findMany({
          where: { classroom_id: { in: classroomIds } },
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
          where: { classroom_id: { in: classroomIds } }
        })

        // Delete Assignments and related records
        const assignments = await tx.assignment.findMany({
          where: { classroom_id: { in: classroomIds } },
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
          where: { classroom_id: { in: classroomIds } }
        })

        // Delete Classrooms
        await tx.classroom.deleteMany({
          where: { course_id: courseId }
        })
      }

      // Delete Courses
      await tx.course.deleteMany({
        where: { dept_id: department_id }
      })

      // Get Faculty users before deleting
      const faculty = await tx.faculty.findMany({
        where: { dept_id: department_id },
        include: { user: true }
      })

      // Delete Faculty from database
      await tx.faculty.deleteMany({
        where: { dept_id: department_id }
      })

      // Delete DepartmentBatches and related Students
      const departmentBatches = await tx.departmentBatches.findMany({
        where: { dept_id: department_id },
        include: {
          students: {
            include: { user: true }
          }
        }
      })

      const batchIds = departmentBatches.map(batch => batch.id)

      // Get all student users before deleting
      const students = departmentBatches.flatMap(batch => batch.students)

      // Get all user IDs that will be deleted
      const userIds = [
        ...faculty.map(f => f.user.id),
        ...students.map(s => s.user.id)
      ]

      // Delete user related records
      for (const userId of userIds) {
        // Delete CustomGroupMembers
        await tx.customGroupMembers.deleteMany({
          where: { user_id: userId }
        })

        // Delete CustomGroups created by user
        await tx.customGroup.deleteMany({
          where: { user_id: userId }
        })

        // Delete ThreadPostAttachments and ThreadPosts
        const threadPosts = await tx.threadPost.findMany({
          where: { user_id: userId }
        })

        for (const post of threadPosts) {
          await tx.threadPostAttachments.deleteMany({
            where: { thread_post_id: post.id }
          })
        }

        await tx.threadPost.deleteMany({
          where: { user_id: userId }
        })

        // Delete Forums created by user
        await tx.forum.deleteMany({
          where: { user_id: userId }
        })

      }

      await tx.student.deleteMany({
        where: { department_batch_id: { in: batchIds } }
      })

      await tx.departmentBatches.deleteMany({
        where: { dept_id: department_id }
      })

      // Finally delete the Department
      await tx.department.delete({
        where: { id: department_id }
      })
const clerk_client = await clerkClient()
      // Delete users from Clerk after all DB records are cleaned
      for (const userId of userIds) {
        await clerk_client.users.deleteUser(userId)
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Department deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-department:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 500 }
    )
  }
}