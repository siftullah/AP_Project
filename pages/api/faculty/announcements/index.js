import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(404).json({ error: "Unauthenticated User" });
    }

    
    const faculty = await prisma.faculty.findFirst({
      where: { user_id: userId },
      include: {
        department: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Student not found" });
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

    
    const threads = await prisma.thread.findMany({
      where: {
        type: "announcement",
        OR: [
          { forum_id: { not: null } }, 
          {
            AND: [
              { group_id: { not: null } },
              {
                group_id: {
                  in: [
                    ...(departmentGroup ? [departmentGroup.group_id] : []),
                    ...(batchGroups.map((batchGroup) => batchGroup.group_id) ||
                      []),
                    ...customGroupIds,
                  ],
                },
              },
            ],
          },
        ],
      },
      include: {
        main_post: {
          include: {
            created_by: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        posts: {
          where: { type: "reply" },
          select: { id: true },
        },
        group: true,
      },
    });

    const formattedResponse = {
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        type: thread.forum_id
          ? "General"
          : batchGroups.find(
              (batchGroup) => batchGroup.group_id === thread.group_id
            )
          ? "Batch"
          : thread.group_id === departmentGroup?.group_id
          ? "Department"
          : "Custom",
        main_post: {
          id: thread.main_post?.id,
          description: thread.main_post?.description,
          created_by: `${thread.main_post?.created_by.first_name} ${thread.main_post?.created_by.last_name}`,
        },
        reply_count: thread.posts.length,
      })),
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
