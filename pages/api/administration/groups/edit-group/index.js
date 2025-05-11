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
    const { group_id, group_name } = await request.json()

    // Check if group exists
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id }
    })

    if (!existingGroup) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    // Update group name
    const updatedGroup = await prisma.group.update({
      where: { id: group_id },
      data: { name: group_name }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Group updated successfully',
      group: updatedGroup
    })

  } catch (error) {
    console.error('Error in edit-group:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update group' },
      { status: 500 }
    )
  }
}
