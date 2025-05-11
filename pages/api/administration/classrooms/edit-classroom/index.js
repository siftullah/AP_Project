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

    // Get classroom details from request body
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    const classroom_id = body.classroom_id
    const classroom_name = body.name // Changed from classroom_name to name to match frontend
    const batch_id = body.batch_id
    const course_id = body.course_id
    console.log('Parsed values:', JSON.stringify({
      classroom_id,
      classroom_name,
      batch_id, 
      course_id
    }, null, 2))

    if (!classroom_id) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 })
    }

    // Verify classroom exists and belongs to user's university
    const existingClassroom = await prisma.classroom.findFirst({
      where: {
        id: classroom_id,
        course: {
          department: {
            university_id: universityId
          }
        }
      }
    })

    if (!existingClassroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    // Verify course exists and belongs to user's university
    const course = await prisma.course.findFirst({
      where: {
        id: course_id,
        department: {
          university_id: universityId
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Verify batch exists and belongs to user's university
    const batch = await prisma.batch.findFirst({
      where: {
        id: batch_id,
        university_id: universityId
      }
    })

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
    }

    // Update classroom
    const classroom = await prisma.classroom.update({
      where: {
        id: classroom_id
      },
      data: {
        name: classroom_name,
        course_id: course_id,
        batch_id: batch_id
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Classroom updated successfully',
      classroom
    })

  } catch (error) {
    console.error('Error in edit-classroom:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update classroom' },
      { status: 500 }
    )
  }
}