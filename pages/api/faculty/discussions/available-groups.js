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

    // Get faculty's info including university and department/batch
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        department: true,
      },
    });

    const batches = await prisma.batch.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get available forums (public or in student's groups)
    const forums = await prisma.forum.findMany({
      where: {
        university_id: faculty.department.university_id,
        OR: [
          { group_id: null }, // Public forums
          {
            group_id: {
              in: [
                faculty.department.id, // department forums
                ...(batches.map((batch) => batch.id) || []), // batch forums
              ],
            },
          },
        ],
      },
      select: {
        id: true,
        forum_name: true,
        group: {
          select: {
            name: true,
          },
        },
      },
    });

    const departments = [
      {
        id: faculty.department.id,
        name: faculty.department.name,
      },
    ];

    return res.status(200).json({
      forums,
      batches,
      departments,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to fetch available groups" });
  }
}
