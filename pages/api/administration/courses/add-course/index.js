

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

    // Get course details from request body
    const { department_id, course_name, course_code } = req.body

    // Verify department exists and belongs to user's university
    const department = await prisma.department.findFirst({
      where: {
        id: department_id,
        university_id: universityId
      }
    })

    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        course_name,
        course_code,
        dept_id: department_id
      }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Course created successfully',
      course
    })

  } catch (error) {
    console.error('Error in add-course:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create course' })
  }
}