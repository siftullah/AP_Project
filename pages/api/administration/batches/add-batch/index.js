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

    
    const { name } = req.body

    
    const batch = await prisma.batch.create({
      data: {
        name,
        university_id: universityId
      }
    })

    
    const group = await prisma.group.create({
      data: {
        name: `${name} Group`,
        type: 'batch',
        batch: {
          create: {
            batch_id: batch.id
          }
        }
      }
    })

    
    const batchWithGroups = await prisma.batch.findUnique({
      where: {
        id: batch.id
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
      message: 'Batch created successfully',
      batch: batchWithGroups
    })

  } catch (error) {
    console.error('Error in add-batch:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create batch' })
  }
}