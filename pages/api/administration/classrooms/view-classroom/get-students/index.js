export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
   
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get classroom ID from URL
    const { searchParams } = new URL(request.url)
    const classroomId = searchParams.get('classroom_id')

    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 })
    }

    // Get enrolled students for the classroom
    const enrolledStudents = await prisma.enrollment.findMany({
      where: {
        classroom_id: classroomId
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
    return NextResponse.json({
      enrolled_students: enrolledStudentsList,
      all_students: allStudentsList
    })

  } catch (error) {
    console.error('Error in get-students:', error)
    await prisma.$disconnect() 
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}