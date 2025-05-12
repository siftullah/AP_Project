import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" });
    }

    const assignmentId = req.query.assignmentId;

    // Get annoucement details
    const thread = await prisma.classroomThread.findFirst({
      where: {
        id: assignmentId,
      },
      include: {
        posts: {
          include: {
            created_by: true,
            attachments: true,
          },
        },
        assignments: {
          include: {
            submissions: {
              where: {
                student: {
                  user_id: userId,
                },
              },
              include: {
                attachments: true,
              },
            },
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
        .json({ error: "Annoucement not found or access denied" });
    }

    const mainPost = thread.posts.find(
      (post) => post.id === thread.main_post_id
    );

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
      assignment: {
        id: thread.assignments[0].id,
        dueDate: thread.assignments[0].due_date,
        totalMarks: thread.assignments[0].total_marks,
        marks: thread.assignments[0].submissions[0]?.marks,
        submittedOn: thread.assignments[0].submissions[0]?.submitted_on,
        attachments: thread.assignments[0].submissions[0]?.attachments.map(
          (attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            filepath: attachment.filepath,
          })
        ),
      },
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching assignment details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
