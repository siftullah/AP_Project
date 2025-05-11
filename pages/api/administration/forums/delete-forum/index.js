export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function DELETE(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get forum_id from request body
    const { forum_id } = await request.json()

    if (!forum_id) {
      return NextResponse.json({ error: 'Forum ID is required' }, { status: 400 })
    }

    // Delete all thread post attachments, posts, threads and forum in transaction
    const deletedForum = await prisma.$transaction(async (tx) => {
      // Get all threads in forum
      const threads = await tx.thread.findMany({
        where: {
          forum_id: forum_id
        },
        select: {
          id: true
        }
      })

      const threadIds = threads.map(t => t.id)

      // Delete all thread post attachments
      await tx.threadPostAttachments.deleteMany({
        where: {
          post: {
            thread_id: {
              in: threadIds
            }
          }
        }
      })

      // Delete all thread posts
      await tx.threadPost.deleteMany({
        where: {
          thread_id: {
            in: threadIds
          }
        }
      })

      // Delete all threads
      await tx.thread.deleteMany({
        where: {
          forum_id: forum_id
        }
      })

      // Delete forum
      return await tx.forum.delete({
        where: {
          id: forum_id,
          university_id: universityId
        }
      })
    })

    await prisma.$disconnect()
    return NextResponse.json(deletedForum)

  } catch (error) {
    console.error('Error in delete-forum:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete forum' },
      { status: 500 }
    )
  }
}
