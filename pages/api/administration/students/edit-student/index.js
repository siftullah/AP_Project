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

    
    const { student_id, roll_number, first_name, last_name, email, department_id, batch_id } = req.body

    
    const existingStudent = await prisma.student.findUnique({
      where: { id: student_id },
      include: { user: true }
    })

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    
    const clerkUser = await client.users.getUser(existingStudent.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return res.status(404).json({ error: 'Primary email not found' })
    }

    
    await client.users.updateUser(existingStudent.user_id, {
      firstName: first_name,
      lastName: last_name,
    })

    
    if (currentEmail !== email) {
      
      const newEmail = await client.emailAddresses.createEmailAddress({
        userId: existingStudent.user_id,
        emailAddress: email,
        primary: true,
        verified: true
      })

      
      await client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    
    await prisma.user.update({
      where: { id: existingStudent.user_id },
      data: {
        first_name,
        last_name,
        email_address: email,
      }
    })

    
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

    
    const student = await prisma.student.update({
      where: { id: student_id },
      data: {
        roll_number,
        department_batch_id: departmentBatch.id
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

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Student updated successfully',
      student
    })

  } catch (error) {
    console.error('Error in edit-student:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update student' })
  }
}