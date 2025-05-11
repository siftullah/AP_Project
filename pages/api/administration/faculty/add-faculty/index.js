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

    // Get faculty details from request body
    const { first_name, last_name, email, department_id, designation } = await request.json()

    // Generate random password for new user
    const randomPassword = Math.random().toString(36).slice(-10)

    // Create Clerk user first
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      firstName: first_name,
      lastName: last_name,
      password: randomPassword,
    })

    // Create user record
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

    // Create faculty record
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

    // Update Clerk user metadata
    await client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        role: 'faculty',
        university_id: universityId,
        faculty_id: faculty.id,
      },
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Faculty created successfully',
      faculty
    })

  } catch (error) {
    console.error('Error in add-faculty:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create faculty' },
      { status: 500 }
    )
  }
}