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

    // Get department name from request body
    const { name } = await request.json()

    // Create department
    const department = await prisma.department.create({
      data: {
        name,
        university_id: universityId,
        groups: {
          create: {
            group: {
              create: {
                name: `${name} Group`,
                type: 'department'
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
      message: 'Department created successfully',
      department
    })

  } catch (error) {
    console.error('Error in add-department:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create department' },
      { status: 500 }
    )
  }
}