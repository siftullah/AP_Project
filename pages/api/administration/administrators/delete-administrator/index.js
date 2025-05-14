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

    
    const { uniAdministrationId } = req.body

    
    const existingAdmin = await prisma.uniAdministration.findUnique({
      where: { id: uniAdministrationId },
      include: { user: true }
    })

    if (!existingAdmin) {
      return res.status(404).json({ error: 'Administrator not found' })
    }

    const adminUserId = existingAdmin.user_id

    
    await prisma.$transaction(async (tx) => {
      
      await tx.customGroupMembers.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.customGroup.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.classroomTeachers.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.classroomPost.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.threadPost.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.forum.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.faculty.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.student.deleteMany({
        where: { user_id: adminUserId }
      })

      
      await tx.uniAdministration.delete({
        where: { id: uniAdministrationId }
      })

      
      await tx.user.delete({
        where: { id: adminUserId }
      })
    })

    
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