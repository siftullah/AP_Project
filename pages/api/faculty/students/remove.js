import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const { enrollmentId } = req.body;

    
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          include: {
            classroom_teachers: {
              where: {
                classroom: {
                  enrollments: {
                    some: {
                      id: enrollmentId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!faculty || faculty.user.classroom_teachers.length === 0) {
      return res
        .status(403)
        .json({ error: "Unauthorized to remove this student" });
    }

    
    await prisma.enrollment.delete({
      where: { id: enrollmentId },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to remove student" });
  }
}
