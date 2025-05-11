export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get course details from request body
    const { course_id, course_name, course_code, department_id } = await request.json()

    // Verify department exists and belongs to user's university
    const department = await prisma.department.findFirst({
      where: {
        id: department_id,
        university_id: universityId
      }
    })

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }

    // Find and update course
    const course = await prisma.course.update({
      where: {
        id: course_id
      },
      data: {
        course_name,
        course_code,
        dept_id: department_id
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Course updated successfully',
      course
    })

  } catch (error) {
    console.error('Error in edit-course:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}