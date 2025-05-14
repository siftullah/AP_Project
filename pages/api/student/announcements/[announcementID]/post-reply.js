import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { announcementID } = req.query;

    const { reply } = req.body;

    

    await prisma.threadPost.create({
      data: {
        type: "reply",
        description: reply,
        created_by: {
          connect: {
            id: userId,
          },
        },
        thread: {
          connect: {
            id: announcementID,
          },
        },
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error posting reply:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
