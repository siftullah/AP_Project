import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
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
        custom: {
          include: {
            members: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    if (!existingGroup) {
      return res.status(404).json({ error: 'Group not found' })
    }

    if (existingGroup.type !== 'custom') {
      return res.status(400).json({ error: 'Not a custom group' })
    }

    // Get member details
    const members = existingGroup.custom?.members.map(member => ({
      name: `${member.user.first_name} ${member.user.last_name}`,
      role: member.user.role
    }))

    await prisma.$disconnect()
    return res.status(200).json({ 
      group_name: existingGroup.name,
      members: members
    })

  } catch (error) {
    console.error('Error in view-group:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to get group details' })
  }
}
