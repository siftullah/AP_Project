import { getAuth } from "@clerk/nextjs/server ";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
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

      const assignment = await prisma.assignment.findUnique({
        where: { id: assignmentID },
        include: {
          classroom: {
            include: {
              course: true,
              enrollments: {
                include: {
                  student: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          thread: {
            include: {
              main_post: true,
            },
          },
          submissions: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
              attachments: true,
            },
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Format the response
      const formattedResponse = {
        assignment: {
          id: assignment.id,
          title: assignment.thread.title,
          totalMarks: assignment.total_marks,
          dueDate: assignment.due_date,
          classroom: {
            id: assignment.classroom.id,
            name: assignment.classroom.name,
            course: {
              id: assignment.classroom.course.id,
              name: assignment.classroom.course.course_name,
              code: assignment.classroom.course.course_code,
            },
          },
        },
        submissions: assignment.submissions.map((submission) => ({
          id: submission.id,
          student: {
            id: submission.student.id,
            name: `${submission.student.user.first_name} ${submission.student.user.last_name}`,
            rollNumber: submission.student.roll_number,
            email: submission.student.user.email_address,
          },
          submittedOn: submission.submitted_on,
          marks: submission.marks,
          attachments: submission.attachments.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            filepath: attachment.filepath,
          })),
        })),
        totalEnrolled: assignment.classroom.enrollments.length,
      };

      return res.status(200).json(formattedResponse);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      return res.status(500).json({ error: "Failed to fetch submissions" });
    }
  } else if (req.method === "PUT") {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
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

      const body = req.body;
      const { submissionId, marks } = body;

      if (!submissionId || marks === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const submission = await prisma.submission.update({
        where: { id: submissionId },
        data: { marks: parseFloat(marks) },
        include: {
          student: {
            include: {
              user: true,
            },
          },
          attachments: true,
        },
      });

      return res.status(200).json({
        id: submission.id,
        student: {
          id: submission.student.id,
          name: `${submission.student.user.first_name} ${submission.student.user.last_name}`,
          email: submission.student.user.email_address,
        },
        submittedOn: submission.submitted_on,
        marks: submission.marks,
        attachments: submission.attachments,
      });
    } catch (error) {
      console.error("Error updating submission:", error);
      return res.status(500).json({ error: "Failed to update submission" });
    }
  }
}
