import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    const clerk_client = await clerkClient()
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get student details from request body
    const { student_id, roll_number, first_name, last_name, email, department_id, batch_id } = await request.json()

    // Get existing student record
    const existingStudent = await prisma.student.findUnique({
      where: { id: student_id },
      include: { user: true }
    })

    if (!existingStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Get Clerk user details
    const clerkUser = await clerk_client.users.getUser(existingStudent.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return NextResponse.json({ error: 'Primary email not found' }, { status: 404 })
    }

    // Update Clerk user
    await clerk_client.users.updateUser(existingStudent.user_id, {
      firstName: first_name,
      lastName: last_name,
    })

    // Only update email if it's different from current email
    if (currentEmail !== email) {
      // Create new email address
      const newEmail = await clerk_client.emailAddresses.createEmailAddress({
        userId: existingStudent.user_id,
        emailAddress: email,
        primary: true,
        verified: true
      })

      // Delete old email address
      await clerk_client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    // Update user in database
    await prisma.user.update({
      where: { id: existingStudent.user_id },
      data: {
        first_name,
        last_name,
        email_address: email,
      }
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

    // Update student record
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
    return NextResponse.json({ 
      message: 'Student updated successfully',
      student
    })

  } catch (error) {
    console.error('Error in edit-student:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}