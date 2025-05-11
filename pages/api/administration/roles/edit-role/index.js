import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function PUT(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }

    // Get role details from request body
    const { id: roleId, role: roleName, permissions } = await request.json()

    // Update role name
    await prisma.uniAdministrationRoles.update({
      where: {
        id: roleId
      },
      data: {
        role: roleName
      }
    })

    // Delete all existing permissions for this role
    await prisma.uniAdministrationRolesPermissions.deleteMany({
      where: {
        role_id: roleId
      }
    })

    // Get all requested permissions
    const requestedPermissions = await prisma.permission.findMany({
      where: {
        id: {
          in: permissions
        }
      }
    })

    // Check if 'all' permission exists
    const hasAllPermission = requestedPermissions.some(p => p.permission.toLowerCase() === 'all')

    if (hasAllPermission) {
      // If 'all' permission exists, only add that one
      const allPermission = requestedPermissions.find(p => p.permission.toLowerCase() === 'all')
      await prisma.uniAdministrationRolesPermissions.create({
        data: {
          role_id: roleId,
          permission_id: allPermission!.id
        }
      })
    } else {
      // Otherwise add all requested permissions
      await prisma.uniAdministrationRolesPermissions.createMany({
        data: permissions.map((permissionId: string) => ({
          role_id: roleId,
          permission_id: permissionId
        }))
      })
    }

    await prisma.$disconnect()
    return NextResponse.json({ message: 'Role updated successfully' })

  } catch (error) {
    console.error('Error in edit-role:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    )
  }
}