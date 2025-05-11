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
    const { group_id, user_ids } = await request.json()

    if (!group_id || !user_ids || !Array.isArray(user_ids)) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
    }

    // Check if group exists and is custom type
    const existingGroup = await prisma.group.findUnique({
      where: { id: group_id },
      include: {
        custom: {
          include: {
            members: true
          }
        }
      }
    })

    if (!existingGroup) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    if (existingGroup.type !== 'custom') {
      return NextResponse.json({ error: 'Only custom groups can be edited' }, { status: 400 })
    }

    // Get existing member IDs
    const existingMemberIds = existingGroup.custom!.members.map(member => member.user_id)

    // Find members to add (in user_ids but not in existingMemberIds)
    const membersToAdd = user_ids.filter(id => !existingMemberIds.includes(id))

    // Find members to remove (in existingMemberIds but not in user_ids)
    const membersToRemove = existingMemberIds.filter(id => !user_ids.includes(id))

    // Add new members
    if (membersToAdd.length > 0) {
      await prisma.customGroupMembers.createMany({
        data: membersToAdd.map(userId => ({
          custom_group_id: existingGroup.custom!.id,
          user_id: userId
        }))
      })
    }

    // Remove old members and their content
    if (membersToRemove.length > 0) {
      // Delete thread post attachments
      await prisma.threadPostAttachments.deleteMany({
        where: {
          post: {
            user_id: { in: membersToRemove },
            thread: {
              group_id: group_id
            }
          }
        }
      })

      // Delete thread posts
      await prisma.threadPost.deleteMany({
        where: {
          user_id: { in: membersToRemove },
          thread: {
            group_id: group_id
          }
        }
      })

      // Delete threads
      await prisma.thread.deleteMany({
        where: {
          group_id: group_id,
          posts: {
            some: {
              user_id: { in: membersToRemove }
            }
          }
        }
      })

      // Delete forums
      await prisma.forum.deleteMany({
        where: {
          group_id: group_id,
          user_id: { in: membersToRemove }
        }
      })

      // Finally remove members
      await prisma.customGroupMembers.deleteMany({
        where: {
          custom_group_id: existingGroup.custom!.id,
          user_id: { in: membersToRemove }
        }
      })
    }

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Group members updated successfully'
    })

  } catch (error) {
    console.error('Error in edit-group-members:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update group members' },
      { status: 500 }
    )
  }
}
