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

    
    const { batch_id, batch_name } = req.body

    
    const batch = await prisma.batch.update({
      where: {
        id: batch_id
      },
      data: {
        name: batch_name,
        groups: {
          update: {
            where: {
              batch_id: batch_id
            },
            data: {
              group: {
                update: {
                  name: `${batch_name} Group`,
                  type: 'batch'
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
    return res.json({ 
      message: 'Batch updated successfully',
      batch
    })

  } catch (error) {
    console.error('Error in edit-batch:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update batch' })
  }
}