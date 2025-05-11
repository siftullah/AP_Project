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

    // Get role details from request body
    const { role: roleName, permissions } = await request.json()

    // Create new role
    const newRole = await prisma.uniAdministrationRoles.create({
      data: {
        role: roleName,
        university_id: user.publicMetadata['university_id'] as string
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
          role_id: newRole.id,
          permission_id: allPermission!.id
        }
      })
    } else {
      // Otherwise add all requested permissions
      await prisma.uniAdministrationRolesPermissions.createMany({
        data: permissions.map((permissionId: string) => ({
          role_id: newRole.id,
          permission_id: permissionId
        }))
      })
    }

    await prisma.$disconnect()
    return NextResponse.json({ message: 'Role created successfully' })

  } catch (error) {
    console.error('Error in add-role:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    )
  }
}