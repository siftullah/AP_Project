

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

    
    const { forum_id } = req.query

    
    const whereClause = {
      university_id: universityId,
      ...(forum_id && { id: forum_id })
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
    return res.json(formattedForums)

  } catch (error) {
    console.error('Error in get-forums:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch forums' })
  }
}
