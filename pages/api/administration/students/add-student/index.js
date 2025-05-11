import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const client = await clerkClient()
  
  try {
    // Get current user and verify university_id
    const user = await currentUser()
    if (!user?.publicMetadata['university_id']) {
      return NextResponse.json({ error: 'University ID of authenticated user not found' }, { status: 401 })
    }
    const universityId = user.publicMetadata['university_id'] as string

    // Get student details from request body
    const { roll_number, first_name, last_name, email, department_id, batch_id } = await request.json()

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
    return NextResponse.json({ 
      message: 'Student created successfully',
      student
    })

  } catch (error) {
    console.error('Error in add-student:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}