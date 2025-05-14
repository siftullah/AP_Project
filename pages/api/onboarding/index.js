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
    const { universityName } = req.body

    
    const university = await prisma.university.create({
      data: {
        name: universityName,
      },
    })

    
    const defaultRoles = await prisma.defaultUniAdministrationRoles.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    })

    
    for (const defaultRole of defaultRoles) {
      await prisma.uniAdministrationRoles.create({
        data: {
          university_id: university.id,
          role: defaultRole.role_name,
          permissions: {
            create: defaultRole.permissions.map((p) => ({
              permission: {
                connect: {
                  id: p.permission_id,
                },
              },
            })),
          },
        },
      })
    }

    
    const superAdminRole = await prisma.uniAdministrationRoles.findFirst({
      where: {
        university_id: university.id,
        role: "Super Admin",
      },
    })

    
    await prisma.user.create({
      data: {
        id: userId,
        first_name: user?.firstName || "",
        last_name: user?.lastName || "",
        email_address: user?.emailAddresses[0]?.emailAddress || "",
        role: "admin",
        university_id: university.id,
      },
    })

    
    const uniSuperAdmin = await prisma.uniAdministration.create({
      data: {
        user_id: userId,
        role_id: superAdminRole?.id,
      },
    })

    
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "admin",
        university_id: university.id,
        administration_id: uniSuperAdmin.id,
      },
    })

    await prisma.$disconnect()
    return res.status(200).json({ success: true })

  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    return res.status(500).json({ error: "Internal server error" })
  }
}