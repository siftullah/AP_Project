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

    const { classID } = req.query;

    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
    });

    if (!faculty) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Faculty access required" });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const attachment = formData.get("attachment");

    
    const result = await prisma.$transaction(async (tx) => {
      
      const thread = await tx.classroomThread.create({
        data: {
          title,
          type,
          classroom_id: classID,
          posts: {
            create: {
              type: "main",
              description,
              user_id: user.id,
              ...(attachment && {
                attachments: {
                  create: {
                    filename: attachment.name,
                    filepath: "placeholder-path", 
                  },
                },
              }),
            },
          },
        },
        include: {
          posts: {
            include: {
              attachments: true,
            },
          },
        },
      });

      
      await tx.classroomThread.update({
        where: { id: thread.id },
        data: { main_post_id: thread.posts[0].id },
      });

      return thread;
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
}
