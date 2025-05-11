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

    // Get student_id from request body
    const { student_id } = await request.json()

    // Get existing student with user details
    const existingStudent = await prisma.student.findUnique({
      where: { id: student_id },
      include: { user: true }
    })

    if (!existingStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete submission attachments
      await tx.submissionAttachments.deleteMany({
        where: { submission: { student_id: student_id } }
      })

      // Delete submissions
      await tx.submission.deleteMany({
        where: { student_id: student_id }
      })

      // Delete enrollments
      await tx.enrollment.deleteMany({
        where: { student_id: student_id }
      })

      // Delete classroom post attachments
      await tx.classroomPostAttachments.deleteMany({
        where: { post: { created_by: { id: existingStudent.user_id } } }
      })

      // Delete classroom posts
      await tx.classroomPost.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      // Find and delete classroom threads where student is creator of main post
      const studentClassroomThreads = await tx.classroomThread.findMany({
        where: {
          main_post_id: {
            in: await tx.classroomPost.findMany({
              where: { user_id: existingStudent.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.classroomThread.deleteMany({
        where: { id: { in: studentClassroomThreads.map(t => t.id) } }
      })

      // Delete thread post attachments
      await tx.threadPostAttachments.deleteMany({
        where: { post: { user_id: existingStudent.user_id } }
      })

      // Delete thread posts
      await tx.threadPost.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      // Find and delete threads where student is creator of main post
      const studentThreads = await tx.thread.findMany({
        where: {
          main_post_id: {
            in: await tx.threadPost.findMany({
              where: { user_id: existingStudent.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.thread.deleteMany({
        where: { id: { in: studentThreads.map(t => t.id) } }
      })

      // Delete forums created by user
      await tx.forum.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      // Delete custom group memberships
      await tx.customGroupMembers.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      // Delete custom groups created by user
      await tx.customGroup.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      // Delete student
      await tx.student.delete({
        where: { id: student_id }
      })

      // Delete user
      await tx.user.delete({
        where: { id: existingStudent.user_id }
      })
    })

    // Delete Clerk user
    await clerk_client.users.deleteUser(existingStudent.user_id)

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Student deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-student:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}