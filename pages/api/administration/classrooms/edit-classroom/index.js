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
    const { classroom_id, name: classroom_name, batch_id, course_id } = req.body
    console.log('Request body:', JSON.stringify(req.body, null, 2))
    console.log('Parsed values:', JSON.stringify({
      classroom_id,
      classroom_name,
      batch_id,
      course_id
    }, null, 2))

    if (!classroom_id) {
      return res.status(400).json({ error: 'Classroom ID is required' })
    }

    // Verify classroom exists and belongs to user's university
    const existingClassroom = await prisma.classroom.findFirst({
      where: {
        id: classroom_id,
        course: {
          department: {
            university_id: universityId
          }
        }
      }
    })

    if (!existingClassroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }

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

    // Update classroom
    const classroom = await prisma.classroom.update({
      where: {
        id: classroom_id
      },
      data: {
        name: classroom_name,
        course_id: course_id,
        batch_id: batch_id
      }
    })

    await prisma.$disconnect()
    return res.json({ 
      message: 'Classroom updated successfully',
      classroom
    })

  } catch (error) {
    console.error('Error in edit-classroom:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update classroom' })
  }
}