import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const forumId = formData.get("forumId");
    const batchId = formData.get("batchId");
    const groupName = formData.get("groupName");
    const members = formData
      .getAll("members[]")
      .map((member) => member.toString());
    const attachment = formData.get("attachment");

    
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
      include: {
        department: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    
    const result = await prisma.$transaction(async (tx) => {
      let groupId = null;

      
      if (type === "private" && groupName && members.length > 0) {
        const group = await tx.group.create({
          data: {
            name: groupName,
            type: "custom",
            custom: {
              create: {
                user_id: userId,
                members: {
                  createMany: {
                    data: [
                      { user_id: userId },
                      ...members.map((memberId) => ({
                        user_id: memberId,
                      })),
                    ],
                  },
                },
              },
            },
          },
        });
        groupId = group.id;
      } else if (type === "batch" && batchId) {
        const batchGroup = await tx.batchGroup.findUnique({
          where: { batch_id: batchId },
        });
        groupId = batchGroup?.group_id || null;
      } else if (type === "department") {
        const departmentGroup = await tx.departmentGroup.findUnique({
          where: { department_id: faculty.department.id },
        });
        groupId = departmentGroup?.group_id || null;
      }

      
      const thread = await tx.thread.create({
        data: {
          title,
          type: "discussion",
          university_id: faculty.department.university_id,
          forum_id: type === "general" ? forumId : null,
          group_id: groupId,
          posts: {
            create: {
              type: "main",
              description,
              user_id: user.id,
              
              ...(attachment && {
                attachments: {
                  create: {
                    filename: attachment.name,
                    filepath: "path/to/store", 
                  },
                },
              }),
            },
          },
        },
        include: {
          posts: true,
        },
      });

      
      await tx.thread.update({
        where: { id: thread.id },
        data: { main_post_id: thread.posts[0].id },
      });

      return thread;
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating discussion:", error);
    return res.status(500).json({ error: "Failed to create discussion" });
  }
}
