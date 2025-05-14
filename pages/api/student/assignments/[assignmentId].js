import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthenticated User" });
  }

  const { assignmentId } = req.query;

  
  if (req.method === "GET") {
    try {
      
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
          .json({ error: "Assignment not found or access denied" });
      }

      const mainPost = thread.posts.find(
        (post) => post.id === thread.main_post_id
      );

      const hasSubmission = thread.assignments[0].submissions.length > 0;
      const dueDate = new Date(thread.assignments[0].due_date);
      const now = new Date();
      const isOverdue = !hasSubmission && dueDate < now;

      const formattedResponse = {
        id: thread.id,
        title: thread.title,
        status: hasSubmission ? "submitted" : isOverdue ? "overdue" : "pending",
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

  
  else if (req.method === "POST") {
    try {
      const { attachments } = req.body;

      
      const student = await prisma.student.findUnique({
        where: { user_id: userId },
      });

      if (!student) {
        return res.status(403).json({ error: "Student record not found" });
      }

      
      const thread = await prisma.classroomThread.findFirst({
        where: {
          id: assignmentId,
        },
        include: {
          assignments: true,
        },
      });

      if (!thread || !thread.assignments || thread.assignments.length === 0) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const assignment = thread.assignments[0];

      
      const existingSubmission = await prisma.submission.findUnique({
        where: {
          assignment_id_student_id: {
            assignment_id: assignment.id,
            student_id: student.id,
          },
        },
      });

      
      if (existingSubmission) {
        
        await prisma.submissionAttachments.deleteMany({
          where: {
            submission_id: existingSubmission.id,
          },
        });

        
        await prisma.submission.delete({
          where: {
            id: existingSubmission.id,
          },
        });
      }

      
      const submission = await prisma.submission.create({
        data: {
          assignment_id: assignment.id,
          student_id: student.id,
          submitted_on: new Date(),
          attachments: {
            create: attachments.map((attachment) => ({
              filename: attachment.filename,
              filepath: attachment.filepath,
            })),
          },
        },
        include: {
          attachments: true,
        },
      });

      return res.status(200).json({
        success: true,
        submission: {
          id: submission.id,
          submittedOn: submission.submitted_on,
          attachments: submission.attachments,
        },
      });
    } catch (error) {
      console.error("Error submitting assignment:", error);
      return res.status(500).json({ error: "Failed to submit assignment" });
    }
  }

  
  else if (req.method === "DELETE") {
    try {
      
      const student = await prisma.student.findUnique({
        where: { user_id: userId },
      });

      if (!student) {
        return res.status(403).json({ error: "Student record not found" });
      }

      
      const thread = await prisma.classroomThread.findFirst({
        where: {
          id: assignmentId,
        },
        include: {
          assignments: true,
        },
      });

      if (!thread || !thread.assignments || thread.assignments.length === 0) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const assignmentData = thread.assignments[0];

      
      const submission = await prisma.submission.findUnique({
        where: {
          assignment_id_student_id: {
            assignment_id: assignmentData.id,
            student_id: student.id,
          },
        },
        include: {
          attachments: true,
        },
      });

      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      
      await prisma.submissionAttachments.deleteMany({
        where: {
          submission_id: submission.id,
        },
      });

      
      await prisma.submission.delete({
        where: {
          id: submission.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Submission deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting submission:", error);
      return res.status(500).json({ error: "Failed to delete submission" });
    }
  }

  
  else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
