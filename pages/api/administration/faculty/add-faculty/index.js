import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

    
    const { first_name, last_name, email, department_id, designation } = req.body

    
    const randomPassword = Math.random().toString(36).slice(-10)

    
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      firstName: first_name,
      lastName: last_name,
      password: randomPassword,
    })

    
    const dbUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        first_name,
        last_name,
        email_address: email,
        role: 'faculty',
        university_id: universityId
      }
    })

    
    const faculty = await prisma.faculty.create({
      data: {
        user_id: clerkUser.id,
        dept_id: department_id,
        designation
      },
      include: {
        user: true,
        department: true
      }
    })

    
    await client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        role: 'faculty',
        university_id: universityId,
        faculty_id: faculty.id,
      },
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Faculty created successfully',
      faculty
    })

  } catch (error) {
    console.error('Error in add-faculty:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create faculty' })
  }
}