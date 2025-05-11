

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
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

    // Get forum_id and thread_id from URL
    const { forum_id: forumId, thread_id: threadId } = req.query

    if (!forumId) {
      return res.status(400).json({ error: 'Forum ID is required' })
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
    return res.json(formattedThreads)

  } catch (error) {
    console.error('Error in get-threads:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch threads' })
  }
}
