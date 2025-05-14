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

    
    const { student_id } = req.body

    
    const existingStudent = await prisma.student.findUnique({
      where: { id: student_id },
      include: { user: true }
    })

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    
    await prisma.$transaction(async (tx) => {
      
      await tx.submissionAttachments.deleteMany({
        where: { submission: { student_id: student_id } }
      })

      
      await tx.submission.deleteMany({
        where: { student_id: student_id }
      })

      
      await tx.enrollment.deleteMany({
        where: { student_id: student_id }
      })

      
      await tx.classroomPostAttachments.deleteMany({
        where: { post: { created_by: { id: existingStudent.user_id } } }
      })

      
      await tx.classroomPost.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      
      const studentClassroomThreads = await tx.classroomThread.findMany({
        where: {
          main_post_id: {
            in: await tx.classroomPost.findMany({
              where: { user_id: existingStudent.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.classroomThread.deleteMany({
        where: { id: { in: studentClassroomThreads.map(t => t.id) } }
      })

      
      await tx.threadPostAttachments.deleteMany({
        where: { post: { user_id: existingStudent.user_id } }
      })

      
      await tx.threadPost.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      
      const studentThreads = await tx.thread.findMany({
        where: {
          main_post_id: {
            in: await tx.threadPost.findMany({
              where: { user_id: existingStudent.user_id },
              select: { id: true }
            }).then(posts => posts.map(p => p.id))
          }
        }
      })
      await tx.thread.deleteMany({
        where: { id: { in: studentThreads.map(t => t.id) } }
      })

      
      await tx.forum.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      
      await tx.customGroupMembers.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      
      await tx.customGroup.deleteMany({
        where: { user_id: existingStudent.user_id }
      })

      
      await tx.student.delete({
        where: { id: student_id }
      })

      
      await tx.user.delete({
        where: { id: existingStudent.user_id }
      })
    })

    
    await client.users.deleteUser(existingStudent.user_id)

    await prisma.$disconnect()
    return res.status(200).json({ 
      message: 'Student deleted successfully'
    })

  } catch (error) {
    console.error('Error in delete-student:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to delete student' })
  }
}