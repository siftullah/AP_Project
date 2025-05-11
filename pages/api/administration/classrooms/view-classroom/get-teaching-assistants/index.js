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

    // Get classroom ID from URL
    const { searchParams } = new URL(request.url)
    const classroomId = searchParams.get('classroom_id')

    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 })
    }

    // Get classroom teachers where type is ta
    const classroomTeachers = await prisma.classroomTeachers.findMany({
      where: {
        classroom_id: classroomId,
        type: {
          equals: 'ta',
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        user_id: true
      }
    })

    // Get all students for the university
    const students = await prisma.student.findMany({
      where: {
        department_batch: {
          department: {
            university_id: universityId
          }
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            id: true
          }
        },
        department_batch: {
          include: {
            department: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // Group students by department
    const studentsByDepartment: { [key: string]: any[] } = {}
    students.forEach(student => {
      const department = student.department_batch.department.name
      
      if (!studentsByDepartment[department]) {
        studentsByDepartment[department] = []
      }

      studentsByDepartment[department].push({
        user_id: student.user.id,
        name: `${student.user.first_name} ${student.user.last_name}`,
        is_classroom_teacher: classroomTeachers.some(ct => ct.user_id === student.user.id),
        classroom_teacher_id: classroomTeachers.find(ct => ct.user_id === student.user.id)?.id
      })
    })

    await prisma.$disconnect()
    return NextResponse.json({
      students_by_department: studentsByDepartment
    })

  } catch (error) {
    console.error('Error in get-teaching-assistants:', error)
    await prisma.$disconnect() 
    return NextResponse.json(
      { error: 'Failed to fetch teaching assistants' },
      { status: 500 }
    )
  }
}