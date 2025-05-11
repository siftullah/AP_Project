export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found'  }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get batches for university
    const batches = await prisma.batch.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true, // batch_id
        name: true // batch_name
      }
    })

    // Map to match requested field names
    const mappedBatches = batches.map(batch => ({
      batch_id: batch.id,
      batch_name: batch.name
    }))

    await prisma.$disconnect()
    return NextResponse.json(mappedBatches)

  } catch (error) {
    console.error('Error in get-batches:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch batches' },
      { status: 500 }
    )
  }
}