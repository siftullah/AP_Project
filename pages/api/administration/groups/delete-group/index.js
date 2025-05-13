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

    // Get request body
    const { group_id } = req.body

    // Check if group exists and is custom type
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id },
      include: {
        custom: true
      }
    })

    if (!existingGroup) {
      return res.status(404).json({ error: 'Group not found' })
    }

    if (existingGroup.type !== 'custom') {
      return res.status(400).json({ error: 'Only custom groups can be deleted' })
    }

    // Delete thread post attachments
    await prisma.threadPostAttachments.deleteMany({
      where: {
        post: {
          thread: {
            group_id: group_id
          }
        }
      }
    })

    // Delete thread posts
    await prisma.threadPost.deleteMany({
      where: {
        thread: {
          group_id: group_id
        }
      }
    })

    // Delete threads
    await prisma.thread.deleteMany({
      where: {
        group_id: group_id
      }
    })

    // Delete forums
    await prisma.forum.deleteMany({
      where: {
        group_id: group_id
      }
    })

    // Delete custom group members first
    await prisma.customGroupMembers.deleteMany({
      where: { custom_group_id: existingGroup.custom.id }
    })

    // Delete custom group
    await prisma.customGroup.delete({
      where: { group_id: group_id }
    })

    // Delete base group
    await prisma.group.delete({
      where: { id: group_id }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Group deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-group:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete group' })
  }
}
