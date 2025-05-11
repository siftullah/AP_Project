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

    // Get request body
    const { group_id } = await request.json()

    if (!group_id) {
      return NextResponse.json({ error: 'Group ID is required' }, { status: 400 })
    }

    // First verify if group exists and is custom type
    const group = await prisma.group.findUnique({
      where: { id: group_id }
    })

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    if (group.type !== 'custom') {
      return NextResponse.json({ error: 'Only custom groups are supported' }, { status: 400 })
    }

    // Get members from CustomGroupMembers with user details
    const members = await prisma.customGroupMembers.findMany({
      where: {
        custom_group: {
          group_id: group_id
        }
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            role: true
          }
        }
      }
    })

    // Format members data
    const formattedMembers = members.map(member => ({
      user_id: member.user.id,
      name: `${member.user.first_name} ${member.user.last_name}`,
      role: member.user.role
    }))

    await prisma.$disconnect()
    return NextResponse.json({ members: formattedMembers })

  } catch (error) {
    console.error('Error in view-group-members:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch group members' },
      { status: 500 }
    )
  }
}
