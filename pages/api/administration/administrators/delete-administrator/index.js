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

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get details from request body
    const { uniAdministrationId } = req.body

    // Get existing admin record
    const existingAdmin = await prisma.uniAdministration.findUnique({
      where: { id: uniAdministrationId },
      include: { user: true }
    })

    if (!existingAdmin) {
      return res.status(404).json({ error: 'Administrator not found' })
    }

    const adminUserId = existingAdmin.user_id

    // Delete all related records in transaction
    await prisma.$transaction(async (tx) => {
      // Delete from CustomGroupMembers
      await tx.customGroupMembers.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from CustomGroup where user is creator
      await tx.customGroup.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from ClassroomTeachers
      await tx.classroomTeachers.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from ClassroomPost
      await tx.classroomPost.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from ThreadPost
      await tx.threadPost.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from Forum
      await tx.forum.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from Faculty
      await tx.faculty.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from Student
      await tx.student.deleteMany({
        where: { user_id: adminUserId }
      })

      // Delete from UniAdministration
      await tx.uniAdministration.delete({
        where: { id: uniAdministrationId }
      })

      // Finally delete the user
      await tx.user.delete({
        where: { id: adminUserId }
      })
    })

    // Delete user from Clerk
    await client.users.deleteUser(adminUserId)

    await prisma.$disconnect()
    return res.json({ 
      message: 'Administrator deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-administrator:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete administrator' })
  }
}