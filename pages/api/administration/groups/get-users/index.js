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
    const universityId = user.publicMetadata['university_id'] as string

    // Get all users for this university with their details
    const users = await prisma.user.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true
      }
    })

    // Format user data
    const formattedUsers = users.map(user => ({
      user_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      role: user.role
    }))

    await prisma.$disconnect()
    return NextResponse.json({ users: formattedUsers })

  } catch (error) {
    console.error('Error in get-users:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
