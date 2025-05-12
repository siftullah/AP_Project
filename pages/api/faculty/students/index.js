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

    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          include: {
            classroom_teachers: {
              include: {
                classroom: {
                  include: {
                    enrollments: {
                      include: {
                        student: {
                          include: {
                            user: {
                              select: {
                                first_name: true,
                                last_name: true,
                              },
                            },
                          },
                        },
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

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    // Format the response
    const classes = faculty.user.classroom_teachers.map((ct) => ({
      id: ct.classroom.id,
      name: ct.classroom.name,
    }));

    const students = faculty.user.classroom_teachers.flatMap((ct) =>
      ct.classroom.enrollments.map((enrollment) => ({
        id: enrollment.id,
        classroom_id: ct.classroom.id,
        student_id: enrollment.student.id,
        name: `${enrollment.student.user.first_name} ${enrollment.student.user.last_name}`,
        roll_number: enrollment.student.roll_number,
      }))
    );

    return res.status(200).json({
      classes,
      students,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to fetch students data" });
  }
}
