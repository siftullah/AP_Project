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

    const { forumID } = req.query;

    const threads = await prisma.thread.findMany({
      where: {
        forum_id: forumID,
      },
      include: {
        main_post: {
          include: {
            created_by: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        posts: {
          where: {
            type: "reply",
          },
        },
      },
    });

    const forum = await prisma.forum.findFirst({
      where: {
        id: forumID,
      },
    });

    const formattedResponse = {
      id: forum?.id,
      forum_name: forum?.forum_name,
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        author: `${thread.main_post?.created_by.first_name} ${thread.main_post?.created_by.last_name}`,
        date: thread.main_post?.createdAt,
        replies: thread.posts.length,
      })),
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
