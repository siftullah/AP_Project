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

    
    const classrooms = await prisma.classroom.findMany({
      where: {
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
        enrollments: true,
        teachers: {
          where: {
            type: {
              equals: 'faculty',
              mode: 'insensitive'
            }
          },
          include: {
            user: true
          }
        }
      }
    })

    
    const formattedClassrooms = classrooms.map(classroom => {
      const teacherNames = classroom.teachers.map(teacher => 
        `${teacher.user.first_name} ${teacher.user.last_name}`
      )

      return {
        classroom_id: classroom.id,
        classroom_name: classroom.name,
        course_id: classroom.course_id,
        course_name: classroom.course.course_name,
        course_code: classroom.course.course_code,
        department_name: classroom.course.department.name,
        batch_id: classroom.batch_id,
        batch_name: classroom.batch.name,
        student_count: classroom.enrollments.length,
        teachers: teacherNames
      }
    })

    await prisma.$disconnect()
    return res.json(formattedClassrooms)

  } catch (error) {
    console.error('Error in get-classrooms:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch classrooms' })
  }
}