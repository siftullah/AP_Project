

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

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    
    const courses = await prisma.course.findMany({
      where: {
        department: {
          university_id: universityId
        }
      },
      include: {
        department: true,
        classrooms: {
          include: {
            enrollments: true
          }
        }
      }
    })

    
    const formattedCourses = courses.map(course => {
      
      const studentCount = course.classrooms.reduce((total, classroom) => {
        return total + classroom.enrollments.length
      }, 0)

      return {
        id: course.id,
        name: course.course_name,
        code: course.course_code,
        department: course.department.name,
        department_id: course.department.id,
        classroom_count: course.classrooms.length,
        student_count: studentCount
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(formattedCourses)

  } catch (error) {
    console.error('Error in get-courses:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch courses' })
  }
}