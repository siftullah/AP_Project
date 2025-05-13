import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get student details from request body
    const { roll_number, first_name, last_name, email, department_id, batch_id } = req.body

    // Generate random password for new user
    const randomPassword = Math.random().toString(36).slice(-10)

    // Create Clerk user first
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      firstName: first_name,
      lastName: last_name,
      password: randomPassword,
    })

    // Get or create department batch
    let departmentBatch = await prisma.departmentBatches.findFirst({
      where: {
        dept_id: department_id,
        batch_id: batch_id
      }
    })

    if (!departmentBatch) {
      departmentBatch = await prisma.departmentBatches.create({
        data: {
          dept_id: department_id,
          batch_id: batch_id
        }
      })
    }

    // Create user record
    const dbUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        first_name,
        last_name,
        email_address: email,
        role: 'student',
        university_id: universityId
      }
    })

    // Create student record
    const student = await prisma.student.create({
      data: {
        user_id: clerkUser.id,
        department_batch_id: departmentBatch.id,
        roll_number
      },
      include: {
        user: true,
        department_batch: {
          include: {
            department: true,
            batch: true
          }
        }
      }
    })

    // Update Clerk user metadata
    await client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        role: 'student',
        university_id: universityId,
        student_id: student.id,
      },
    })

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Student created successfully',
      student
    })

  } catch (error) {
    console.error('Error in add-student:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create student' })
  }
}