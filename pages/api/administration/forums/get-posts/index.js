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
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get thread_id from URL
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('thread_id')

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 })
    }

    const posts = await prisma.threadPost.findMany({
      where: {
        thread_id: threadId,
      },
      select: {
        id: true,
        description: true,
        createdAt: true,
        created_by: {
          select: {
            first_name: true,
            last_name: true,
            role: true
          }
        },
        attachments: {
          select: {
            id: true,
            filename: true,
            filepath: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    const formattedPosts = posts.map((post) => ({
      post_id: post.id,
      description: post.description,
      created_at: post.createdAt,
      created_by: {
        name: `${post.created_by.first_name} ${post.created_by.last_name}`,
        role: post.created_by.role
      },
      attachments: post.attachments.map(attachment => ({
        id: attachment.id,
        filename: attachment.filename,
        filepath: attachment.filepath
      }))
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedPosts)

  } catch (error) {
    console.error('Error in get-posts:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
