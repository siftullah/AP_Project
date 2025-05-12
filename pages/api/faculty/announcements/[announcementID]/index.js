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
      return res.status(404).json({ error: "Unauthenticated User" });
    }

    const announcementId = req.query.announcementID;

    // Get annoucement details
    const thread = await prisma.thread.findFirst({
      where: {
        id: announcementId,
      },
      include: {
        posts: {
          include: {
            created_by: true,
            attachments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!thread) {
      return res
        .status(404)
        .json({ error: "Announcement not found or access denied" });
    }

    const mainPost = thread.posts.find(
      (post) => post.id === thread.main_post_id
    );

    const postReplies = thread.posts.filter((post) => post.type === "reply");

    const formattedResponse = {
      id: thread.id,
      title: thread.title,
      main_post: {
        id: mainPost?.id,
        description: mainPost?.description,
        created_by: `${mainPost?.created_by.first_name} ${mainPost?.created_by.last_name}`,
        attachments: mainPost?.attachments.map((attachment) => ({
          id: attachment.id,
          filename: attachment.filename,
          filepath: attachment.filepath,
        })),
      },
      replies: postReplies.map((post) => ({
        id: post.id,
        description: post.description,
        created_by: `${post.created_by.first_name} ${post.created_by.last_name}`,
        attachments: post?.attachments.map((attachment) => ({
          id: attachment.id,
          filename: attachment.filename,
          filepath: attachment.filepath,
        })),
      })),
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching discussion details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
