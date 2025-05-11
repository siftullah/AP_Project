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

    // Get groups for this university by checking related tables
    const groups = await prisma.group.findMany({
      where: {
        OR: [
          {
            // Check batch groups
            batch: {
              batch: {
                university_id: universityId
              }
            }
          },
          {
            // Check department groups 
            department: {
              department: {
                university_id: universityId
              }
            }
          },
          {
            // Check custom groups
            custom: {
              created_by: {
                university_id: universityId
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      groups: groups.map(group => ({
        group_id: group.id,
        group_name: group.name,
        group_type: group.type,
        created_at: group.createdAt
      }))
    })

  } catch (error) {
    console.error('Error in get-groups:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to get groups' },
      { status: 500 }
    )
  }
}
