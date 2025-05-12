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

    // Check if the user is a faculty member
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
    });

    if (!faculty) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Faculty access required" });
    }

    const classroom = await prisma.classroom.findFirst({
      where: {
        id: params.classID,
        teachers: {
          some: {
            user_id: userId,
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
            student: {
              include: {
                user: true,
              },
            },
          },
        },
        threads: {
          include: {
            main_post: {
              include: {
                created_by: true,
                attachments: true,
              },
            },
            assignments: {
              include: {
                submissions: true,
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
      course: {
        id: classroom.course.id,
        code: classroom.course.course_code,
        name: classroom.course.course_name,
      },
      teachers: {
        faculty: classroom.teachers
          .filter((t) => t.type === "faculty")
          .map((t) => ({
            id: t.user.id,
            name: `${t.user.first_name} ${t.user.last_name}`,
            email: t.user.email_address,
          })),
        ta: classroom.teachers
          .filter((t) => t.type === "TA")
          .map((t) => ({
            id: t.user.id,
            name: `${t.user.first_name} ${t.user.last_name}`,
            email: t.user.email_address,
          })),
      },
      students: classroom.enrollments.map((e) => ({
        id: e.student.id,
        name: `${e.student.user.first_name} ${e.student.user.last_name}`,
        email: e.student.user.email_address,
        rollNumber: e.student.roll_number,
      })),
      threads: {
        announcements: classroom.threads
          .filter((t) => t.type === "announcement")
          .map((thread) => ({
            id: thread.id,
            title: thread.title,
            description: thread.main_post?.description || "",
            createdAt: thread.main_post?.createdAt,
            author: thread.main_post?.created_by
              ? `${thread.main_post.created_by.first_name} ${thread.main_post.created_by.last_name}`
              : "Unknown",
            attachments: thread.main_post?.attachments || [],
          })),
        discussions: classroom.threads
          .filter((t) => t.type === "discussion")
          .map((thread) => ({
            id: thread.id,
            title: thread.title,
            description: thread.main_post?.description || "",
            createdAt: thread.main_post?.createdAt,
            author: thread.main_post?.created_by
              ? `${thread.main_post.created_by.first_name} ${thread.main_post.created_by.last_name}`
              : "Unknown",
            attachments: thread.main_post?.attachments || [],
          })),
        assignments: classroom.threads
          .filter((t) => t.type === "assignment")
          .map((thread) => ({
            id: thread.id,
            title: thread.title,
            description: thread.main_post?.description || "",
            createdAt: thread.main_post?.createdAt,
            author: thread.main_post?.created_by
              ? `${thread.main_post.created_by.first_name} ${thread.main_post.created_by.last_name}`
              : "Unknown",
            assignment: thread.assignments[0]
              ? {
                  id: thread.assignments[0].id,
                  dueDate: thread.assignments[0].due_date,
                  totalMarks: thread.assignments[0].total_marks,
                  submissionCount: thread.assignments[0].submissions.length,
                  pendingGrading: thread.assignments[0].submissions.filter(
                    (s) => s.marks === null
                  ).length,
                }
              : null,
            attachments: thread.main_post?.attachments || [],
          })),
      },
      stats: {
        studentCount: classroom.enrollments.length,
        assignmentCount: classroom.threads.filter(
          (t) => t.type === "assignment"
        ).length,
        announcementCount: classroom.threads.filter(
          (t) => t.type === "announcement"
        ).length,
      },
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching classroom details:", error);
    return res.status(500).json({ error: "Failed to fetch classroom details" });
  }
}
