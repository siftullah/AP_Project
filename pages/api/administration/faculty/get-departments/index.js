import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    // Get current user and verify university_id
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

    // Get departments for university
    const departments = await prisma.department.findMany({
      where: {
        university_id: universityId
      },
      select: {
        id: true, // department_id
        name: true // department_name
      }
    })

    // Map to match requested field names
    const mappedDepartments = departments.map(dept => ({
      department_id: dept.id,
      department_name: dept.name
    }))

    await prisma.$disconnect()
    return res.json(mappedDepartments)

  } catch (error) {
    console.error('Error in get-departments:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to fetch departments' })
  }
}