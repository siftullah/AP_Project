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

    // Check if group exists and is custom type
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id },
      include: {
        custom: {
          include: {
            members: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    if (!existingGroup) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    if (existingGroup.type !== 'custom') {
      return NextResponse.json({ error: 'Not a custom group' }, { status: 400 })
    }

    // Get member details
    const members = existingGroup.custom?.members.map(member => ({
      name: `${member.user.first_name} ${member.user.last_name}`,
      role: member.user.role
    }))

    await prisma.$disconnect()
    return NextResponse.json({ 
      group_name: existingGroup.name,
      members: members
    })

  } catch (error) {
    console.error('Error in view-group:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to get group details' },
      { status: 500 }
    )
  }
}
