

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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

    
    const { thread_id: threadId } = req.query

    if (!threadId) {
      return res.status(400).json({ error: 'Thread ID is required' })
    }

    
    await prisma.submissionAttachments.deleteMany({
      where: {
        submission: {
          assignment: {
            thread_id: threadId
          }
        }
      }
    })

    
    await prisma.submission.deleteMany({
      where: {
        assignment: {
          thread_id: threadId
        }
      }
    })

    
    await prisma.assignment.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    
    await prisma.classroomPostAttachments.deleteMany({
      where: {
        post: {
          thread_id: threadId
        }
      }
    })

    
    await prisma.classroomPost.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    
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