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

    
    const { id } = req.body

    
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id },
      include: { permissions: true }
    })

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    
    if (role.role === 'Super Admin' || role.role === 'Disabled') {
      return res.status(200).json({ success: false })
    }

    
    const disabledRole = await prisma.uniAdministrationRoles.findFirst({
      where: {
        university_id: universityId,
        role: 'Disabled'
      }
    })

    if (!disabledRole) {
      return res.status(404).json({ error: 'Disabled role not found' })
    }

    
    await prisma.uniAdministration.updateMany({
      where: {
        role_id: id
      },
      data: {
        role_id: disabledRole.id
      }
    })

    
    await prisma.uniAdministrationRolesPermissions.deleteMany({
      where: {
        role_id: id
      }
    })

    
    await prisma.uniAdministrationRoles.delete({
      where: {
        id
      }
    })

    await prisma.$disconnect()
    return res.status(200).json({ success: true })

  } catch (error) {
    console.error('Error in delete-role:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete role' })
  }
}