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

    
    const studentWithClasses = await prisma.student.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        enrollments: {
          include: {
            classroom: {
              include: {
                course: true,
                teachers: {
                  include: {
                    user: true,
                  },
                  where: {
                    type: "faculty",
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!studentWithClasses) {
      return res.status(404).json({ error: "Student record not found" });
    }

    const classes = studentWithClasses.enrollments.map((enrollment) => ({
      id: enrollment.classroom.id,
      name: enrollment.classroom.name,
      course_code: enrollment.classroom.course.course_code,
      course_name: enrollment.classroom.course.course_name,
      teacher: enrollment.classroom.teachers[0]?.user
        ? `${enrollment.classroom.teachers[0].user.first_name} ${enrollment.classroom.teachers[0].user.last_name}`
        : "Unknown",
    }));

    await prisma.$disconnect();
    return res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return res
      .status(500)
      .json({ error: "Failed to fetch classes for student" });
  }
}
