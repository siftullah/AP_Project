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

    // Get groups for this university by checking related tables
    const groups = await prisma.group.findMany({
      where: {
        OR: [
          {
            // Check batch groups
            batch: {
              batch: {
                university_id: universityId
              }
            }
          },
          {
            // Check department groups 
            department: {
              department: {
                university_id: universityId
              }
            }
          },
          {
            // Check custom groups
            custom: {
              created_by: {
                university_id: universityId
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true
      }
    })

    await prisma.$disconnect()
    return res.json({ 
      groups: groups.map(group => ({
        group_id: group.id,
        group_name: group.name,
        group_type: group.type,
        created_at: group.createdAt
      }))
    })

  } catch (error) {
    console.error('Error in get-groups:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to get groups' })
  }
}
