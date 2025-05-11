export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function PUT(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get request body
    const body = await request.json()
    const { postId, description } = body

    if (!postId || !description) {
      return NextResponse.json({ error: 'Post ID and description are required' }, { status: 400 })
    }

    // Update post
    const updatedPost = await prisma.threadPost.update({
      where: {
        id: postId
      },
      data: {
        description: description
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(updatedPost)

  } catch (error) {
    console.error('Error in edit-post:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
