export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found'  }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get classrooms with related data
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

    // Format the response
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
    return NextResponse.json(formattedClassrooms)

  } catch (error) {
    console.error('Error in get-classrooms:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch classrooms' },
      { status: 500 }
    )
  }
}