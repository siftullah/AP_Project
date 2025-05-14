import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
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

    
    const faculty = await prisma.faculty.findMany({
      where: {
        department: {
          university_id: universityId
        }
      },
      include: {
        user: true,
        department: true,
        
        
      }
    })

    
    const formattedFaculty = await Promise.all(faculty.map(async f => {
      
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
    return res.status(200).json(formattedFaculty)

  } catch (error) {
    console.error('Error in get-faculty:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch faculty' })
  }
}