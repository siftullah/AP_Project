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

    // Get department details from request body
    const { department_id, department_name } = await request.json()

    // Find and update department and its associated group
    const department = await prisma.department.update({
      where: {
        id: department_id
      },
      data: {
        name: department_name,
        groups: {
          update: {
            where: {
              department_id: department_id
            },
            data: {
              group: {
                update: {
                  name: `${department_name} Group`
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
      message: 'Department updated successfully',
      department
    })

  } catch (error) {
    console.error('Error in edit-department:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 500 }
    )
  }
}