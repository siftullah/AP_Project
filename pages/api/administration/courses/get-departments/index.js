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

    // Get departments for university
    const departments = await prisma.department.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true,
        name: true
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(departments)

  } catch (error) {
    console.error('Error in get-departments:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}