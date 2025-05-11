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

    // Get faculty details from request body
    const { faculty_id, first_name, last_name, email, department_id, designation } = await request.json()

    // Get existing faculty record
    const existingFaculty = await prisma.faculty.findUnique({
      where: { id: faculty_id },
      include: { user: true }
    })

    if (!existingFaculty) {
      return NextResponse.json({ error: 'Faculty not found' }, { status: 404 })
    }

    // Get Clerk user details
    const clerkUser = await clerk_client.users.getUser(existingFaculty.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return NextResponse.json({ error: 'Primary email not found' }, { status: 404 })
    }

    // Update Clerk user
    await clerk_client.users.updateUser(existingFaculty.user_id, {
      firstName: first_name,
      lastName: last_name,
    })

    // Only update email if it's different from current email
    if (currentEmail !== email) {
      // Create new email address
      const newEmail = await clerk_client.emailAddresses.createEmailAddress({
        userId: existingFaculty.user_id,
        emailAddress: email,
        primary: true,
        verified: true
      })

      // Delete old email address
      await clerk_client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    // Update user in database
    await prisma.user.update({
      where: { id: existingFaculty.user_id },
      data: {
        first_name,
        last_name,
        email_address: email,
      }
    })

    // Update faculty record
    const faculty = await prisma.faculty.update({
      where: { id: faculty_id },
      data: {
        dept_id: department_id,
        designation
      },
      include: {
        user: true,
        department: true
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Faculty updated successfully',
      faculty
    })

  } catch (error) {
    console.error('Error in edit-faculty:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update faculty' },
      { status: 500 }
    )
  }
}