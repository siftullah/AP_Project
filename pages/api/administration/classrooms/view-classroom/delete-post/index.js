

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user?.publicMetadata['university_id']

    
    const { post_id: postId } = req.query

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' })
    }

    
    const thread = await prisma.classroomThread.findFirst({
      where: {
        main_post_id: postId
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'asc'
          },
          take: 2 
        }
      }
    })

    
    await prisma.classroomPostAttachments.deleteMany({
      where: {
        post_id: postId
      }
    })

    
    if (thread && thread.posts.length > 1) {
      const nextPost = thread.posts[1] 
      await prisma.classroomThread.update({
        where: { id: thread.id },
        data: { main_post_id: nextPost.id }
      })
    }

    
    const deletedPost = await prisma.classroomPost.delete({
      where: {
        id: postId
      }
    })

    await prisma.$disconnect()
    return res.status(200).json(deletedPost)

  } catch (error) {
    console.error('Error in delete-post:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete post' })
  }
}