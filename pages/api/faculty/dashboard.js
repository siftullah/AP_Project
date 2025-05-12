import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    // Get faculty data including their classrooms
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          include: {
            classroom_teachers: {
              include: {
                classroom: {
                  include: {
                    threads: {
                      include: {
                        posts: {
                          include: {
                            created_by: {
                              select: {
                                first_name: true,
                                last_name: true,
                              },
                            },
                          },
                        },
                      },
                      orderBy: {
                        createdAt: "desc",
                      },
                      take: 3,
                    },
                    assignments: {
                      orderBy: {
                        due_date: "desc",
                      },
                      take: 3,
                    },
                    enrollments: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    // Calculate statistics
    const activeClasses = faculty.user.classroom_teachers.length;

    const totalAssignments = faculty.user.classroom_teachers.reduce(
      (sum, ct) => sum + ct.classroom.assignments.length,
      0
    );

    const totalStudents = new Set(
      faculty.user.classroom_teachers.flatMap((ct) =>
        ct.classroom.enrollments.map((e) => e.student_id)
      )
    ).size;

    // Get recent assignments
    const recentAssignments = faculty.user.classroom_teachers
      .flatMap((ct) =>
        ct.classroom.assignments.map((assignment) => ({
          id: assignment.id,
          classroom_name: ct.classroom.name,
          total_marks: assignment.total_marks,
          due_date: assignment.due_date,
        }))
      )
      .sort((a, b) => b.due_date.getTime() - a.due_date.getTime())
      .slice(0, 3);

    // Get recent discussions
    const recentDiscussions = faculty.user.classroom_teachers
      .flatMap((ct) =>
        ct.classroom.threads.map((thread) => ({
          id: thread.id,
          title: thread.title,
          classroom_name: ct.classroom.name,
          author: thread.posts[0]?.created_by
            ? `${thread.posts[0].created_by.first_name} ${thread.posts[0].created_by.last_name}`
            : "Unknown",
          replies: thread.posts.filter((post) => post.type === "reply").length,
        }))
      )
      .sort((a, b) => b.replies - a.replies)
      .slice(0, 3);

    return res.status(200).json({
      stats: {
        activeClasses,
        totalAssignments,
        totalStudents,
      },
      user: {
        first_name: faculty.user.first_name,
        last_name: faculty.user.last_name,
      },
      recentAssignments,
      recentDiscussions,
    });
  } catch (error) {
    console.error("Error in faculty dashboard API:", error);
    return res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
}
