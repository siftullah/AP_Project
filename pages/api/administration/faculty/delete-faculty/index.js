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

    
    const { faculty_id } = req.body

    
    const existingFaculty = await prisma.faculty.findUnique({
      where: { id: faculty_id },
      include: { user: true }
    })

    if (!existingFaculty) {
      return res.status(404).json({ error: 'Faculty not found' })
    }

    
    await prisma.$transaction(async (tx) => {
      
      await tx.classroomPostAttachments.deleteMany({
        where: { post: { created_by: { id: existingFaculty.user_id } } }
      })

      
      await tx.classroomPost.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      const facultyClassroomThreads = await tx.classroomThread.findMany({
        where: {
          main_post_id: {
            in: await tx.classroomPost.findMany({
              where: { user_id: existingFaculty.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.classroomThread.deleteMany({
        where: { id: { in: facultyClassroomThreads.map(t => t.id) } }
      })

      
      await tx.threadPostAttachments.deleteMany({
        where: { post: { user_id: existingFaculty.user_id } }
      })

      
      await tx.threadPost.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      const facultyThreads = await tx.thread.findMany({
        where: {
          main_post_id: {
            in: await tx.threadPost.findMany({
              where: { user_id: existingFaculty.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.thread.deleteMany({
        where: { id: { in: facultyThreads.map(t => t.id) } }
      })

      
      await tx.forum.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      await tx.customGroupMembers.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      await tx.customGroup.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      await tx.classroomTeachers.deleteMany({
        where: { user_id: existingFaculty.user_id }
      })

      
      await tx.faculty.delete({
        where: { id: faculty_id }
      })

      
      await tx.user.delete({
        where: { id: existingFaculty.user_id }
      })
    })

    
    await client.users.deleteUser(existingFaculty.user_id)

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Faculty deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-faculty:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete faculty' })
  }
}