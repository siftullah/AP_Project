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
    const { name, course_id, batch_id } = await request.json()

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

    // Create classroom
    const classroom = await prisma.classroom.create({
      data: {
        name,
        course_id,
        batch_id
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Classroom created successfully',
      classroom
    })

  } catch (error) {
    console.error('Error in add-classroom:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create classroom' },
      { status: 500 }
    )
  }
}