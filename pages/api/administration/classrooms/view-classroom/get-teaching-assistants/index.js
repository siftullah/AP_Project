

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    // Get classroom ID from URL
    const { classroom_id: classroomId } = req.query

    if (!classroomId) {
      return res.status(400).json({ error: 'Classroom ID is required' })
    }

    // Get classroom teachers where type is ta
    const classroomTeachers = await prisma.classroomTeachers.findMany({
      where: {
        classroom_id: classroomId,
        type: {
          equals: 'ta',
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        user_id: true
      }
    })

    // Get all students for the university
    const students = await prisma.student.findMany({
      where: {
        department_batch: {
          department: {
            university_id: universityId
          }
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            id: true
          }
        },
        department_batch: {
          include: {
            department: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // Group students by department
    const studentsByDepartment = {}
    students.forEach(student => {
      const department = student.department_batch.department.name
      
      if (!studentsByDepartment[department]) {
        studentsByDepartment[department] = []
      }

      studentsByDepartment[department].push({
        user_id: student.user.id,
        name: `${student.user.first_name} ${student.user.last_name}`,
        is_classroom_teacher: classroomTeachers.some(ct => ct.user_id === student.user.id),
        classroom_teacher_id: classroomTeachers.find(ct => ct.user_id === student.user.id)?.id
      })
    })

    await prisma.$disconnect()
    return res.status(200).json({
      students_by_department: studentsByDepartment
    })

  } catch (error) {
    console.error('Error in get-teaching-assistants:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch teaching assistants' })
  }
}