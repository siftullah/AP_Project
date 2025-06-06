import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    
    const { userId } = await getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    
    const faculty = await prisma.faculty.findFirst({
      where: { user_id: userId },
      include: {
        department: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    
    const customGroupMemberships = await prisma.customGroupMembers.findMany({
      where: { user_id: userId },
      select: { custom_group: { select: { group_id: true } } },
    });

    const customGroupIds = customGroupMemberships.map(
      (membership) => membership.custom_group.group_id
    );

    
    const departmentGroup = await prisma.departmentGroup.findFirst({
      where: { department_id: faculty.department.id },
      select: { group_id: true },
    });

    
    const batchGroups = await prisma.batchGroup.findMany({
      select: { group_id: true },
    });

    
    const forums = await prisma.forum.findMany({
      where: {
        OR: [
          { group_id: null }, 
          {
            group_id: {
              in: [
                ...(departmentGroup ? [departmentGroup.group_id] : []),
                ...(batchGroups.map((batchGroup) => batchGroup.group_id) || []),
                ...customGroupIds,
              ],
            },
          }, 
        ],
      },
      include: {
        group: true, 
        threads: {
          select: {
            id: true,
            posts: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
              select: {
                createdAt: true,
              },
            },
          },
        },
      },
    });

    const formattedResponse = {
      forums: forums.map((forum) => ({
        id: forum.id,
        title: forum.forum_name,
        group_name: forum.group?.name || "General",
        thread_count: forum.threads.length,
        last_activity:
          forum.threads
            .flatMap((thread) => thread.posts)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
            ?.createdAt || forum.createdAt,
      })),
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching forums:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
