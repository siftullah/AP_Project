

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

    // Get enrolled students for the classroom
    const enrolledStudents = await prisma.enrollment.findMany({
      where: {
        classroom_id: classroom_id
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            }
          }
        }
      }
    })

    // Get all students from the university
    const allUniversityStudents = await prisma.student.findMany({
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
            id: true,
            first_name: true,
            last_name: true
          }
        }
      }
    })

    // Format enrolled students data
    const enrolledStudentsList = enrolledStudents.map(enrollment => ({
      user_id: enrollment.student.user.id,
      roll_number: enrollment.student.roll_number,
      name: `${enrollment.student.user.first_name} ${enrollment.student.user.last_name}`
    }))

    // Format all university students data with enrollment status
    const allStudentsList = allUniversityStudents.map(student => ({
      user_id: student.user.id,
      roll_number: student.roll_number,
      name: `${student.user.first_name} ${student.user.last_name}`,
      is_enrolled: enrolledStudents.some(enrollment => enrollment.student.user.id === student.user.id)
    }))

    await prisma.$disconnect()
    return res.status(200).json({
      enrolled_students: enrolledStudentsList,
      all_students: allStudentsList
    })

  } catch (error) {
    console.error('Error in get-students:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch students' })
  }
}