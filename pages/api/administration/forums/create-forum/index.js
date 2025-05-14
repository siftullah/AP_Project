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

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    
    const { forum_name, group_id } = req.body

    if (!forum_name) {
      return res.status(400).json({ error: 'Forum name is required' })
    }

    
    if (group_id) {
      const group = await prisma.group.findUnique({
        where: { id: group_id }
      })
      if (!group) {
        return res.status(400).json({ error: 'Invalid group ID provided' })
      }
    }

    
    const newForum = await prisma.forum.create({
      data: {
        forum_name,
        university_id: universityId,
        user_id: userId,
        ...(group_id && { group_id }) 
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(newForum)

  } catch (error) {
    console.error('Error in create-forum:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create forum' })
  }
}
