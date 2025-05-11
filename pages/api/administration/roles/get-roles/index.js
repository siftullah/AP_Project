export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found'  }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get all roles for this university with their permissions
    const roles = await prisma.uniAdministrationRoles.findMany({
      where: {
        university_id: universityId
      },
      include: {
        permissions: {
          select: {
            permission_id: true,
            permission: {
              select: {
                permission: true
              }
            }
          }
        }
      }
    })

    // Format the response
    const formattedRoles = roles.map(role => ({
      id: role.id,
      role: role.role,
      permissions: role.permissions.map(p => ({
        id: p.permission_id,
        permission: p.permission.permission
      })),
      createdAt: role.createdAt,
      university_id: role.university_id
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedRoles)

  } catch (error) {
    console.error('Error in get-roles:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}