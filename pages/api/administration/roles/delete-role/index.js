import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function DELETE(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found'  }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get role id from request body
    const { id } = await request.json()

    // Get role details
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id },
      include: { permissions: true }
    })

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Check if role is Super Admin or Disabled
    if (role.role === 'Super Admin' || role.role === 'Disabled') {
      return NextResponse.json({ success: false })
    }

    // Get disabled role
    const disabledRole = await prisma.uniAdministrationRoles.findFirst({
      where: {
        university_id: universityId,
        role: 'Disabled'
      }
    })

    if (!disabledRole) {
      return NextResponse.json({ error: 'Disabled role not found' }, { status: 404 })
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
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error in delete-role:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    )
  }
}