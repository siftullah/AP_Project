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

    
    const { uniAdministrationId, firstName, lastName, emailAddress, roleId } = req.body

    
    const role = await prisma.uniAdministrationRoles.findUnique({
      where: { id: roleId },
      select: { role: true }
    })

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    
  
    
    const existingAdmin = await prisma.uniAdministration.findUnique({
      where: { id: uniAdministrationId },
      include: { user: true }
    })

    if (!existingAdmin) {
      return res.status(404).json({ error: 'Administrator not found' })
    }

    
    const clerkUser = await client.users.getUser(existingAdmin.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return res.status(404).json({ error: 'Primary email not found' })
    }

    
    await client.users.updateUser(existingAdmin.user_id, {
      firstName,
      lastName,
    })

    
    if (currentEmail !== emailAddress) {
      
      const newEmail = await client.emailAddresses.createEmailAddress({
        userId: existingAdmin.user_id,
        emailAddress: emailAddress,
        primary: true,
        verified: true
      })

      
      await client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    
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
    else {
      
      await prisma.uniAdministration.update({
        where: { id: uniAdministrationId },
        data: {
          role_id: roleId
        }
      })
    }

    await prisma.$disconnect()
    return res.json({ 
      message: 'Administrator updated successfully'
    })

  } catch (error) {
    console.error('Error in edit-administrator:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update administrator' })
  }
}