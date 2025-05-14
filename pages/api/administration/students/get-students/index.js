

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

    
    const students = await prisma.student.findMany({
      where: {
        department_batch: {
          department: {
            university_id: universityId
          }
        }
      },
      select: {
        id: true,
        roll_number: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            email_address: true
          }
        },
        department_batch: {
          select: {
            department: {
              select: {
                id: true,
                name: true
              }
            },
            batch: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        enrollments: {
          select: {
            classroom: {
              select: {
                course_id: true
              }
            }
          }
        }
      }
    })

    
    const formattedStudents = students.map(student => ({
      id: student.id,
      roll_number: student.roll_number,
      first_name: student.user.first_name,
      last_name: student.user.last_name,
      email: student.user.email_address,
      department: student.department_batch.department.name,
      department_id: student.department_batch.department.id,
      batch: student.department_batch.batch.name,
      batch_id: student.department_batch.batch.id,
      enrolled_courses_count: new Set(student.enrollments.map(e => e.classroom.course_id)).size
    }))

    await prisma.$disconnect()
    return res.status(200).json(formattedStudents)

  } catch (error) {
    console.error('Error in get-students:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch students' })
  }
}