import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
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

    
    const { id: roleId, role: roleName, permissions } = req.body

    
    await prisma.uniAdministrationRoles.update({
      where: {
        id: roleId
      },
      data: {
        role: roleName
      }
    })

    
    await prisma.uniAdministrationRolesPermissions.deleteMany({
      where: {
        role_id: roleId
      }
    })

    
    const requestedPermissions = await prisma.permission.findMany({
      where: {
        id: {
          in: permissions
        }
      }
    })

    
    const hasAllPermission = requestedPermissions.some(p => p.permission.toLowerCase() === 'all')

    if (hasAllPermission) {
      
      const allPermission = requestedPermissions.find(p => p.permission.toLowerCase() === 'all')
      await prisma.uniAdministrationRolesPermissions.create({
        data: {
          role_id: roleId,
          permission_id: allPermission.id
        }
      })
    } else {
      
      await prisma.uniAdministrationRolesPermissions.createMany({
        data: permissions.map(permissionId => ({
          role_id: roleId,
          permission_id: permissionId
        }))
      })
    }

    await prisma.$disconnect()
    return res.status(200).json({ message: 'Role updated successfully' })

  } catch (error) {
    console.error('Error in edit-role:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update role' })
  }
}