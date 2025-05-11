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

    // Get classroom ID from URL
    const { searchParams } = new URL(request.url)
    const classroomId = searchParams.get('classroom_id')

    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 })
    }

    // Get classroom with related data
    const classroom = await prisma.classroom.findFirst({
      where: {
        id: classroomId,
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
        enrollments: true
      }
    })

    if (!classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    // Format the response
    const formattedClassroom = {
      classroom_id: classroom.id,
      classroom_name: classroom.name,
      course_id: classroom.course_id,
      course_name: classroom.course.course_name,
      course_code: classroom.course.course_code,
      department_name: classroom.course.department.name,
      batch_id: classroom.batch_id,
      batch_name: classroom.batch.name,
      student_count: classroom.enrollments.length
    }

    await prisma.$disconnect()
    return NextResponse.json(formattedClassroom)

  } catch (error) {
    console.error('Error in get-classroom-details:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch classroom details' },
      { status: 500 }
    )
  }
}