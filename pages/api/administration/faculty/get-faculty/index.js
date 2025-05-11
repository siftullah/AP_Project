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

    // Get faculty with related data
    const faculty = await prisma.faculty.findMany({
      where: {
        department: {
          university_id: universityId
        }
      },
      include: {
        user: true,
        department: true,
        // Faculty doesn't have direct access to classroom_teachers
        // Need to go through user relation
      }
    })

    // Format response
    const formattedFaculty = await Promise.all(faculty.map(async f => {
      // Get classroom count through user relation
      const classroomTeachers = await prisma.classroomTeachers.findMany({
        where: {
          user_id: f.user_id
        },
        select: {
          classroom_id: true
        }
      })

      return {
        id: f.id,
        first_name: f.user.first_name,
        last_name: f.user.last_name, 
        email: f.user.email_address,
        department: f.department.name,
        department_id: f.department.id,
        designation: f.designation,
        classrooms_count: new Set(classroomTeachers.map(ct => ct.classroom_id)).size
      }
    }))

    await prisma.$disconnect()
    return NextResponse.json(formattedFaculty)

  } catch (error) {
    console.error('Error in get-faculty:', error)
    await prisma.$disconnect() 
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    )
  }
}