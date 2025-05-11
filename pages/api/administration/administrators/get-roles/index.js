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

    // Get all roles for this university
    const roles = await prisma.uniAdministrationRoles.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true,
        role: true
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(roles)

  } catch (error) {
    console.error('Error in get-roles:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}