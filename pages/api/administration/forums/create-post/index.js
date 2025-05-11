export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { threadId, description } = body

    if (!threadId || !description) {
      return NextResponse.json({ error: 'Thread ID and description are required' }, { status: 400 })
    }

    // Create new post
    const post = await prisma.threadPost.create({
      data: {
        thread_id: threadId,
        user_id: user.id,
        type: 'reply',
        description: description
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(post)

  } catch (error) {
    console.error('Error in create-post:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
