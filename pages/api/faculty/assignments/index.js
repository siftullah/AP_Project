import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthenticated User" });
      }

      
      const faculty = await prisma.faculty.findUnique({
        where: { user_id: userId },
        include: {
          user: {
            include: {
              classroom_teachers: {
                include: {
                  classroom: {
                    include: {
                      course: true, 
                      threads: {
                        where: {
                          type: "assignment",
                        },
                        include: {
                          assignments: {
                            include: {
                              submissions: true,
                            },
                          },
                          main_post: true, 
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }

      
      const classes = faculty.user.classroom_teachers.map((ct) => ({
        id: ct.classroom.id,
        name: ct.classroom.name,
        course: {
          id: ct.classroom.course.id,
          name: ct.classroom.course.course_name,
          code: ct.classroom.course.course_code,
        },
      }));

      
      const assignments = faculty.user.classroom_teachers.flatMap((ct) =>
        ct.classroom.threads
          .filter(
            (thread) => thread.assignments && thread.assignments.length > 0
          )
          .map((thread) => ({
            id: thread.assignments[0].id,
            thread_id: thread.id,
            title: thread.title,
            description: thread.main_post?.description || "",
            dueDate: thread.assignments[0].due_date,
            totalMarks: thread.assignments[0].total_marks,
            submissionCount: thread.assignments[0].submissions.length,
            classroom: {
              id: ct.classroom.id,
              name: ct.classroom.name,
              course: {
                id: ct.classroom.course.id,
                name: ct.classroom.course.course_name,
                code: ct.classroom.course.course_code,
              },
            },
          }))
      );

      return res.status(200).json({
        classes,
        assignments,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch assignments data" });
    }
  } else if (req.method === "POST") {
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
      const {
        title,
        description,
        dueDate,
        totalMarks,
        classroomId,
        attachments,
      } = body;

      
      if (!title || !description || !dueDate || !totalMarks || !classroomId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      
      const result = await prisma.$transaction(
        async (tx) => {
          
          const thread = await tx.classroomThread.create({
            data: {
              title,
              type: "assignment",
              classroom_id: classroomId,
            },
          });

          
          const mainPost = await tx.classroomPost.create({
            data: {
              thread_id: thread.id,
              description,
              type: "main",
              user_id: userId,
              attachments: {
                create: attachments || [],
              },
            },
          });

          
          await tx.classroomThread.update({
            where: { id: thread.id },
            data: { main_post_id: mainPost.id },
          });

          
          const assignment = await tx.assignment.create({
            data: {
              thread_id: thread.id,
              classroom_id: classroomId,
              due_date: new Date(dueDate),
              total_marks: parseFloat(totalMarks),
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
          });

          return assignment;
        },
        {
          timeout: 20000, 
          maxWait: 20000, 
        }
      );

      
      const formattedResponse = {
        id: result.id,
        thread_id: result.thread_id,
        title: result.thread.title,
        description: result.thread.main_post?.description || "",
        dueDate: result.due_date,
        totalMarks: result.total_marks,
        classroom: {
          id: result.classroom.id,
          name: result.classroom.name,
          course: {
            id: result.classroom.course.id,
            name: result.classroom.course.course_name,
            code: result.classroom.course.course_code,
          },
        },
        attachments:
          result.thread.main_post?.attachments.map((attachment) => ({
            id: attachment.id,
            filename: attachment.filename,
            filepath: attachment.filepath,
          })) || [],
      };

      return res.status(200).json(formattedResponse);
    } catch (error) {
      console.error("Error creating assignment:", error);
      return res.status(500).json({ error: "Failed to create assignment" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
