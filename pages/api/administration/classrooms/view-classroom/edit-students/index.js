

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

    
    const existingEnrollments = await prisma.enrollment.findMany({
      where: {
        classroom_id: classroom_id,
      },
      include: {
        student: {
          include: {
            user: true
          }
        }
      }
    })

    const existingStudentUserIds = existingEnrollments.map(e => e.student.user.id)
    
    
    const studentsToAdd = user_ids.filter(id => !existingStudentUserIds.includes(id))
    const studentsToRemove = existingEnrollments.filter(e => !user_ids.includes(e.student.user.id))

    
    await prisma.$transaction(async (tx) => {
      
      if (studentsToAdd.length > 0) {
        
        const studentRecords = await tx.student.findMany({
          where: {
            user_id: {
              in: studentsToAdd
            }
          }
        })

        
        await tx.enrollment.createMany({
          data: studentRecords.map((student) => ({
            classroom_id: classroom_id,
            student_id: student.id
          }))
        })
      }

      
      if (studentsToRemove.length > 0) {
        const studentIds = studentsToRemove.map(e => e.student_id)

        
        const threadsToDelete = await tx.classroomThread.findMany({
          where: {
            classroom_id: classroom_id,
            posts: {
              some: {
                user_id: {
                  in: existingStudentUserIds
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
              student_id: {
                in: studentIds
              }
            }
          }
        })

        
        await tx.submission.deleteMany({
          where: {
            student_id: {
              in: studentIds
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

        
        await tx.enrollment.deleteMany({
          where: {
            classroom_id: classroom_id,
            student_id: {
              in: studentIds
            }
          }
        })
      }
    })

    await prisma.$disconnect()
    return res.json({ message: 'Students updated successfully' })

  } catch (error) {
    console.error('Error in edit-students:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update students' })
  }
}