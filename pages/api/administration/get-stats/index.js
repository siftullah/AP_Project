import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get current user using getAuth for Pages Router
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

  // Initialize the Backend SDK
  const client = await clerkClient()

  // Get the user's full `Backend User` object
  const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const university_id = user.publicMetadata['university_id']

    // Get counts for all entities
    const studentCount = await prisma.student.count({
      where: {
        department_batch: {
          department: {
            university_id
          }
        }
      }
    })

    const facultyCount = await prisma.faculty.count({
      where: {
        department: {
          university_id
        }
      }
    })

    const courseCount = await prisma.course.count({
      where: {
        department: {
          university_id
        }
      }
    })

    const classroomCount = await prisma.classroom.count({
      where: {
        course: {
          department: {
            university_id
          }
        }
      }
    })

    const departmentCount = await prisma.department.count({
      where: {
        university_id
      }
    })

    const batchCount = await prisma.batch.count({
      where: {
        university_id
      }
    })

    const adminCount = await prisma.uniAdministration.count({
      where: {
        role: {
          university_id
        }
      }
    })

    const forumCount = await prisma.forum.count({
      where: {
        university_id
      }
    })

    const threadCount = await prisma.thread.count({
      where: {
        university_id
      }
    })

    const postCount = await prisma.threadPost.count({
      where: {
        thread: {
          university_id
        }
      }
    })

    await prisma.$disconnect()
    return res.status(200).json([
      { name: "Total Students", value: studentCount, icon: "Users", color: "text-blue-500", bgColor: "bg-blue-50" },
      { name: "Total Faculty", value: facultyCount, icon: "GraduationCap", color: "text-green-500", bgColor: "bg-green-50" },
      { name: "Total Courses", value: courseCount, icon: "BookOpen", color: "text-yellow-500", bgColor: "bg-yellow-50" },
      { name: "Total Classrooms", value: classroomCount, icon: "School", color: "text-purple-500", bgColor: "bg-purple-50" },
      { name: "Total Departments", value: departmentCount, icon: "Building2", color: "text-red-500", bgColor: "bg-red-50" },
      { name: "Total Batches", value: batchCount, icon: "Users2", color: "text-indigo-500", bgColor: "bg-indigo-50" },
      { name: "Total Administrators", value: adminCount, icon: "ShieldCheck", color: "text-orange-500", bgColor: "bg-orange-50" },
      { name: "Total Forums", value: forumCount, icon: "MessagesSquare", color: "text-teal-500", bgColor: "bg-teal-50" },
      { name: "Total Threads", value: threadCount, icon: "MessageCircle", color: "text-pink-500", bgColor: "bg-pink-50" },
      { name: "Total Posts", value: postCount, icon: "MessageSquare", color: "text-cyan-500", bgColor: "bg-cyan-50" }
    ])

  } 
  catch (error) {
    console.error('Error fetching stats:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: error.message || 'Failed to fetch stats' })
  }
}