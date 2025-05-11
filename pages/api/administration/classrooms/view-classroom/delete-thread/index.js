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

    // Get thread_id from URL params
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('thread_id')

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 })
    }

    // Delete submission attachments first
    await prisma.submissionAttachments.deleteMany({
      where: {
        submission: {
          assignment: {
            thread_id: threadId
          }
        }
      }
    })

    // Delete submissions
    await prisma.submission.deleteMany({
      where: {
        assignment: {
          thread_id: threadId
        }
      }
    })

    // Delete assignments
    await prisma.assignment.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    // Delete all post attachments for all posts in the thread
    await prisma.classroomPostAttachments.deleteMany({
      where: {
        post: {
          thread_id: threadId
        }
      }
    })

    // Delete all posts in the thread
    await prisma.classroomPost.deleteMany({
      where: {
        thread_id: threadId
      }
    })

    // Delete the thread
    const deletedThread = await prisma.classroomThread.delete({
      where: {
        id: threadId
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(deletedThread)

  } catch (error) {
    console.error('Error in delete-thread:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete thread' },
      { status: 500 }
    )
  }
}