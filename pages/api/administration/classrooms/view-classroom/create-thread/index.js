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
    const userId = user.id

    // Get request body
    const { classroom_id, thread_type, thread_title, description } = await request.json()

    // Validate required fields
    if (!classroom_id || !thread_type || !thread_title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create thread first
    const thread = await prisma.classroomThread.create({
      data: {
        classroom: {
          connect: { id: classroom_id }
        },
        type: thread_type,
        title: thread_title
      }
    })

    // Create thread post
    const threadPost = await prisma.classroomPost.create({
      data: {
        thread_id: thread.id,
        user_id: userId,
        type: 'main',
        description: description
      }
    })

    // Update thread with main post
    await prisma.classroomThread.update({
      where: { id: thread.id },
      data: {
        main_post: {
          connect: { id: threadPost.id }
        }
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ thread_id: thread.id })

  } catch (error) {
    console.error('Error in create-thread:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    )
  }
}
