

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

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }

    
    const { classroom_id, user_ids } = req.body

    if (!classroom_id || !user_ids) {
      return res.status(400).json({ error: 'Classroom ID and user IDs are required' })
    }

    
    const existingTAs = await prisma.classroomTeachers.findMany({
      where: {
        classroom_id: classroom_id,
        type: {
          equals: 'ta',
          mode: 'insensitive'
        }
      }
    })

    const existingTAIds = existingTAs.map(t => t.user_id)
    
    
    const tasToAdd = user_ids.filter(id => !existingTAIds.includes(id))
    const tasToRemove = existingTAs.filter(t => !user_ids.includes(t.user_id))
    const taIdsToRemove = tasToRemove.map(t => t.user_id)

    
    await prisma.$transaction(async (tx) => {
      
      if (tasToAdd.length > 0) {
        await tx.classroomTeachers.createMany({
          data: tasToAdd.map(userId => ({
            classroom_id: classroom_id,
            user_id: userId,
            type: 'ta'
          }))
        })
      }

      
      if (taIdsToRemove.length > 0) {
        
        const threadsToDelete = await tx.classroomThread.findMany({
          where: {
            classroom_id: classroom_id,
            posts: {
              some: {
                user_id: {
                  in: taIdsToRemove
                }
              }
            }
          },
          include: {
            assignments: true
          }
        })

        const threadIds = threadsToDelete.map(t => t.id)
        const assignmentIds = threadsToDelete.flatMap(t => t.assignments.map(a => a.id))

        
        await tx.submissionAttachments.deleteMany({
          where: {
            submission: {
              assignment_id: {
                in: assignmentIds
              }
            }
          }
        })

        
        await tx.submission.deleteMany({
          where: {
            assignment_id: {
              in: assignmentIds
            }
          }
        })

        
        await tx.assignment.deleteMany({
          where: {
            id: {
              in: assignmentIds
            }
          }
        })

        
        await tx.classroomPostAttachments.deleteMany({
          where: {
            post: {
              thread_id: {
                in: threadIds
              }
            }
          }
        })

        
        await tx.classroomPost.deleteMany({
          where: {
            thread_id: {
              in: threadIds
            }
          }
        })

        
        await tx.classroomThread.deleteMany({
          where: {
            id: {
              in: threadIds
            }
          }
        })

        
        await tx.classroomTeachers.deleteMany({
          where: {
            classroom_id: classroom_id,
            user_id: {
              in: taIdsToRemove
            }
          }
        })
      }
    })

    await prisma.$disconnect()
    return res.json({ message: 'Teaching assistants updated successfully' })

  } catch (error) {
    console.error('Error in edit-teaching-assistants:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update teaching assistants' })
  }
}