export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string
    const userId = user.id

    // Get forum_name and group_id from request body
    const { forum_name, group_id } = await request.json()

    if (!forum_name) {
      return NextResponse.json({ error: 'Forum name is required' }, { status: 400 })
    }

    // Check if group exists if group_id is provided
    if (group_id) {
      const group = await prisma.group.findUnique({
        where: { id: group_id }
      })
      if (!group) {
        return NextResponse.json({ error: 'Invalid group ID provided' }, { status: 400 })
      }
    }

    // Create new forum
    const newForum = await prisma.forum.create({
      data: {
        forum_name,
        university_id: universityId,
        user_id: userId,
        ...(group_id && { group_id }) // Only include group_id if provided and valid
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(newForum)

  } catch (error) {
    console.error('Error in create-forum:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create forum' },
      { status: 500 }
    )
  }
}
