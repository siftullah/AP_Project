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

    // Get batch_id from request body
    const { batch_id } = req.body

    // Get existing batch
    const existingBatch = await prisma.batch.findUnique({
      where: { id: batch_id }
    })

    if (!existingBatch) {
      return res.status(404).json({ error: 'Batch not found' })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete from BatchGroup
      await tx.batchGroup.deleteMany({
        where: { batch_id: batch_id }
      })

      // Delete Classrooms and related records
      const classrooms = await tx.classroom.findMany({
        where: { batch_id: batch_id },
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
        where: { batch_id: batch_id }
      })

      // Delete DepartmentBatches and related Students
      const departmentBatches = await tx.departmentBatches.findMany({
        where: { batch_id: batch_id },
        include: {
          students: {
            include: { user: true }
          }
        }
      })

      // Get all student users before deleting
      const students = departmentBatches.flatMap(batch => batch.students)
      const userIds = students.map(s => s.user.id)

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
        where: { department_batch_id: { in: departmentBatches.map(db => db.id) } }
      })

      await tx.departmentBatches.deleteMany({
        where: { batch_id: batch_id }
      })

      // Finally delete the Batch
      await tx.batch.delete({
        where: { id: batch_id }
      })

      // Delete users from Clerk after all DB records are cleaned
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