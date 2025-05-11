import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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
    const { forum_id, thread_title, description } = req.body

    // Validate required fields
    if (!forum_id || !thread_title || !description) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create thread first
    const thread = await prisma.thread.create({
      data: {
        forum: {
          connect: { id: forum_id }
        },
        university: {
          connect: { id: universityId }
        },
        type: 'general',
        title: thread_title
      }
    })

    // Create thread post
    const threadPost = await prisma.threadPost.create({
      data: {
        thread_id: thread.id,
        user_id: userId,
        type: 'main',
        description: description
      }
    })

    // Update thread with main post
    await prisma.thread.update({
      where: { id: thread.id },
      data: {
        main_post: {
          connect: { id: threadPost.id }
        }
      }
    })

    await prisma.$disconnect()
    return res.json({ thread_id: thread.id })

  } catch (error) {
    console.error('Error in create-thread:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create thread' })
  }
}
