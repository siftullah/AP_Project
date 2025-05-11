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

    // Get all administrators for this university with their user details and roles
    const administrators = await prisma.uniAdministration.findMany({
      where: {
        role: {
          university_id: universityId
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email_address: true
          }
        },
        role: {
          select: {
            id: true,
            role: true
          }
        }
      }
    })

    // Format the response
    const formattedAdministrators = administrators.map(admin => ({
      administration_id: admin.id,
      first_name: admin.user.first_name,
      last_name: admin.user.last_name,
      email: admin.user.email_address,
      role_name: admin.role.role,
      role_id: admin.role.id
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedAdministrators)

  } catch (error) {
    console.error('Error in get-administrators:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch administrators' },
      { status: 500 }
    )
  }
}