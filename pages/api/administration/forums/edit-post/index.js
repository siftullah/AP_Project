

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
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

    // Get request body
    const { postId, description } = req.body

    if (!postId || !description) {
      return res.status(400).json({ error: 'Post ID and description are required' })
    }

    // Update post
    const updatedPost = await prisma.threadPost.update({
      where: {
        id: postId
      },
      data: {
        description: description
      }
    })

    await prisma.$disconnect()
    return res.json(updatedPost)

  } catch (error) {
    console.error('Error in edit-post:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update post' })
  }
}
