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

    // Get classroom details from request body
    const { name, course_id, batch_id } = req.body

    // Verify course exists and belongs to user's university
    const course = await prisma.course.findFirst({
      where: {
        id: course_id,
        department: {
          university_id: universityId
        }
      }
    })

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    // Verify batch exists and belongs to user's university
    const batch = await prisma.batch.findFirst({
      where: {
        id: batch_id,
        university_id: universityId
      }
    })

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' })
    }

    // Create classroom
    const classroom = await prisma.classroom.create({
      data: {
        name,
        course_id,
        batch_id
      }
    })

    await prisma.$disconnect()
    return res.json({ 
      message: 'Classroom created successfully',
      classroom
    })

  } catch (error) {
    console.error('Error in add-classroom:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create classroom' })
  }
}