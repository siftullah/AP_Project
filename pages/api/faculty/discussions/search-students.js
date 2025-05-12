import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.query;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    // Get current student's university
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        department: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Search for students in the same university
    const students = await prisma.student.findMany({
      where: {
        department_batch: {
          batch: {
            university_id: faculty.department.university_id,
          },
        },
        NOT: {
          user_id: userId, // Exclude current user
        },
        OR: [
          {
            user: {
              first_name: {
                contains: query || "",
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              last_name: {
                contains: query || "",
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      take: 10, // Limit results
    });

    return res.status(200).json({
      students: students.map((s) => ({
        id: s.user.id,
        first_name: s.user.first_name,
        last_name: s.user.last_name,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to search students" });
  }
}
