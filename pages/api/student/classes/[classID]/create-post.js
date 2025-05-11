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

    const { title, description } = req.body;
    const { classID } = req.query;

    // Create the thread and its main post in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the thread first
      const thread = await tx.classroomThread.create({
        data: {
          title,
          type: "discussion",
          classroom_id: classID,
          posts: {
            create: {
              type: "main",
              description,
              user_id: userId,
            },
          },
        },
        include: {
          posts: true,
        },
      });

      // Update the thread with the main post
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
