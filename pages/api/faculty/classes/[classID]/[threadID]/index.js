import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    
    const faculty = await prisma.faculty.findUnique({
      where: { user_id: userId },
    });

    if (!faculty) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Faculty access required" });
    }

    const thread = await prisma.classroomThread.findFirst({
      where: {
        id: threadID,
        classroom_id: classID,
        classroom: {
          teachers: {
            some: {
              user_id: userId,
            },
          },
        },
      },
      include: {
        posts: {
          include: {
            created_by: true,
            attachments: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        assignments: {
          include: {
            submissions: true,
          },
        },
      },
    });

    if (!thread) {
      return res
        .status(404)
        .json({ error: "Thread not found or access denied" });
    }

    const mainPost = thread.posts.find((p) => p.type === "main");
    const replies = thread.posts.filter((p) => p.type === "reply");

    const formattedResponse = {
      id: thread.id,
      title: thread.title,
      type: thread.type,
      mainPost: {
        id: mainPost?.id,
        description: mainPost?.description,
        createdAt: mainPost?.createdAt,
        author: mainPost?.created_by
          ? `${mainPost.created_by.first_name} ${mainPost.created_by.last_name}`
          : "Unknown",
        attachments:
          mainPost?.attachments.map((a) => ({
            id: a.id,
            filename: a.filename,
            filepath: a.filepath,
          })) || [],
      },
      replies: replies.map((reply) => ({
        id: reply.id,
        description: reply.description,
        createdAt: reply.createdAt,
        author: `${reply.created_by.first_name} ${reply.created_by.last_name}`,
        attachments: reply.attachments.map((a) => ({
          id: a.id,
          filename: a.filename,
          filepath: a.filepath,
        })),
      })),
      assignment:
        thread.type === "assignment"
          ? {
              id: thread.assignments[0]?.id,
              dueDate: thread.assignments[0]?.due_date,
              totalMarks: thread.assignments[0]?.total_marks,
              submissionCount: thread.assignments[0]?.submissions.length || 0,
              pendingGrading:
                thread.assignments[0]?.submissions.filter(
                  (s) => s.marks === null
                ).length || 0,
            }
          : null,
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching thread details:", error);
    return res.status(500).json({ error: "Failed to fetch thread details" });
  }
}
