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

    // Get departments with related counts
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

    // Format the response with counts
    const formattedDepartments = departments.map(dept => {
      // Count total students across all batches
      const studentCount = dept.batches.reduce((total, batch) => {
        return total + batch.students.length
      }, 0)

      // Count total classrooms across all courses
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
    return NextResponse.json(formattedDepartments)

  } catch (error) {
    console.error('Error in get-departments:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}