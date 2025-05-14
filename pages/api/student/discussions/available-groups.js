import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    
    const student = await prisma.student.findUnique({
      where: { user_id: userId },
      include: {
        department_batch: {
          include: {
            batch: {
              include: {
                university: true,
              },
            },
            department: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    
    const forums = await prisma.forum.findMany({
      where: {
        university_id: student.department_batch.batch.university_id,
        OR: [
          { group_id: null }, 
          {
            group_id: {
              in: [
                student.department_batch.batch.id, 
                student.department_batch.department.id, 
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

    
    const batch = {
      id: student.department_batch.batch.id,
      name: student.department_batch.batch.name,
    };

    const department = {
      id: student.department_batch.department.id,
      name: student.department_batch.department.name,
    };

    return res.status(200).json({
      forums,
      batch,
      department,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to fetch available groups" });
  }
}
