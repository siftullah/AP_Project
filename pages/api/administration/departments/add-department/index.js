

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get department name from request body
    const { name } = req.body

    // Create department
    const department = await prisma.department.create({
      data: {
        name,
        university_id: universityId,
        groups: {
          create: {
            group: {
              create: {
                name: `${name} Group`,
                type: 'department'
              }
            }
          }
        }
      },
      include: {
        groups: {
          include: {
            group: true
          }
        }
      }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Department created successfully',
      department
    })

  } catch (error) {
    console.error('Error in add-department:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create department' })
  }
}