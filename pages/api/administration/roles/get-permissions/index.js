import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify authentication
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    // Get all permissions from the Permission table
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        permission: true
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(permissions)

  } catch (error) {
    console.error('Error in get-permissions:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch permissions' })
  }
}