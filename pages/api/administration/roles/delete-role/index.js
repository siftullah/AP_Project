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

    // Get role id from request body
    const { id } = req.body

    // Get role details
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id },
      include: { permissions: true }
    })

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    // Check if role is Super Admin or Disabled
    if (role.role === 'Super Admin' || role.role === 'Disabled') {
      return res.status(200).json({ success: false })
    }

    // Get disabled role
    const disabledRole = await prisma.uniAdministrationRoles.findFirst({
      where: {
        university_id: universityId,
        role: 'Disabled'
      }
    })

    if (!disabledRole) {
      return res.status(404).json({ error: 'Disabled role not found' })
    }

    // Update all uni administrations with this role to disabled role
    await prisma.uniAdministration.updateMany({
      where: {
        role_id: id
      },
      data: {
        role_id: disabledRole.id
      }
    })

    // Delete role permissions
    await prisma.uniAdministrationRolesPermissions.deleteMany({
      where: {
        role_id: id
      }
    })

    // Delete role
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