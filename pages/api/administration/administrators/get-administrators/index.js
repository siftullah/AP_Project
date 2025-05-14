import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    
    const administrators = await prisma.uniAdministration.findMany({
      where: {
        role: {
          university_id: universityId
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email_address: true
          }
        },
        role: {
          select: {
            id: true,
            role: true
          }
        }
      }
    })

    
    const formattedAdministrators = administrators.map(admin => ({
      administration_id: admin.id,
      first_name: admin.user.first_name,
      last_name: admin.user.last_name,
      email: admin.user.email_address,
      role_name: admin.role.role,
      role_id: admin.role.id
    }))

    await prisma.$disconnect()
    return res.json(formattedAdministrators)

  } catch (error) {
    console.error('Error in get-administrators:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch administrators' })
  }
}