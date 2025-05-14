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

    const { classID, threadID } = req.query;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "Unauthenticated User" });
    }

    const threadId = threadID;

    const { reply } = req.body;

    

    await prisma.classroomPost.create({
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
            id: threadId,
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
