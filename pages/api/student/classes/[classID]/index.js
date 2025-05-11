export const dynamic = "force-dynamic";

import { getAuth } from "@clerk/nextjs/server";
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

    const { classID } = req.query;

    // Get classroom details with related data
    const classroom = await prisma.classroom.findFirst({
      where: {
        id: classID,
        enrollments: {
          some: {
            student: {
              user_id: userId,
            },
          },
        },
      },
      include: {
        course: true,
        teachers: {
          include: {
            user: true,
          },
        },
        enrollments: {
          include: {
            student: true,
          },
        },
        threads: {
          include: {
            posts: {
              include: {
                created_by: true,
              },
            },
            assignments: {
              include: {
                submissions: {
                  where: {
                    student: {
                      user_id: userId,
                    },
                  },
                  select: {
                    marks: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!classroom) {
      return res
        .status(404)
        .json({ error: "Classroom not found or access denied" });
    }

    // Format the response
    const formattedResponse = {
      id: classroom.id,
      name: classroom.name,
      courseInfo: {
        code: classroom.course.course_code,
        name: classroom.course.course_name,
      },
      teachers: {
        faculty: classroom.teachers
          .filter((t) => t.type === "faculty")
          .map((t) => ({
            id: t.user.id,
            name: `${t.user.first_name} ${t.user.last_name}`,
          })),
        ta: classroom.teachers
          .filter((t) => t.type === "TA")
          .map((t) => ({
            id: t.user.id,
            name: `${t.user.first_name} ${t.user.last_name}`,
          })),
      },
      studentCount: classroom.enrollments.length,
      threads: {
        announcements: classroom.threads
          .filter((t) => t.type === "announcement")
          .map((thread) => {
            const mainPost = thread.posts.find((p) => p.type === "main");
            return {
              id: thread.id,
              title: thread.title,
              main_post: {
                id: mainPost?.id,
                description: mainPost?.description,
                createdAt: mainPost?.createdAt,
                author: `${mainPost?.created_by.first_name} ${mainPost?.created_by.last_name}`,
              },
            };
          }),
        assignments: classroom.threads
          .filter((t) => t.type === "assignment")
          .map((thread) => {
            const mainPost = thread.posts.find((p) => p.type === "main");
            return {
              id: thread.id,
              title: thread.title,
              assignment: {
                id: thread.assignments[0]?.id,
                dueDate: thread.assignments[0]?.due_date,
                totalMarks: thread.assignments[0]?.total_marks,
                marks: thread.assignments[0]?.submissions[0]?.marks,
              },
              main_post: {
                id: mainPost?.id,
                description: mainPost?.description,
                createdAt: mainPost?.createdAt,
                author: `${mainPost?.created_by.first_name} ${mainPost?.created_by.last_name}`,
              },
            };
          }),
        discussions: classroom.threads
          .filter((t) => t.type === "discussion")
          .map((thread) => {
            const mainPost = thread.posts.find((p) => p.type === "main");
            return {
              id: thread.id,
              title: thread.title,
              main_post: {
                id: mainPost?.id,
                description: mainPost?.description,
                createdAt: mainPost?.createdAt,
                author: `${mainPost?.created_by.first_name} ${mainPost?.created_by.last_name}`,
              },
              reply_count: thread.posts.length - 1,
            };
          }),
      },
    };

    await prisma.$disconnect();
    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching classroom details:", error);
    await prisma.$disconnect();
    return res.status(500).json({ error: "Internal server error" });
  }
}
