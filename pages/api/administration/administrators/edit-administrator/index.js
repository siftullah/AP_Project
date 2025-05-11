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

    // Get details from request body
    const { uniAdministrationId, firstName, lastName, emailAddress, roleId } = await request.json()

    // Get role details
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id: roleId },
      select: { role: true }
    })

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Check if role is Super Admin
  
    // Get existing admin record
    const existingAdmin = await prisma.uniAdministration.findUnique({
      where: { id: uniAdministrationId },
      include: { user: true }
    })

    if (!existingAdmin) {
      return NextResponse.json({ error: 'Administrator not found' }, { status: 404 })
    }

    // Get Clerk user details
    const clerkUser = await clerk_client.users.getUser(existingAdmin.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return NextResponse.json({ error: 'Primary email not found' }, { status: 404 })
    }

    // Update Clerk user
    await clerk_client.users.updateUser(existingAdmin.user_id, {
      firstName,
      lastName,
    })

    // Only update email if it's different from current email
    if (currentEmail !== emailAddress) {
      // Create new email address
      const newEmail = await clerk_client.emailAddresses.createEmailAddress({
        userId: existingAdmin.user_id,
        emailAddress: emailAddress,
        primary: true,
        verified: true
      })

      // Delete old email address
      await clerk_client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    // Update user in database
    await prisma.user.update({
      where: { id: existingAdmin.user_id },
      data: {
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
      }
    })

    if (role.role.toLowerCase() === 'super admin') {
    
    }
    else
    {
    // Update role
    await prisma.uniAdministration.update({
      where: { id: uniAdministrationId },
      data: {
        role_id: roleId
      }
    })
  }

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Administrator updated successfully'
    })

  } catch (error) {
    console.error('Error in edit-administrator:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to update administrator' },
      { status: 500 }
    )
  }
}