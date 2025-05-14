import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    
    const roles = await prisma.uniAdministrationRoles.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true,
        role: true
      }
    })

    await prisma.$disconnect()
    return res.json(roles)

  } catch (error) {
    console.error('Error in get-roles:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch roles' })
  }
}