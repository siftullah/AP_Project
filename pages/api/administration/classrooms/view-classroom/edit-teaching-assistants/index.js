export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
   
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }

    // Get request body
    const { classroom_id, user_ids } = await request.json()

    if (!classroom_id || !user_ids) {
      return NextResponse.json({ error: 'Classroom ID and user IDs are required' }, { status: 400 })
    }

    // Get existing classroom TAs
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
    
    // Find TAs to add and remove
    const tasToAdd = user_ids.filter((id: string) => !existingTAIds.includes(id))
    const tasToRemove = existingTAs.filter(t => !user_ids.includes(t.user_id))
    const taIdsToRemove = tasToRemove.map(t => t.user_id)

    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // Add new TAs
      if (tasToAdd.length > 0) {
        await tx.classroomTeachers.createMany({
          data: tasToAdd.map((userId: string) => ({
            classroom_id: classroom_id,
            user_id: userId,
            type: 'ta'
          }))
        })
      }

      // For TAs being removed:
      if (taIdsToRemove.length > 0) {
        // 1. Get all classroom threads created by these TAs
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

        // 2. Delete submission attachments
        await tx.submissionAttachments.deleteMany({
          where: {
            submission: {
              assignment_id: {
                in: assignmentIds
              }
            }
          }
        })

        // 3. Delete submissions
        await tx.submission.deleteMany({
          where: {
            assignment_id: {
              in: assignmentIds
            }
          }
        })

        // 4. Delete assignments
        await tx.assignment.deleteMany({
          where: {
            id: {
              in: assignmentIds
            }
          }
        })

        // 5. Delete classroom post attachments
        await tx.classroomPostAttachments.deleteMany({
          where: {
            post: {
              thread_id: {
                in: threadIds
              }
            }
          }
        })

        // 6. Delete classroom posts
        await tx.classroomPost.deleteMany({
          where: {
            thread_id: {
              in: threadIds
            }
          }
        })

        // 7. Delete classroom threads
        await tx.classroomThread.deleteMany({
          where: {
            id: {
              in: threadIds
            }
          }
        })

        // 8. Finally delete classroom TAs
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
    return NextResponse.json({ message: 'Teaching assistants updated successfully' })

  } catch (error) {
    console.error('Error in edit-teaching-assistants:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update teaching assistants' },
      { status: 500 }
    )
  }
}