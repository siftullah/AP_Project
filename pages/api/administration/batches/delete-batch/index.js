import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    
    const { batch_id } = req.body

    
    const existingBatch = await prisma.batch.findUnique({
      where: { id: batch_id }
    })

    if (!existingBatch) {
      return res.status(404).json({ error: 'Batch not found' })
    }

    
    await prisma.$transaction(async (tx) => {
      
      await tx.batchGroup.deleteMany({
        where: { batch_id: batch_id }
      })

      
      const classrooms = await tx.classroom.findMany({
        where: { batch_id: batch_id },
        select: { id: true }
      })
      
      const classroomIds = classrooms.map(classroom => classroom.id)

      
      for (const classroomId of classroomIds) {
        
        await tx.classroomTeachers.deleteMany({
          where: { classroom_id: classroomId }
        })

        
        await tx.enrollment.deleteMany({
          where: { classroom_id: classroomId }
        })

        
        const threads = await tx.classroomThread.findMany({
          where: { classroom_id: classroomId },
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
          where: { classroom_id: classroomId }
        })

        
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

      
      await tx.classroom.deleteMany({
        where: { batch_id: batch_id }
      })

      
      const departmentBatches = await tx.departmentBatches.findMany({
        where: { batch_id: batch_id },
        include: {
          students: {
            include: { user: true }
          }
        }
      })

      
      const students = departmentBatches.flatMap(batch => batch.students)
      const userIds = students.map(s => s.user.id)

      
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
        where: { department_batch_id: { in: departmentBatches.map(db => db.id) } }
      })

      await tx.departmentBatches.deleteMany({
        where: { batch_id: batch_id }
      })

      
      await tx.batch.delete({
        where: { id: batch_id }
      })

      
      for (const userId of userIds) {
        await client.users.deleteUser(userId)
      }
    })

    await prisma.$disconnect()
    return res.json({ 
      message: 'Batch deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-batch:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete batch' })
  }
}