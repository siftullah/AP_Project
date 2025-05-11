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

    // Get batches with related counts
    const batches = await prisma.batch.findMany({
      where: {
        university_id: universityId
      },
      include: {
        departments: {
          include: {
            students: true
          }
        },
        classrooms: true
      }
    })

    // Format the response with counts
    const formattedBatches = batches.map(batch => {
      // Count total students across all departments
      const studentCount = batch.departments.reduce((total, dept) => {
        return total + dept.students.length
      }, 0)

      return {
        id: batch.id,
        name: batch.name,
        student_count: studentCount,
        classroom_count: batch.classrooms.length
      }
    })

    await prisma.$disconnect()
    return NextResponse.json(formattedBatches)

  } catch (error) {
    console.error('Error in get-batches:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch batches' },
      { status: 500 }
    )
  }
}