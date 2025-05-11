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

    // Get batches with related counts
    const batches = await prisma.batch.findMany({
      where: {
        university_id: universityId
      },
      include: {
        departments: {
          include: {
            students: true
          }
        },
        classrooms: true
      }
    })

    // Format the response with counts
    const formattedBatches = batches.map(batch => {
      // Count total students across all departments
      const studentCount = batch.departments.reduce((total, dept) => {
        return total + dept.students.length
      }, 0)

      return {
        id: batch.id,
        name: batch.name,
        student_count: studentCount,
        classroom_count: batch.classrooms.length
      }
    })

    await prisma.$disconnect()
    return res.json(formattedBatches)

  } catch (error) {
    console.error('Error in get-batches:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch batches' })
  }
}