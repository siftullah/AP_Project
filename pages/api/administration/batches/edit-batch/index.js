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

    // Get batch details from request body
    const { batch_id, batch_name } = await request.json()

    // Find and update batch and associated group
    const batch = await prisma.batch.update({
      where: {
        id: batch_id
      },
      data: {
        name: batch_name,
        groups: {
          update: {
            where: {
              batch_id: batch_id
            },
            data: {
              group: {
                update: {
                  name: `${batch_name} Group`,
                  type: 'batch'
                }
              }
            }
          }
        }
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
      message: 'Batch updated successfully',
      batch
    })

  } catch (error) {
    console.error('Error in edit-batch:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update batch' },
      { status: 500 }
    )
  }
}