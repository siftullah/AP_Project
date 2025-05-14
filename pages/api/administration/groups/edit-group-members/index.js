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

    
    const { group_id, user_ids } = req.body

    if (!group_id || !user_ids || !Array.isArray(user_ids)) {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }

    
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id },
      include: {
        custom: {
          include: {
            members: true
          }
        }
      }
    })

    if (!existingGroup) {
      return res.status(404).json({ error: 'Group not found' })
    }

    if (existingGroup.type !== 'custom') {
      return res.status(400).json({ error: 'Only custom groups can be edited' })
    }

    
    const existingMemberIds = existingGroup.custom.members.map(member => member.user_id)

    
    const membersToAdd = user_ids.filter(id => !existingMemberIds.includes(id))

    
    const membersToRemove = existingMemberIds.filter(id => !user_ids.includes(id))

    
    if (membersToAdd.length > 0) {
      await prisma.customGroupMembers.createMany({
        data: membersToAdd.map(userId => ({
          custom_group_id: existingGroup.custom.id,
          user_id: userId
        }))
      })
    }

    
    if (membersToRemove.length > 0) {
      
      await prisma.threadPostAttachments.deleteMany({
        where: {
          post: {
            user_id: { in: membersToRemove },
            thread: {
              group_id: group_id
            }
          }
        }
      })

      
      await prisma.threadPost.deleteMany({
        where: {
          user_id: { in: membersToRemove },
          thread: {
            group_id: group_id
          }
        }
      })

      
      await prisma.thread.deleteMany({
        where: {
          group_id: group_id,
          posts: {
            some: {
              user_id: { in: membersToRemove }
            }
          }
        }
      })

      
      await prisma.forum.deleteMany({
        where: {
          group_id: group_id,
          user_id: { in: membersToRemove }
        }
      })

      
      await prisma.customGroupMembers.deleteMany({
        where: {
          custom_group_id: existingGroup.custom.id,
          user_id: { in: membersToRemove }
        }
      })
    }

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Group members updated successfully'
    })

  } catch (error) {
    console.error('Error in edit-group-members:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update group members' })
  }
}
