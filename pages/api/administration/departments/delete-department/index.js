

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

    
    const { department_id } = req.body

    
    const existingDepartment = await prisma.department.findUnique({
      where: { id: department_id }
    })

    if (!existingDepartment) {
      return res.status(404).json({ error: 'Department not found' })
    }

    
    await prisma.$transaction(async (tx) => {
      
      await tx.departmentGroup.deleteMany({
        where: { department_id: department_id }
      })

      
      const courses = await tx.course.findMany({
        where: { dept_id: department_id },
        select: { id: true }
      })
      
      const courseIds = courses.map(course => course.id)

      
      for (const courseId of courseIds) {
        const classrooms = await tx.classroom.findMany({
          where: { course_id: courseId },
          select: { id: true }
        })
        
        const classroomIds = classrooms.map(classroom => classroom.id)

        
        await tx.classroomTeachers.deleteMany({
          where: { classroom_id: { in: classroomIds } }
        })

        
        await tx.enrollment.deleteMany({
          where: { classroom_id: { in: classroomIds } }
        })

        
        const threads = await tx.classroomThread.findMany({
          where: { classroom_id: { in: classroomIds } },
          select: { id: true }
        })

        const threadIds = threads.map(thread => thread.id)

        
        await tx.classroomPostAttachments.deleteMany({
          where: { post: { thread_id: { in: threadIds } } }
        })

        await tx.classroomPost.deleteMany({
          where: { thread_id: { in: threadIds } }
        })

        await tx.classroomThread.deleteMany({
          where: { classroom_id: { in: classroomIds } }
        })

        
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

        
        await tx.classroom.deleteMany({
          where: { course_id: courseId }
        })
      }

      
      await tx.course.deleteMany({
        where: { dept_id: department_id }
      })

      
      const faculty = await tx.faculty.findMany({
        where: { dept_id: department_id },
        include: { user: true }
      })

      
      await tx.faculty.deleteMany({
        where: { dept_id: department_id }
      })

      
      const departmentBatches = await tx.departmentBatches.findMany({
        where: { dept_id: department_id },
        include: {
          students: {
            include: { user: true }
          }
        }
      })

      const batchIds = departmentBatches.map(batch => batch.id)

      
      const students = departmentBatches.flatMap(batch => batch.students)

      
      const userIds = [
        ...faculty.map(f => f.user.id),
        ...students.map(s => s.user.id)
      ]

      
      for (const userId of userIds) {
        
        await tx.customGroupMembers.deleteMany({
          where: { user_id: userId }
        })

        
        await tx.customGroup.deleteMany({
          where: { user_id: userId }
        })

        
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

      
      await tx.department.delete({
        where: { id: department_id }
      })

      
      for (const userId of userIds) {
        await client.users.deleteUser(userId)
      }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Department deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-department:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete department' })
  }
}