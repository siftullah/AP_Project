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

    // Get batches for university
    const batches = await prisma.batch.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true, // batch_id
        name: true // batch_name
      }
    })

    // Map to match requested field names
    const mappedBatches = batches.map(batch => ({
      batch_id: batch.id,
      batch_name: batch.name
    }))

    await prisma.$disconnect()
    return res.json(mappedBatches)

  } catch (error) {
    console.error('Error in get-batches:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch batches' })
  }
}