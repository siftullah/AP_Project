

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

    
    const departments = await prisma.department.findMany({
      where: {
        university_id: universityId
      },
      include: {
        batches: {
          include: {
            students: true
          }
        },
        courses: {
          include: {
            classrooms: true
          }
        },
        faculties: true
      }
    })

    
    const formattedDepartments = departments.map(dept => {
      
      const studentCount = dept.batches.reduce((total, batch) => {
        return total + batch.students.length
      }, 0)

      
      const classroomCount = dept.courses.reduce((total, course) => {
        return total + course.classrooms.length
      }, 0)

      return {
        id: dept.id,
        name: dept.name,
        student_count: studentCount,
        course_count: dept.courses.length,
        classroom_count: classroomCount,
        faculty_count: dept.faculties.length
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(formattedDepartments)

  } catch (error) {
    console.error('Error in get-departments:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch departments' })
  }
}