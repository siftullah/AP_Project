

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
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

    // Get request body
    const { threadId, title } = req.body

    if (!threadId || !title) {
      return res.status(400).json({ error: 'Thread ID and title are required' })
    }

    // Update thread
    const updatedThread = await prisma.thread.update({
      where: {
        id: threadId,
        university_id: universityId
      },
      data: {
        title: title
      }
    })

    await prisma.$disconnect()
    return res.json(updatedThread)

  } catch (error) {
    console.error('Error in edit-thread:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update thread' })
  }
}
