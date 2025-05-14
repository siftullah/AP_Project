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

    
    const { group_id, group_name } = req.body

    
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id }
    })

    if (!existingGroup) {
      return res.status(404).json({ error: 'Group not found' })
    }

    
    const updatedGroup = await prisma.group.update({
      where: { id: group_id },
      data: { name: group_name }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Group updated successfully',
      group: updatedGroup
    })

  } catch (error) {
    console.error('Error in edit-group:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update group' })
  }
}
