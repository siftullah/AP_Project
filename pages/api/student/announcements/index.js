import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get current user
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get student details including department and batch info
    const student = await prisma.student.findFirst({
      where: { user_id: userId },
      include: {
        department_batch: {
          include: {
            department: true,
            batch: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get all custom groups the student is part of
    const customGroupMemberships = await prisma.customGroupMembers.findMany({
      where: { user_id: userId },
      select: { custom_group: { select: { group_id: true } } },
    });

    const customGroupIds = customGroupMemberships.map(
      (membership) => membership.custom_group.group_id
    );

    // Get department and batch groups
    const [departmentGroup, batchGroup] = await Promise.all([
      prisma.departmentGroup.findFirst({
        where: { department_id: student.department_batch.department.id },
        select: { group_id: true },
      }),
      prisma.batchGroup.findFirst({
        where: { batch_id: student.department_batch.batch.id },
        select: { group_id: true },
      }),
    ]);

    // Fetch all relevant threads
    const threads = await prisma.thread.findMany({
      where: {
        type: "announcement",
        OR: [
          { forum_id: { not: null } }, // General discussions
          {
            AND: [
              { group_id: { not: null } },
              {
                group_id: {
                  in: [
                    ...(departmentGroup ? [departmentGroup.group_id] : []),
                    ...(batchGroup ? [batchGroup.group_id] : []),
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
          : thread.group_id === batchGroup?.group_id
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
