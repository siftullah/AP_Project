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
        custom: true
      }
    })

    if (!existingGroup) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    if (existingGroup.type !== 'custom') {
      return NextResponse.json({ error: 'Only custom groups can be deleted' }, { status: 400 })
    }

    // Delete thread post attachments
    await prisma.threadPostAttachments.deleteMany({
      where: {
        post: {
          thread: {
            group_id: group_id
          }
        }
      }
    })

    // Delete thread posts
    await prisma.threadPost.deleteMany({
      where: {
        thread: {
          group_id: group_id
        }
      }
    })

    // Delete threads
    await prisma.thread.deleteMany({
      where: {
        group_id: group_id
      }
    })

    // Delete forums
    await prisma.forum.deleteMany({
      where: {
        group_id: group_id
      }
    })

    // Delete custom group members first
    await prisma.customGroupMembers.deleteMany({
      where: { custom_group_id: existingGroup.custom!.id }
    })

    // Delete custom group
    await prisma.customGroup.delete({
      where: { group_id: group_id }
    })

    // Delete base group
    await prisma.group.delete({
      where: { id: group_id }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Group deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-group:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to delete group' },
      { status: 500 }
    )
  }
}
