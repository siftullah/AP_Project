
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!(user?.publicMetadata['university_id'])) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get forum_id from request body
    const { forum_id } = req.body

    if (!forum_id) {
      return res.status(400).json({ error: 'Forum ID is required' })
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
    return res.status(200).json(deletedForum)

  } catch (error) {
    console.error('Error in delete-forum:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete forum' })
  }
}
