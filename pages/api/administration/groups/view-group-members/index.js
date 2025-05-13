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

    if (!group_id) {
      return res.status(400).json({ error: 'Group ID is required' })
    }

    // First verify if group exists and is custom type
    const group = await prisma.group.findUnique({
      where: { id: group_id }
    })

    if (!group) {
      return res.status(404).json({ error: 'Group not found' })
    }

    if (group.type !== 'custom') {
      return res.status(400).json({ error: 'Only custom groups are supported' })
    }

    // Get members from CustomGroupMembers with user details
    const members = await prisma.customGroupMembers.findMany({
      where: {
        custom_group: {
          group_id: group_id
        }
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            role: true
          }
        }
      }
    })

    // Format members data
    const formattedMembers = members.map(member => ({
      user_id: member.user.id,
      name: `${member.user.first_name} ${member.user.last_name}`,
      role: member.user.role
    }))

    await prisma.$disconnect()
    return res.status(200).json({ members: formattedMembers })

  } catch (error) {
    console.error('Error in view-group-members:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch group members' })
  }
}
