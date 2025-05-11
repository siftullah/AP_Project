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
    const { group_name, type, batch_id, department_id, user_ids } = await request.json()

    // Create base group
    const group = await prisma.group.create({
      data: {
        name: group_name,
        type: type
      }
    })

    // Handle different group types
    if (type === 'batch' && batch_id) {
      await prisma.batchGroup.create({
        data: {
          group_id: group.id,
          batch_id: batch_id
        }
      })
    } 
    else if (type === 'department' && department_id) {
      await prisma.departmentGroup.create({
        data: {
          group_id: group.id,
          department_id: department_id
        }
      })
    }
    else if (type === 'custom' && user_ids && Array.isArray(user_ids)) {
      // Create custom group
      const customGroup = await prisma.customGroup.create({
        data: {
          group_id: group.id,
          user_id: user.id // Created by current user
        }
      })

      // Add members to custom group
      const memberPromises = user_ids.map(userId =>
        prisma.customGroupMembers.create({
          data: {
            custom_group_id: customGroup.id,
            user_id: userId
          }
        })
      )
      await Promise.all(memberPromises)
    }
    else {
      return NextResponse.json({ error: 'Invalid group type or missing required fields' }, { status: 400 })
    }

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Group created successfully',
      group
    })

  } catch (error) {
    console.error('Error in add-group:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    )
  }
}
