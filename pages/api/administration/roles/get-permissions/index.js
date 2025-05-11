import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get all permissions from the Permission table
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        permission: true
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(permissions)

  } catch (error) {
    console.error('Error in get-permissions:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    )
  }
}