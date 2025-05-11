import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'

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

    // Get details from request body
    const { firstName, lastName, emailAddress, roleId } = req.body

    // Get role details
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id: roleId },
      select: { role: true }
    })

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    // Check if role is Super Admin
    if (role.role.toLowerCase() === 'super admin') {
      return res.status(403).json({ error: 'Cannot create Super Admin' })
    }

    // Generate random 8 digit password
    const password = randomBytes(4).toString('hex')

    // Create Clerk user
    const clerkUser = await client.users.createUser({
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
    await client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        role: 'admin',
        university_id: universityId,
        administration_id: uniAdmin.id
      }
    })

    await prisma.$disconnect()
    return res.json({ 
      message: 'Administrator created successfully'
    })

  } catch (error) {
    console.error('Error in add-administrator:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to create administrator' })
  }
}