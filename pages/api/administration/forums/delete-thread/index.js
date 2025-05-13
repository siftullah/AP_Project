

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

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get thread_id from query params
    const { thread_id } = req.query

    if (!thread_id) {
      return res.status(400).json({ error: 'Thread ID is required' })
    }

    // Delete all post attachments for all posts in the thread
    await prisma.threadPostAttachments.deleteMany({
      where: {
        post: {
          thread_id: thread_id
        }
      }
    })

    // Delete all posts in the thread
    await prisma.threadPost.deleteMany({
      where: {
        thread_id: thread_id
      }
    })

    // Delete the thread
    const deletedThread = await prisma.thread.delete({
      where: {
        id: thread_id,
        university_id: universityId
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(deletedThread)

  } catch (error) {
    console.error('Error in delete-thread:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete thread' })
  }
}