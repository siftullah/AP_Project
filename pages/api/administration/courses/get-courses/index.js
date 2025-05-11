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

    // Get courses with related department, classrooms and enrollments
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

    // Format the response
    const formattedCourses = courses.map(course => {
      // Count total students across all classrooms
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
    return NextResponse.json(formattedCourses)

  } catch (error) {
    console.error('Error in get-courses:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}