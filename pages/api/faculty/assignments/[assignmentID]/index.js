import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthenticated User" });
      }

      const assignmentID = req.query.assignmentID;

      // Check if the user is a faculty member
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
              main_post: {
                include: {
                  created_by: true,
                  attachments: true,
                },
              },
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
        id: assignment.id,
        thread_id: assignment.thread_id,
        title: assignment.thread.title,
        description: assignment.thread.main_post?.description || "",
        created_by: assignment.thread.main_post
          ? `${assignment.thread.main_post.created_by.first_name} ${assignment.thread.main_post.created_by.last_name}`
          : "",
        attachments:
          assignment.thread.main_post?.attachments.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            filepath: attachment.filepath,
          })) || [],
        dueDate: assignment.due_date,
        totalMarks: assignment.total_marks,
        classroom: {
          id: assignment.classroom.id,
          name: assignment.classroom.name,
          course: {
            id: assignment.classroom.course.id,
            name: assignment.classroom.course.course_name,
            code: assignment.classroom.course.course_code,
          },
        },
        submissions: {
          total: assignment.submissions.length,
          enrolled: assignment.classroom.enrollments.length,
          items: assignment.submissions.map((submission) => ({
            id: submission.id,
            student: {
              id: submission.student.id,
              name: `${submission.student.user.first_name} ${submission.student.user.last_name}`,
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
        },
      };

      return res.status(200).json(formattedResponse);
    } catch (error) {
      console.error("Error fetching assignment details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthenticated User" });
      }

      const assignmentID = req.query.assignmentID;

      const faculty = await prisma.faculty.findUnique({
        where: { user_id: userId },
      });

      if (!faculty) {
        return res
          .status(403)
          .json({ error: "Unauthorized: Faculty access required" });
      }

      const body = req.body;
      const { title, description, dueDate, totalMarks, classroomId } = body;

      if (!title || !description || !dueDate || !totalMarks || !classroomId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // First, check if the assignment exists
      const existingAssignment = await prisma.assignment.findUnique({
        where: { id: assignmentID },
        include: {
          thread: {
            include: {
              main_post: true,
            },
          },
        },
      });

      if (!existingAssignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      // Perform updates in parallel using Promise.all
      const [updatedThread, updatedMainPost, updatedAssignment] =
        await Promise.all([
          // Update thread
          prisma.classroomThread.update({
            where: { id: existingAssignment.thread_id },
            data: { title },
          }),

          // Update main post if it exists
          existingAssignment.thread.main_post_id
            ? prisma.classroomPost.update({
                where: { id: existingAssignment.thread.main_post_id },
                data: { description },
              })
            : Promise.resolve(null),

          // Update assignment
          prisma.assignment.update({
            where: { id: assignmentID },
            data: {
              due_date: new Date(dueDate),
              total_marks: parseFloat(totalMarks),
              classroom_id: classroomId,
            },
            include: {
              classroom: {
                include: {
                  course: true,
                },
              },
              thread: {
                include: {
                  main_post: {
                    include: {
                      attachments: true,
                    },
                  },
                },
              },
            },
          }),
        ]);

      // Format the response
      const formattedResponse = {
        id: updatedAssignment.id,
        thread_id: updatedAssignment.thread_id,
        title: updatedThread.title,
        description: updatedMainPost?.description || "",
        dueDate: updatedAssignment.due_date,
        totalMarks: updatedAssignment.total_marks,
        classroom: {
          id: updatedAssignment.classroom.id,
          name: updatedAssignment.classroom.name,
          course: {
            id: updatedAssignment.classroom.course.id,
            name: updatedAssignment.classroom.course.course_name,
            code: updatedAssignment.classroom.course.course_code,
          },
        },
        attachments:
          updatedAssignment.thread.main_post?.attachments.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            filepath: attachment.filepath,
          })) || [],
      };

      return res.status(200).json(formattedResponse);
    } catch (error) {
      console.error("Error updating assignment:", error);
      return res.status(500).json({ error: "Failed to update assignment" });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: "Method not allowed" });
}
