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

    // Get departments and their courses
    const departments = await prisma.department.findMany({
      where: {
        university_id: universityId
      },
      include: {
        courses: {
          select: {
            id: true,
            course_name: true,
            course_code: true
          }
        }
      }
    })

    // Format response to group courses by department
    const formattedDepartments = departments.map(department => ({
      department_name: department.name,
      courses: department.courses.map(course => ({
        course_id: course.id,
        course_name: course.course_name,
        course_code: course.course_code
      }))
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedDepartments)

  } catch (error) {
    console.error('Error in get-courses:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}