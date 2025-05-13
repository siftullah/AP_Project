

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    
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

    // Get classroom ID from URL
    const { classroom_id } = req.query

    if (!classroom_id) {
      return res.status(400).json({ error: 'Classroom ID is required' })
    }

    // Get classroom with related data
    const classroom = await prisma.classroom.findFirst({
      where: {
        id: classroom_id,
        course: {
          department: {
            university_id: universityId
          }
        }
      },
      include: {
        course: {
          include: {
            department: true
          }
        },
        batch: true,
        enrollments: true
      }
    })

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' })
    }

    // Format the response
    const formattedClassroom = {
      classroom_id: classroom.id,
      classroom_name: classroom.name,
      course_id: classroom.course_id,
      course_name: classroom.course.course_name,
      course_code: classroom.course.course_code,
      department_name: classroom.course.department.name,
      batch_id: classroom.batch_id,
      batch_name: classroom.batch.name,
      student_count: classroom.enrollments.length
    }

    await prisma.$disconnect()
    return res.json(formattedClassroom)

  } catch (error) {
    console.error('Error in get-classroom-details:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch classroom details' })
  }
}