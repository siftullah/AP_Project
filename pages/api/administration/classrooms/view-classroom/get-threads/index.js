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

    // Get classroom_id and thread_type from URL
    const { searchParams } = new URL(request.url)
    const classroomId = searchParams.get('classroom_id')
    const threadType = searchParams.get('thread_type')

    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 })
    }

    // Base where clause
    const whereClause = {
      classroom_id: classroomId,
      ...(threadType && { type: threadType })
    }

    const threads = await prisma.classroomThread.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        type: true,
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
      thread_type: thread.type,
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
