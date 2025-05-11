export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const clerk_client = await clerkClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get faculty_id from request body
    const { faculty_id } = await request.json()

    // Get existing faculty with user details
    const existingFaculty = await prisma.faculty.findUnique({
      where: { id: faculty_id },
      include: { user: true }
    })

    if (!existingFaculty) {
      return NextResponse.json({ error: 'Faculty not found' }, { status: 404 })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete classroom post attachments
      await tx.classroomPostAttachments.deleteMany({
        where: { post: { created_by: { id: existingFaculty.user_id } } }
      })

      // Delete classroom posts
      await tx.classroomPost.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Find and delete classroom threads where faculty is creator of main post
      const facultyClassroomThreads = await tx.classroomThread.findMany({
        where: {
          main_post_id: {
            in: await tx.classroomPost.findMany({
              where: { user_id: existingFaculty.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.classroomThread.deleteMany({
        where: { id: { in: facultyClassroomThreads.map(t => t.id) } }
      })

      // Delete thread post attachments
      await tx.threadPostAttachments.deleteMany({
        where: { post: { user_id: existingFaculty.user_id } }
      })

      // Delete thread posts
      await tx.threadPost.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Find and delete threads where faculty is creator of main post
      const facultyThreads = await tx.thread.findMany({
        where: {
          main_post_id: {
            in: await tx.threadPost.findMany({
              where: { user_id: existingFaculty.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.thread.deleteMany({
        where: { id: { in: facultyThreads.map(t => t.id) } }
      })

      // Delete forums created by user
      await tx.forum.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Delete custom group memberships
      await tx.customGroupMembers.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Delete custom groups created by user
      await tx.customGroup.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Delete classroom teachers records
      await tx.classroomTeachers.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      // Delete faculty
      await tx.faculty.delete({
        where: { id: faculty_id }
      })

      // Delete user
      await tx.user.delete({
        where: { id: existingFaculty.user_id }
      })
    })

    // Delete Clerk user
    await clerk_client.users.deleteUser(existingFaculty.user_id)

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Faculty deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-faculty:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    )
  }
}