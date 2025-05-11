import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { seedData } from "./data";

const prisma = new PrismaClient();

/**
 * Core entity types with their seed data
 */
const SEED_CONFIG = {
  universityId: "28ebe96b-035c-4702-8014-d39c300b74a8",
  adminId: "user_2rDL55iBrnWJXIbxXV6SGQe2JGW",
  facultyId: "user_2rDiMkoawYFUG8v331LR2xTuGFb",
  studentId: "user_2rDujCi7vz6cmoCus27URk3HRLE",
  batchCount: 100, // Number of students to generate
  facultyCount: 50, // Number of faculty members to generate
};

/**
 * Seeds permissions and returns their IDs
 */
async function seedPermissions() {
  console.log("Seeding permissions...");

  const permissionTypes = seedData.permissions;

  const permissions = await Promise.all(
    permissionTypes.map((permission) =>
      prisma.permission.create({
        data: { permission },
      })
    )
  );

  return permissions.map((p) => p.id);
}

/**
 * Seeds university administration roles and permissions
 */
async function seedAdministration(universityId, adminId) {
  console.log("Seeding administration roles and permissions...");

  // 1. Seed default administration roles
  const defaultRoles = await Promise.all(
    seedData.adminRoles.map((roleName) =>
      prisma.defaultUniAdministrationRoles.create({
        data: { role_name: roleName },
      })
    )
  );
  const defaultRoleIds = defaultRoles.map((r) => r.id);

  // 2. Seed permissions
  const permissionIds = await seedPermissions();

  // 3. Connect default roles with permissions
  await Promise.all(
    defaultRoleIds.map((roleId) =>
      prisma.defaultUniAdministrationRolesPermissions.create({
        data: {
          role_id: roleId,
          permission_id: permissionIds[0], // All permissions
        },
      })
    )
  );

  // 4. Seed university-specific roles
  const uniRoles = await Promise.all(
    seedData.adminRoles.map((role) =>
      prisma.uniAdministrationRoles.create({
        data: {
          role,
          university_id: universityId,
        },
      })
    )
  );
  const uniRoleIds = uniRoles.map((r) => r.id);

  // 5. Connect university roles with permissions
  await Promise.all(
    uniRoleIds.map((roleId) =>
      prisma.uniAdministrationRolesPermissions.create({
        data: {
          role_id: roleId,
          permission_id: permissionIds[0],
        },
      })
    )
  );

  // 6. Assign admin user to role
  await prisma.uniAdministration.create({
    data: {
      user_id: adminId,
      role_id: uniRoleIds[0], // Super Admin role
    },
  });

  return { defaultRoleIds, uniRoleIds, permissionIds };
}

/**
 * Seeds academic structure: batches, departments, and their relationships
 */
async function seedAcademicStructure(universityId) {
  console.log("Seeding academic structure...");

  // 1. Seed batches
  const batches = await Promise.all(
    seedData.batches.map((name) =>
      prisma.batch.create({
        data: {
          name,
          university_id: universityId,
        },
      })
    )
  );

  // 2. Seed departments
  const departments = await Promise.all(
    seedData.departments.map((name) =>
      prisma.department.create({
        data: {
          name,
          university_id: universityId,
        },
      })
    )
  );

  // 3. Create department-batch relationships
  const departmentBatches = await Promise.all(
    departments.flatMap((dept) =>
      batches.map((batch) =>
        prisma.departmentBatches.create({
          data: {
            dept_id: dept.id,
            batch_id: batch.id,
          },
        })
      )
    )
  );

  // 4. Create corresponding groups
  const batchGroups = await seedBatchGroups(batches);
  const departmentGroups = await seedDepartmentGroups(departments);

  return {
    batches: batches.map((b) => ({ id: b.id, name: b.name })),
    departments: departments.map((d) => ({ id: d.id, name: d.name })),
    departmentBatches,
    batchGroups,
    departmentGroups,
  };
}

/**
 * Creates batch groups
 */
async function seedBatchGroups(batches) {
  // Create groups first
  const groups = await Promise.all(
    batches.map((batch) =>
      prisma.group.create({
        data: {
          name: batch.name,
          type: "batch",
        },
      })
    )
  );

  // Then connect groups to batches
  await Promise.all(
    batches.map((batch, index) =>
      prisma.batchGroup.create({
        data: {
          group_id: groups[index].id,
          batch_id: batch.id,
        },
      })
    )
  );

  return groups.map((bg) => bg.id);
}

/**
 * Creates department groups
 */
async function seedDepartmentGroups(departments) {
  // Create groups first
  const groups = await Promise.all(
    departments.map((dept) =>
      prisma.group.create({
        data: {
          name: dept.name,
          type: "department",
        },
      })
    )
  );

  // Then connect groups to departments
  await Promise.all(
    departments.map((dept, index) =>
      prisma.departmentGroup.create({
        data: {
          group_id: groups[index].id,
          department_id: dept.id,
        },
      })
    )
  );

  return groups.map((dg) => dg.id);
}

/**
 * Seeds courses for a department
 */
async function seedCourses(departmentId) {
  console.log("Seeding courses...");

  const courses = await Promise.all(
    seedData.courses.map((course) =>
      prisma.course.create({
        data: {
          dept_id: departmentId,
          course_name: course.name,
          course_code: course.code,
        },
      })
    )
  );

  return courses.map((c) => {
    return { id: c.id, name: c.course_name };
  });
}

/**
 * Seeds classrooms for courses and batches
 */
async function seedClassrooms(courses, batchId) {
  console.log("Seeding classrooms...");

  const classrooms = await Promise.all(
    courses.map((course, index) =>
      prisma.classroom.create({
        data: {
          name: `${course.name} - BCS-${index + 1}A`,
          course_id: course.id,
          batch_id: batchId,
        },
      })
    )
  );

  return classrooms.map((c) => c.id);
}

/**
 * Assigns teachers to classrooms
 */
async function seedClassroomTeachers(classroomIds, facultyId, taId) {
  console.log("Assigning teachers to classrooms...");

  const assignments = [];

  for (const classroomId of classroomIds) {
    // Assign faculty
    assignments.push(
      prisma.classroomTeachers.create({
        data: {
          classroom_id: classroomId,
          type: "faculty",
          user_id: facultyId,
        },
      })
    );

    // Assign TA
    assignments.push(
      prisma.classroomTeachers.create({
        data: {
          classroom_id: classroomId,
          type: "TA",
          user_id: taId,
        },
      })
    );
  }

  await Promise.all(assignments);
}

/**
 * Assign students for classrooms
 */
async function seedEnrollments(classroomIds, studentIds) {
  console.log("Assigning students to classrooms...");

  const assignments = [];

  for (const classroomId of classroomIds) {
    for (const student of studentIds) {
      assignments.push(
        prisma.enrollment.create({
          data: {
            classroom_id: classroomId,
            student_id: student,
          },
        })
      );
    }
  }

  await Promise.all(assignments);
}

/**
 * Seeds classroom threads and posts using data from seedData
 */
async function seedClassroomThreads(classroomIds) {
  console.log("Seeding classroom threads and posts...");

  let index = 0;
  // For each classroom
  for (const classroomId of classroomIds) {
    if (index < seedData.classroomThreads.length) {
      // Use data from seedData.classrooms to find relevant classroom data
      for (const threadData of seedData.classroomThreads[index]) {
        if (threadData) {
          // Create the thread without main_post_id first
          const thread = await prisma.classroomThread.create({
            data: {
              classroom_id: classroomId,
              title: threadData.title,
              type: threadData.type,
            },
          });

          // Create main post for the thread
          const mainPostId = await prisma.classroomPost.create({
            data: {
              thread_id: thread.id,
              user_id: threadData.user_id,
              type: "main",
              description: threadData.main_post,
            },
          });

          // Update the thread with the main post ID
          await prisma.classroomThread.update({
            where: { id: thread.id },
            data: { main_post_id: mainPostId.id },
          });

          // Add replies to the thread
          if (threadData.replies && threadData.replies.length > 0) {
            const replyPromises = threadData.replies.map((reply) =>
              prisma.classroomPost.create({
                data: {
                  thread_id: thread.id,
                  user_id: reply.user_id,
                  type: "reply",
                  description: reply.text,
                },
              })
            );

            await Promise.all(replyPromises);
          }
        }
      }
      index++;
    }
  }
}

/**
 * Seeds classroom assignments from seedData
 */
async function seedClassroomAssignments(classroomIds, studentIds) {
  console.log("Seeding classroom assignments...");

  let index = 0;
  // For each classroom
  for (const classroomId of classroomIds) {
    if (index < seedData.classroomAssignments.length) {
      // Use data from seedData.classrooms to find relevant classroom data
      for (const assignmentData of seedData.classroomAssignments[index]) {
        if (assignmentData) {
          // Create the thread without main_post_id first
          const thread = await prisma.classroomThread.create({
            data: {
              classroom_id: classroomId,
              title: assignmentData.title,
              type: "assignment",
            },
          });

          // Create main post for the thread
          const mainPostId = await prisma.classroomPost.create({
            data: {
              thread_id: thread.id,
              user_id: assignmentData.user_id,
              type: "main",
              description: assignmentData.main_post,
            },
          });

          // Update the thread with the main post ID
          await prisma.classroomThread.update({
            where: { id: thread.id },
            data: { main_post_id: mainPostId.id },
          });

          const now = new Date();
          const dueDate = new Date(assignmentData.due_date);
          // Create assignment entry
          const assignmentEntry = await prisma.assignment.create({
            data: {
              classroom_id: classroomId,
              thread_id: thread.id,
              total_marks: assignmentData.total_marks,
              due_date: dueDate,
            },
          });

          // Create submissions only for past assignments
          if (dueDate < now) {
            await seedSubmissions(
              assignmentEntry.id,
              studentIds,
              assignmentData.total_marks
            );
          }
        }
      }
      index++;
    }
  }
}
/**
 * Seeds submissions for an assignment
 */
async function seedSubmissions(assignmentId, studentIds, totalMarks) {
  const submissionPromises = [];
  const submissionDate = new Date();
  submissionDate.setDate(submissionDate.getDate() - 2); // Submitted 2 days ago

  for (let i = 0; i < studentIds.length; i++) {
    const studentId = studentIds[i];

    // Determine if submission should be marked
    // Mark approximately 70% of submissions
    const isMarked = Math.random() < 0.7;

    // Calculate a random mark between 60-100% of total marks
    const marks = isMarked
      ? Math.round((0.6 + 0.4 * Math.random()) * totalMarks * 10) / 10
      : null;

    const submission = prisma.submission
      .create({
        data: {
          assignment_id: assignmentId,
          student_id: studentId,
          submitted_on: submissionDate,
          marks: marks,
        },
      })
      .then((submission) => {
        // Create a submission attachment for each submission
        return prisma.submissionAttachments
          .create({
            data: {
              submission_id: submission.id,
              filename: `assignment_submission_${i + 1}.pdf`,
              filepath: `file.com/submissions/${
                submission.id
              }/assignment_submission_${i + 1}.pdf`,
            },
          })
          .then(() => submission);
      });

    submissionPromises.push(submission);
  }

  return Promise.all(submissionPromises);
}

/**
 * Seeds students for a department batch
 */
async function seedStudents(deptBatchId, count = 100) {
  console.log(`Seeding ${count} students...`);

  const usedRollNumbers = new Set();
  const studentPromises = [];

  const specificStudentId = SEED_CONFIG.studentId;

  // Generate a unique roll number for the specific student
  const specificStudentRollNumber = "21L-5263";
  usedRollNumbers.add(specificStudentRollNumber);

  // Create the specific student
  studentPromises.push(
    prisma.student.create({
      data: {
        user_id: specificStudentId,
        department_batch_id: deptBatchId,
        roll_number: specificStudentRollNumber,
      },
    })
  );

  for (let i = 0; i < count; i++) {
    // Create user
    const id = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "example.fakerjs.dev",
    });

    // Generate unique roll number
    let rollNumber;
    do {
      const rollId = faker.number.int({ min: 1000, max: 9999 });
      rollNumber = `21L-${rollId}`;
    } while (usedRollNumbers.has(rollNumber));
    usedRollNumbers.add(rollNumber);

    // Create user first and then create student with user reference
    studentPromises.push(
      prisma.user
        .create({
          data: {
            id,
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            role: "student",
          },
        })
        .then(() => {
          return prisma.student.create({
            data: {
              user_id: id,
              department_batch_id: deptBatchId,
              roll_number: rollNumber,
            },
          });
        })
    );
  }

  const students = await Promise.all(studentPromises);

  return students.map((s) => s.id);
}

/**
 * Seeds faculty members for a department
 */
async function seedFaculty(departmentId, count = 50) {
  console.log(`Seeding ${count} faculty members...`);

  const facultyPromises = [];

  // Seed the specific facultyId from SEED_CONFIG
  const specificFacultyId = SEED_CONFIG.facultyId;

  // Pick a random designation for the specific faculty
  const specificFacultyDesignation =
    seedData.facultyDesignations[
      faker.number.int({
        min: 0,
        max: seedData.facultyDesignations.length - 1,
      })
    ];

  // Create the specific faculty
  facultyPromises.push(
    prisma.faculty.create({
      data: {
        user_id: specificFacultyId,
        dept_id: departmentId,
        designation: specificFacultyDesignation,
      },
    })
  );

  for (let i = 0; i < count; i++) {
    // Create user
    const id = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "example.fakerjs.dev",
    });

    // Pick a random designation
    const designation =
      seedData.facultyDesignations[
        faker.number.int({
          min: 0,
          max: seedData.facultyDesignations.length - 1,
        })
      ];

    // Create user first
    facultyPromises.push(
      prisma.user
        .create({
          data: {
            id,
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            role: "faculty",
          },
        })
        .then(() => {
          // Then create faculty with user reference
          return prisma.faculty.create({
            data: {
              user_id: id,
              dept_id: departmentId,
              designation,
            },
          });
        })
    );
  }

  await Promise.all(facultyPromises);
}

/**
 * Creates a thread post and returns its ID
 */
async function createThreadPost(threadId, userId, content, type) {
  const post = await prisma.threadPost.create({
    data: {
      thread_id: threadId,
      user_id: userId,
      type,
      description: content,
    },
  });

  return post.id;
}

/**
 * Adds reply posts to a thread
 */
async function addThreadReplies(threadId, replies) {
  const replyPromises = [];

  for (const reply of replies) {
    replyPromises.push(
      prisma.threadPost.create({
        data: {
          thread_id: threadId,
          user_id: reply.user_id,
          type: "reply",
          description: reply.text,
        },
      })
    );
  }

  await Promise.all(replyPromises);
}

/**
 * Seeds forums for different contexts (general, department, batch)
 */
async function seedForums(
  universityId,
  adminId,
  departmentGroupId,
  batchGroupId
) {
  console.log("Seeding forums and threads...");

  const forumThreads = [];

  // Process each forum in the seed data
  for (const forumData of seedData.forums) {
    let groupId = null;

    // Assign appropriate group ID based on forum group type
    if (forumData.group === "department") {
      groupId = departmentGroupId;
    } else if (forumData.group === "batch") {
      groupId = batchGroupId;
    }

    // Create the forum
    const forum = await prisma.forum.create({
      data: {
        university_id: universityId,
        user_id: adminId,
        forum_name: forumData.title,
        group_id: groupId,
      },
    });

    // Create threads for this forum
    for (const threadData of forumData.threads) {
      // First create the thread without main_post_id
      const thread = await prisma.thread.create({
        data: {
          forum_id: forum.id,
          university_id: universityId,
          group_id: groupId,
          type: forumData.type,
          title: threadData.title,
        },
      });

      // Create main post for the thread
      const mainPostId = await createThreadPost(
        thread.id,
        threadData.user_id,
        threadData.main_post,
        "main"
      );

      // Update the thread with the main post ID
      await prisma.thread.update({
        where: { id: thread.id },
        data: { main_post_id: mainPostId },
      });

      // Add replies to the thread
      if (threadData.replies && threadData.replies.length > 0) {
        await addThreadReplies(thread.id, threadData.replies);
      }

      forumThreads.push(thread.id);
    }
  }

  console.log(`Created ${forumThreads.length} forum threads`);
  return forumThreads;
}

/**
 * Seeds standalone threads (not part of any forum)
 */
async function seedStandaloneThreads(
  universityId,
  departmentGroupId,
  batchGroupId
) {
  console.log("Seeding standalone threads...");

  const threadIds = [];

  for (const threadData of seedData.standaloneThreads) {
    let groupId = null;

    // Assign appropriate group ID based on thread group type
    if (threadData.group === "department") {
      groupId = departmentGroupId;
    } else if (threadData.group === "batch") {
      groupId = batchGroupId;
    }

    // Create the thread without main_post_id first
    const thread = await prisma.thread.create({
      data: {
        forum_id: null, // These are standalone threads
        university_id: universityId,
        group_id: groupId,
        type: threadData.type,
        title: threadData.title,
      },
    });

    // Create main post for the thread
    const mainPostId = await createThreadPost(
      thread.id,
      threadData.user_id,
      threadData.main_post,
      threadData.type
    );

    // Update the thread with the main post ID
    await prisma.thread.update({
      where: { id: thread.id },
      data: { main_post_id: mainPostId },
    });

    // Add replies to the thread
    if (threadData.replies && threadData.replies.length > 0) {
      await addThreadReplies(thread.id, threadData.replies);
    }

    threadIds.push(thread.id);
  }

  console.log(`Created ${threadIds.length} standalone threads`);
  return threadIds;
}

/**
 * Creates a custom group with members and threads
 */
async function seedCustomGroups(universityId) {
  console.log("Seeding custom groups...");

  const createdGroups = [];

  for (const groupData of seedData.customGroup) {
    // Create group
    const group = await prisma.group.create({
      data: {
        name: groupData.name,
        type: "custom",
      },
    });

    // Create custom group
    const customGroup = await prisma.customGroup.create({
      data: {
        group_id: group.id,
        user_id: groupData.user_id,
      },
    });

    // Add members
    const memberPromises = [];

    groupData.members.map((member) => {
      memberPromises.push(
        prisma.customGroupMembers.create({
          data: {
            custom_group_id: customGroup.id,
            user_id: member,
          },
        })
      );
    });

    await Promise.all(memberPromises);
    console.log(
      `Added ${memberPromises.length + 1} members to group: ${groupData.title}`
    );

    // 4. Create threads for this custom group
    const groupThreads = [];

    // Create the thread without main_post_id first
    const thread = await prisma.thread.create({
      data: {
        forum_id: null, // Custom group threads are not part of a forum
        university_id: universityId,
        group_id: group.id,
        type: "discussion",
        title: groupData.title,
      },
    });

    // Create main post for the thread
    const mainPostId = await createThreadPost(
      thread.id,
      groupData.user_id,
      groupData.main_post,
      "main"
    );

    // Update the thread with the main post ID
    await prisma.thread.update({
      where: { id: thread.id },
      data: { main_post_id: mainPostId },
    });

    // Add replies to the thread from group members
    if (groupData.replies && groupData.replies.length > 0) {
      await addThreadReplies(thread.id, groupData.replies);
    }

    groupThreads.push(thread.id);

    createdGroups.push({
      group: group,
      customGroup: customGroup,
      threads: groupThreads,
    });
  }

  console.log(`Created ${createdGroups.length} custom groups with threads`);
  return createdGroups;
}

/**
 * Main seeding function
 */
async function main() {
  console.log("Starting database seeding...");

  try {
    const {
      universityId,
      adminId,
      facultyId,
      studentId,
      batchCount,
      facultyCount,
    } = SEED_CONFIG;

    // Seed administration structure
    await seedAdministration(universityId, adminId);

    // Seed academic structure
    const {
      batches,
      departments,
      departmentBatches,
      batchGroups,
      departmentGroups,
    } = await seedAcademicStructure(universityId);

    // Seed students and faculty
    const studentIds = await seedStudents(departmentBatches[0].id, batchCount);
    await seedFaculty(departments[0].id, facultyCount);

    // Seed courses and classrooms
    const courses = await seedCourses(departments[0].id);
    const classroomIds = await seedClassrooms(courses, batches[0].id);
    await seedClassroomTeachers(classroomIds, facultyId, studentId);
    await seedEnrollments(classroomIds, studentIds);
    await seedClassroomThreads(classroomIds);
    await seedClassroomAssignments(classroomIds, studentIds);

    // Seed forums with threads and posts
    await seedForums(
      universityId,
      adminId,
      departmentGroups[0],
      batchGroups[0]
    );

    // Seed standalone threads with posts
    await seedStandaloneThreads(
      universityId,
      departmentGroups[0],
      batchGroups[0]
    );

    // Seed custom groups
    await seedCustomGroups(universityId);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

// Execute the seeding process
main()
  .catch((e) => {
    console.error("Fatal error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma client connection
    await prisma.$disconnect();
  });
