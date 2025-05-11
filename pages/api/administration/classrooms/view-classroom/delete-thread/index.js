

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
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

    // Get thread_id from URL params
    const { thread_id: threadId } = req.query

    if (!threadId) {
      return res.status(400).json({ error: 'Thread ID is required' })
    }

    // Delete submission attachments first
    await prisma.submissionAttachments.deleteMany({
      where: {
        submission: {
          assignment: {
            thread_id: threadId
          }
        }
      }
    })

    // Delete submissions
    await prisma.submission.deleteMany({
      where: {
        assignment: {
          thread_id: threadId
        }
      }
    })

    // Delete assignments
    await prisma.assignment.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    // Delete all post attachments for all posts in the thread
    await prisma.classroomPostAttachments.deleteMany({
      where: {
        post: {
          thread_id: threadId
        }
      }
    })

    // Delete all posts in the thread
    await prisma.classroomPost.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    // Delete the thread
    const deletedThread = await prisma.classroomThread.delete({
      where: {
        id: threadId
      }
    })

    await prisma.$disconnect()
    return res.json(deletedThread)

  } catch (error) {
    console.error('Error in delete-thread:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete thread' })
  }
}