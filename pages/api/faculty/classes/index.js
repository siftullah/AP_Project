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

    // Get faculty details including their classes
    const facultyWithClasses = await prisma.faculty.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          include: {
            classroom_teachers: {
              include: {
                classroom: {
                  include: {
                    course: true,
                    enrollments: true,
                    assignments: {
                      include: {
                        submissions: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!facultyWithClasses) {
      return res.status(404).json({ error: "Faculty record not found" });
    }

    // Format the response
    const classes = facultyWithClasses.user.classroom_teachers.map((ct) => ({
      id: ct.classroom.id,
      name: ct.classroom.name,
      course: {
        id: ct.classroom.course.id,
        code: ct.classroom.course.course_code,
        name: ct.classroom.course.course_name,
      },
      studentCount: ct.classroom.enrollments.length,
      assignmentStats: {
        total: ct.classroom.assignments.length,
        pendingGrading: ct.classroom.assignments.reduce(
          (acc, assignment) =>
            acc +
            assignment.submissions.filter((sub) => sub.marks === null).length,
          0
        ),
      },
    }));

    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return res.status(500).json({ error: "Failed to fetch classes" });
  }
}
