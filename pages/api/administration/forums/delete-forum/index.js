
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    
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

    
    const { forum_id } = req.body

    if (!forum_id) {
      return res.status(400).json({ error: 'Forum ID is required' })
    }

    
    const deletedForum = await prisma.$transaction(async (tx) => {
      
      const threads = await tx.thread.findMany({
        where: {
          forum_id: forum_id
        },
        select: {
          id: true
        }
      })

      const threadIds = threads.map(t => t.id)

      
      await tx.threadPostAttachments.deleteMany({
        where: {
          post: {
            thread_id: {
              in: threadIds
            }
          }
        }
      })

      
      await tx.threadPost.deleteMany({
        where: {
          thread_id: {
            in: threadIds
          }
        }
      })

      
      await tx.thread.deleteMany({
        where: {
          forum_id: forum_id
        }
      })

      
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
