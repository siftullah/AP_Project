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

    // Get all roles for this university with their permissions
    const roles = await prisma.uniAdministrationRoles.findMany({
      where: {
        university_id: universityId
      },
      include: {
        permissions: {
          select: {
            permission_id: true,
            permission: {
              select: {
                permission: true
              }
            }
          }
        }
      }
    })

    // Format the response
    const formattedRoles = roles.map(role => ({
      id: role.id,
      role: role.role,
      permissions: role.permissions.map(p => ({
        id: p.permission_id,
        permission: p.permission.permission
      })),
      createdAt: role.createdAt,
      university_id: role.university_id
    }))

    await prisma.$disconnect()
    return res.status(200).json(formattedRoles)

  } catch (error) {
    console.error('Error in get-roles:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch roles' })
  }
}