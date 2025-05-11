import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }

    // Get request body
    const { threadId, description } = req.body

    if (!threadId || !description) {
      return res.status(400).json({ error: 'Thread ID and description are required' })
    }

    // Create new post
    const post = await prisma.threadPost.create({
      data: {
        thread_id: threadId,
        user_id: userId,
        type: 'reply',
        description: description
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(post)

  } catch (error) {
    console.error('Error in create-post:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create post' })
  }
}
