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

    // Get batch name from request body
    const { name } = await request.json()

    // Create batch
    const batch = await prisma.batch.create({
      data: {
        name,
        university_id: universityId
      }
    })

    // Create group and batch group
    const group = await prisma.group.create({
      data: {
        name: `${name} Group`,
        type: 'batch',
        batch: {
          create: {
            batch_id: batch.id
          }
        }
      }
    })

    // Get batch with groups included
    const batchWithGroups = await prisma.batch.findUnique({
      where: {
        id: batch.id
      },
      include: {
        groups: {
          include: {
            group: true
          }
        }
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Batch created successfully',
      batch: batchWithGroups
    })

  } catch (error) {
    console.error('Error in add-batch:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create batch' },
      { status: 500 }
    )
  }
}