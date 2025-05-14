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

    const { firstName, lastName, emailAddress, roleId } = req.body

    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id: roleId },
      select: { role: true }
    })

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    if (role.role.toLowerCase() === 'super admin') {
      return res.status(403).json({ error: 'Cannot create Super Admin' })
    }

    const password = randomBytes(4).toString('hex')

    const clerkUser = await client.users.createUser({
      firstName,
      lastName,
      emailAddress: [emailAddress],
      password,
    })

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

    const uniAdmin = await prisma.uniAdministration.create({
      data: {
        user_id: clerkUser.id,
        role_id: roleId
      }
    })

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