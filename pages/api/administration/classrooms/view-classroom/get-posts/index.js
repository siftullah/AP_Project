

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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
    const universityId = user.publicMetadata['university_id']

    
    const { thread_id } = req.query

    if (!thread_id) {
      return res.status(400).json({ error: 'Thread ID is required' })
    }

    const posts = await prisma.classroomPost.findMany({
      where: {
        thread_id: thread_id,
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
    return res.status(200).json(formattedPosts)

  } catch (error) {
    console.error('Error in get-posts:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch posts' })
  }
}
