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

    // Get post_id from URL params
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('post_id')

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    // Check if post is a main post
    const thread = await prisma.classroomThread.findFirst({
      where: {
        main_post_id: postId
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'asc'
          },
          take: 2 // Get main post and next post if exists
        }
      }
    })

    // Delete post attachments first
    await prisma.classroomPostAttachments.deleteMany({
      where: {
        post_id: postId
      }
    })

    // If this is a main post and there are other posts, update thread with new main post
    if (thread && thread.posts.length > 1) {
      const nextPost = thread.posts[1] // Get next post after main post
      await prisma.classroomThread.update({
        where: { id: thread.id },
        data: { main_post_id: nextPost.id }
      })
    }

    // Delete the post
    const deletedPost = await prisma.classroomPost.delete({
      where: {
        id: postId
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(deletedPost)

  } catch (error) {
    console.error('Error in delete-post:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}