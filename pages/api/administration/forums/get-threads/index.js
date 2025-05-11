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

    // Get forum_id and thread_id from URL
    const { searchParams } = new URL(request.url)
    const forumId = searchParams.get('forum_id')
    const threadId = searchParams.get('thread_id')

    if (!forumId) {
      return NextResponse.json({ error: 'Forum ID is required' }, { status: 400 })
    }

    // Base where clause
    const whereClause = {
      forum_id: forumId,
      university_id: universityId,
      ...(threadId && { id: threadId })
    }

    const threads = await prisma.thread.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        createdAt: true,
        main_post: {
          select: {
            description: true,
            created_by: {
              select: {
                first_name: true,
                last_name: true
              }
            }
          }
        },
        posts: {
          select: {
            id: true,
            description: true,
            createdAt: true,
            created_by: {
              select: {
                first_name: true,
                last_name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        },
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedThreads = threads.map((thread) => ({
      thread_id: thread.id,
      thread_title: thread.title,
      main_post_description: thread.main_post?.description || null,
      created_at: thread.createdAt,
      created_by_user_name: thread.main_post ? 
        `${thread.main_post.created_by.first_name} ${thread.main_post.created_by.last_name}` : 
        null,
      total_posts: thread._count.posts,
      last_post_created_at: thread.posts[0]?.createdAt || null
    }))

    console.log(formattedThreads)

    await prisma.$disconnect()
    return NextResponse.json(formattedThreads)

  } catch (error) {
    console.error('Error in get-threads:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch threads' },
      { status: 500 }
    )
  }
}
