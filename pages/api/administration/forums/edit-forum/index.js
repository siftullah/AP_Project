

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user?.publicMetadata['university_id']

    // Get forum_id and forum_name from request body
    const { forum_id, forum_name } = req.body

    if (!forum_id) {
      return res.status(400).json({ error: 'Forum ID is required' })
    }

    if (!forum_name) {
      return res.status(400).json({ error: 'Forum name is required' })
    }

    // Update forum
    const updatedForum = await prisma.forum.update({
      where: {
        id: forum_id,
        university_id: universityId
      },
      data: {
        forum_name
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(updatedForum)

  } catch (error) {
    console.error('Error in edit-forum:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update forum' })
  }
}
