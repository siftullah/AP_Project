

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
   
  try {
    // Get current user and verify university_id
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }

    // Get request body
    const { classroom_id, user_ids } = req.body

    if (!classroom_id || !user_ids) {
      return res.status(400).json({ error: 'Classroom ID and user IDs are required' })
    }

    // Get existing enrollments
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
    
    // Find students to add and remove
    const studentsToAdd = user_ids.filter(id => !existingStudentUserIds.includes(id))
    const studentsToRemove = existingEnrollments.filter(e => !user_ids.includes(e.student.user.id))

    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // Add new students
      if (studentsToAdd.length > 0) {
        // First get the student records for these user IDs
        const studentRecords = await tx.student.findMany({
          where: {
            user_id: {
              in: studentsToAdd
            }
          }
        })

        // Create enrollments for new students
        await tx.enrollment.createMany({
          data: studentRecords.map((student) => ({
            classroom_id: classroom_id,
            student_id: student.id
          }))
        })
      }

      // For students being removed:
      if (studentsToRemove.length > 0) {
        const studentIds = studentsToRemove.map(e => e.student_id)

        // Get threads created by these students
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

        // 1. Delete submission attachments
        await tx.submissionAttachments.deleteMany({
          where: {
            submission: {
              student_id: {
                in: studentIds
              }
            }
          }
        })

        // 2. Delete submissions
        await tx.submission.deleteMany({
          where: {
            student_id: {
              in: studentIds
            }
          }
        })

        // 3. Delete classroom post attachments
        await tx.classroomPostAttachments.deleteMany({
          where: {
            post: {
              thread_id: {
                in: threadIds
              }
            }
          }
        })

        // 4. Delete classroom posts
        await tx.classroomPost.deleteMany({
          where: {
            thread_id: {
              in: threadIds
            }
          }
        })

        // 5. Delete classroom threads
        await tx.classroomThread.deleteMany({
          where: {
            id: {
              in: threadIds
            }
          }
        })

        // 6. Finally delete enrollments
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