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

    // Get all users for this university with their details
    const users = await prisma.user.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true
      }
    })

    // Format user data
    const formattedUsers = users.map(user => ({
      user_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      role: user.role
    }))

    await prisma.$disconnect()
    return res.status(200).json({ users: formattedUsers })

  } catch (error) {
    console.error('Error in get-users:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch users' })
  }
}
