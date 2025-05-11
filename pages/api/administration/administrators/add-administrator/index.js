import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'

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
    const { firstName, lastName, emailAddress, roleId } = await request.json()

    // Get role details
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id: roleId },
      select: { role: true }
    })

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Check if role is Super Admin
    if (role.role.toLowerCase() === 'super admin') {
      return NextResponse.json({ error: 'Cannot create Super Admin' }, { status: 403 })
    }

    // Generate random 8 digit password
    const password = randomBytes(4).toString('hex')

    // Create Clerk user
    const clerkUser = await clerk_client.users.createUser({
      firstName,
      lastName,
      emailAddress: [emailAddress],
      password,
    })

    // Create user in database
    const dbUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
        role: 'admin',
        university_id: universityId
      }
    })

    // Create UniAdministration record
    const uniAdmin = await prisma.uniAdministration.create({
      data: {
        user_id: clerkUser.id,
        role_id: roleId
      }
    })

    // Update Clerk user metadata with administration_id
    await clerk_client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        role: 'admin',
        university_id: universityId,
        administration_id: uniAdmin.id
      }
    })

    await prisma.$disconnect()
    return NextResponse.json({ 
      message: 'Administrator created successfully'
    })

  } catch (error) {
    console.error('Error in add-administrator:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to create administrator' },
      { status: 500 }
    )
  }
}