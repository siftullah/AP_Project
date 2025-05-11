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

    // Get classroom_id from request body
    const { classroom_id } = req.body

    // Get existing classroom
    const existingClassroom = await prisma.classroom.findUnique({
      where: { id: classroom_id }
    })

    if (!existingClassroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete ClassroomTeachers
      await tx.classroomTeachers.deleteMany({
        where: { classroom_id }
      })

      // Delete Enrollments
      await tx.enrollment.deleteMany({
        where: { classroom_id }
      })

      // Delete ClassroomThreads and related records
      const threads = await tx.classroomThread.findMany({
        where: { classroom_id },
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
        where: { classroom_id }
      })

      // Delete Assignments and related records
      const assignments = await tx.assignment.findMany({
        where: { classroom_id },
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
        where: { classroom_id }
      })

      // Finally delete the Classroom
      await tx.classroom.delete({
        where: { id: classroom_id }
      })
    })

    await prisma.$disconnect()
    return res.json({ 
      message: 'Classroom deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-classroom:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete classroom' })
  }
}