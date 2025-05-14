

import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const prisma = new PrismaClient()
   
  try {
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    
    const { classroom_id: classroomId } = req.query

    if (!classroomId) {
      return res.status(400).json({ error: 'Classroom ID is required' })
    }

    
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

    
    const facultyByDepartment = {}
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
    return res.status(200).json({
      faculty_by_department: facultyByDepartment
    })

  } catch (error) {
    console.error('Error in get-teachers:', error)
    await prisma.$disconnect() 
    return res.status(500).json({ error: 'Failed to fetch teachers' })
  }
}