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

    // Get request body
    const body = await request.json()
    const { threadId, title } = body

    if (!threadId || !title) {
      return NextResponse.json({ error: 'Thread ID and title are required' }, { status: 400 })
    }

    // Update thread
    const updatedThread = await prisma.thread.update({
      where: {
        id: threadId,
        university_id: universityId
      },
      data: {
        title: title
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(updatedThread)

  } catch (error) {
    console.error('Error in edit-thread:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update thread' },
      { status: 500 }
    )
  }
}
