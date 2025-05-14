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

    
    const { group_name, type, batch_id, department_id, user_ids } = req.body

    
    const group = await prisma.group.create({
      data: {
        name: group_name,
        type: type
      }
    })

    
    if (type === 'batch' && batch_id) {
      await prisma.batchGroup.create({
        data: {
          group_id: group.id,
          batch_id: batch_id
        }
      })
    } 
    else if (type === 'department' && department_id) {
      await prisma.departmentGroup.create({
        data: {
          group_id: group.id,
          department_id: department_id
        }
      })
    }
    else if (type === 'custom' && user_ids && Array.isArray(user_ids)) {
      
      const customGroup = await prisma.customGroup.create({
        data: {
          group_id: group.id,
          user_id: user.id 
        }
      })

      
      const memberPromises = user_ids.map(userId =>
        prisma.customGroupMembers.create({
          data: {
            custom_group_id: customGroup.id,
            user_id: userId
          }
        })
      )
      await Promise.all(memberPromises)
    }
    else {
      return res.status(400).json({ error: 'Invalid group type or missing required fields' })
    }

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Group created successfully',
      group
    })

  } catch (error) {
    console.error('Error in add-group:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create group' })
  }
}
