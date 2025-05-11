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

    // Get classroom teachers where type is faculty
    const classroomTeachers = await prisma.classroomTeachers.findMany({
      where: {
        classroom_id: classroomId,
        type: {
          equals: 'faculty',
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        user_id: true
      }
    })

    // Get all faculty members for the university
    const facultyMembers = await prisma.faculty.findMany({
      where: {
        department: {
          university_id: universityId
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
        department: {
          select: {
            name: true
          }
        }
      }
    })

    // Group faculty by department
    const facultyByDepartment: { [key: string]: any[] } = {}
    facultyMembers.forEach(faculty => {
      const department = faculty.department.name
      
      if (!facultyByDepartment[department]) {
        facultyByDepartment[department] = []
      }

      facultyByDepartment[department].push({
        user_id: faculty.user.id,
        name: `${faculty.user.first_name} ${faculty.user.last_name}`,
        is_classroom_teacher: classroomTeachers.some(ct => ct.user_id === faculty.user.id),
        classroom_teacher_id: classroomTeachers.find(ct => ct.user_id === faculty.user.id)?.id
      })
    })

    await prisma.$disconnect()
    return NextResponse.json({
      faculty_by_department: facultyByDepartment
    })

  } catch (error) {
    console.error('Error in get-teachers:', error)
    await prisma.$disconnect() 
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}