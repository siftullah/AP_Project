

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

    // Get department details from request body
    const { department_id, department_name } = req.body

    // Find and update department and its associated group
    const department = await prisma.department.update({
      where: {
        id: department_id
      },
      data: {
        name: department_name,
        groups: {
          update: {
            where: {
              department_id: department_id
            },
            data: {
              group: {
                update: {
                  name: `${department_name} Group`
                }
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
      message: 'Department updated successfully',
      department
    })

  } catch (error) {
    console.error('Error in edit-department:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update department' })
  }
}