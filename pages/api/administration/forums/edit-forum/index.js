export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function PUT(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get forum_id and forum_name from request body
    const { forum_id, forum_name } = await request.json()

    if (!forum_id) {
      return NextResponse.json({ error: 'Forum ID is required' }, { status: 400 })
    }

    if (!forum_name) {
      return NextResponse.json({ error: 'Forum name is required' }, { status: 400 })
    }

    // Update forum
    const updatedForum = await prisma.forum.update({
      where: {
        id: forum_id,
        university_id: universityId
      },
      data: {
        forum_name
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(updatedForum)

  } catch (error) {
    console.error('Error in edit-forum:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update forum' },
      { status: 500 }
    )
  }
}
