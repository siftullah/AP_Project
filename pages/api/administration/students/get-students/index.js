export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get students with related data
    const students = await prisma.student.findMany({
      where: {
        department_batch: {
          department: {
            university_id: universityId
          }
        }
      },
      select: {
        id: true,
        roll_number: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            email_address: true
          }
        },
        department_batch: {
          select: {
            department: {
              select: {
                id: true,
                name: true
              }
            },
            batch: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        enrollments: {
          select: {
            classroom: {
              select: {
                course_id: true
              }
            }
          }
        }
      }
    })

    // Format response
    const formattedStudents = students.map(student => ({
      id: student.id,
      roll_number: student.roll_number,
      first_name: student.user.first_name,
      last_name: student.user.last_name,
      email: student.user.email_address,
      department: student.department_batch.department.name,
      department_id: student.department_batch.department.id,
      batch: student.department_batch.batch.name,
      batch_id: student.department_batch.batch.id,
      enrolled_courses_count: new Set(student.enrollments.map(e => e.classroom.course_id)).size
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedStudents)

  } catch (error) {
    console.error('Error in get-students:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}