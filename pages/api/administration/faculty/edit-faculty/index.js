import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    
    const { faculty_id, first_name, last_name, email, department_id, designation } = req.body

    
    const existingFaculty = await prisma.faculty.findUnique({
      where: { id: faculty_id },
      include: { user: true }
    })

    if (!existingFaculty) {
      return res.status(404).json({ error: 'Faculty not found' })
    }

    
    const clerkUser = await client.users.getUser(existingFaculty.user_id)
    const primaryEmailId = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.id
    const currentEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress

    if (!primaryEmailId) {
      return res.status(404).json({ error: 'Primary email not found' })
    }

    
    await client.users.updateUser(existingFaculty.user_id, {
      firstName: first_name,
      lastName: last_name,
    })

    
    if (currentEmail !== email) {
      
      const newEmail = await client.emailAddresses.createEmailAddress({
        userId: existingFaculty.user_id,
        emailAddress: email,
        primary: true,
        verified: true
      })

      
      await client.emailAddresses.deleteEmailAddress(primaryEmailId)
    }

    
    await prisma.user.update({
      where: { id: existingFaculty.user_id },
      data: {
        first_name,
        last_name,
        email_address: email,
      }
    })

    
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
    return res.json({ 
      message: 'Faculty updated successfully',
      faculty
    })

  } catch (error) {
    console.error('Error in edit-faculty:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to update faculty' })
  }
}