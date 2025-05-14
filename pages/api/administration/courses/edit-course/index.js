

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
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

    
    const { course_id, course_name, course_code, department_id } = req.body

    
    const department = await prisma.department.findFirst({
      where: {
        id: department_id,
        university_id: universityId
      }
    })

    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }

    
    const course = await prisma.course.update({
      where: {
        id: course_id
      },
      data: {
        course_name,
        course_code,
        dept_id: department_id
      }
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Course updated successfully',
      course
    })

  } catch (error) {
    console.error('Error in edit-course:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update course' })
  }
}