import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    const clerk_client = await clerkClient()
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get details from request body
    const { uniAdministrationId } = await request.json()

    // Get existing admin record
    const existingAdmin = await prisma.uniAdministration.findUnique({
      where: { id: uniAdministrationId },
      include: { user: true }
    })

    if (!existingAdmin) {
      return NextResponse.json({ error: 'Administrator not found' }, { status: 404 })
    }

    const userId = existingAdmin.user_id

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete from CustomGroupMembers
      await tx.customGroupMembers.deleteMany({
        where: { user_id: userId }
      })

      // Delete from CustomGroup where user is creator
      await tx.customGroup.deleteMany({
        where: { user_id: userId }
      })

      // Delete from ClassroomTeachers
      await tx.classroomTeachers.deleteMany({
        where: { user_id: userId }
      })

      // Delete from ClassroomPost
      await tx.classroomPost.deleteMany({
        where: { user_id: userId }
      })

      // Delete from ThreadPost
      await tx.threadPost.deleteMany({
        where: { user_id: userId }
      })

      // Delete from Forum
      await tx.forum.deleteMany({
        where: { user_id: userId }
      })

      // Delete from Faculty
      await tx.faculty.deleteMany({
        where: { user_id: userId }
      })

      // Delete from Student
      await tx.student.deleteMany({
        where: { user_id: userId }
      })

      // Delete from UniAdministration
      await tx.uniAdministration.delete({
        where: { id: uniAdministrationId }
      })

      // Finally delete the user
      await tx.user.delete({
        where: { id: userId }
      })
    })

    // Delete user from Clerk
    await clerk_client.users.deleteUser(userId)

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Administrator deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-administrator:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete administrator' },
      { status: 500 }
    )
  }
}