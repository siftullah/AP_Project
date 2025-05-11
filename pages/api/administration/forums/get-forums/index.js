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

    // Get forum_id from URL if provided
    const { searchParams } = new URL(request.url)
    const forumId = searchParams.get('forum_id')

    // Base where clause
    const whereClause = {
      university_id: universityId,
      ...(forumId && { id: forumId })
    }

    const forums = await prisma.forum.findMany({
      where: whereClause,
      select: {
        id: true,
        forum_name: true,
        group_id: true,
        createdAt: true,
        created_by: {
          select: {
            first_name: true,
            last_name: true,
            role: true
          }
        },
        group: {
          select: {
            name: true,
            type: true
          }
        },
        threads: {
          where: {
            university_id: universityId
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
          select: {
            createdAt: true
          }
        },
        _count: {
          select: {
            threads: {
              where: {
                university_id: universityId
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedForums = forums.map((forum) => ({
      id: forum.id,
      name: forum.forum_name,
      created_by: `${forum.created_by.first_name} ${forum.created_by.last_name}`,
      created_by_role: forum.created_by.role,
      created_at: forum.createdAt,
      thread_count: forum._count.threads,
      last_thread_date: forum.threads[0]?.createdAt || null,
      group_id: forum.group_id,
      type: forum.group_id ? 'Private' : 'Public',
      group_type: forum.group?.type || null,
      group_name: forum.group?.name || null
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedForums)

  } catch (error) {
    console.error('Error in get-forums:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch forums' },
      { status: 500 }
    )
  }
}
