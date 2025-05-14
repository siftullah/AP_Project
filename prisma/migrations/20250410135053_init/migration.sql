-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "permission" TEXT NOT NULL DEFAULT 'all',

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultUniAdministrationRoles" (
    "id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "DefaultUniAdministrationRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultUniAdministrationRolesPermissions" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "DefaultUniAdministrationRolesPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniAdministrationRoles" (
    "id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UniAdministrationRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniAdministrationRolesPermissions" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "UniAdministrationRolesPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniAdministration" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "UniAdministration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentBatches" (
    "id" TEXT NOT NULL,
    "dept_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "DepartmentBatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "department_batch_id" TEXT NOT NULL,
    "roll_number" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dept_id" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "dept_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomTeachers" (
    "id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ClassroomTeachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomThread" (
    "id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "main_post_id" TEXT,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "ClassroomThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomPost" (
    "id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ClassroomPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomPostAttachments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,

    CONSTRAINT "ClassroomPostAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,
    "total_marks" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "submitted_on" TIMESTAMP(3) NOT NULL,
    "marks" DOUBLE PRECISION,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionAttachments" (
    "id" TEXT NOT NULL,
    "submission_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,

    CONSTRAINT "SubmissionAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchGroup" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "BatchGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentGroup" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "DepartmentGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomGroup" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CustomGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomGroupMembers" (
    "id" TEXT NOT NULL,
    "custom_group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "CustomGroupMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "forum_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "group_id" TEXT,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "forum_id" TEXT,
    "university_id" TEXT NOT NULL,
    "main_post_id" TEXT,
    "group_id" TEXT,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreadPost" (
    "id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreadPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreadPostAttachments" (
    "id" TEXT NOT NULL,
    "thread_post_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,

    CONSTRAINT "ThreadPostAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultUniAdministrationRolesPermissions_role_id_permission_key" ON "DefaultUniAdministrationRolesPermissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniAdministrationRoles_university_id_role_key" ON "UniAdministrationRoles"("university_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UniAdministrationRolesPermissions_role_id_permission_id_key" ON "UniAdministrationRolesPermissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniAdministration_user_id_role_id_key" ON "UniAdministration"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_university_id_name_key" ON "Department"("university_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_university_id_name_key" ON "Batch"("university_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentBatches_dept_id_batch_id_key" ON "DepartmentBatches"("dept_id", "batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_user_id_key" ON "Student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_department_batch_id_roll_number_key" ON "Student"("department_batch_id", "roll_number");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_user_id_key" ON "Faculty"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_dept_id_course_code_key" ON "Course"("dept_id", "course_code");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_classroom_id_student_id_key" ON "Enrollment"("classroom_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClassroomTeachers_classroom_id_user_id_key" ON "ClassroomTeachers"("classroom_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_assignment_id_student_id_key" ON "Submission"("assignment_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "BatchGroup_group_id_key" ON "BatchGroup"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "BatchGroup_batch_id_key" ON "BatchGroup"("batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentGroup_group_id_key" ON "DepartmentGroup"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentGroup_department_id_key" ON "DepartmentGroup"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomGroup_group_id_key" ON "CustomGroup"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomGroupMembers_custom_group_id_user_id_key" ON "CustomGroupMembers"("custom_group_id", "user_id");

-- AddForeignKey
ALTER TABLE "DefaultUniAdministrationRolesPermissions" ADD CONSTRAINT "DefaultUniAdministrationRolesPermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "DefaultUniAdministrationRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultUniAdministrationRolesPermissions" ADD CONSTRAINT "DefaultUniAdministrationRolesPermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniAdministrationRoles" ADD CONSTRAINT "UniAdministrationRoles_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniAdministrationRolesPermissions" ADD CONSTRAINT "UniAdministrationRolesPermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UniAdministrationRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniAdministrationRolesPermissions" ADD CONSTRAINT "UniAdministrationRolesPermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniAdministration" ADD CONSTRAINT "UniAdministration_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UniAdministrationRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentBatches" ADD CONSTRAINT "DepartmentBatches_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentBatches" ADD CONSTRAINT "DepartmentBatches_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_department_batch_id_fkey" FOREIGN KEY ("department_batch_id") REFERENCES "DepartmentBatches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomTeachers" ADD CONSTRAINT "ClassroomTeachers_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomThread" ADD CONSTRAINT "ClassroomThread_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomPost" ADD CONSTRAINT "ClassroomPost_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "ClassroomThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomPostAttachments" ADD CONSTRAINT "ClassroomPostAttachments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "ClassroomPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "ClassroomThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAttachments" ADD CONSTRAINT "SubmissionAttachments_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchGroup" ADD CONSTRAINT "BatchGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchGroup" ADD CONSTRAINT "BatchGroup_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentGroup" ADD CONSTRAINT "DepartmentGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentGroup" ADD CONSTRAINT "DepartmentGroup_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomGroup" ADD CONSTRAINT "CustomGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomGroupMembers" ADD CONSTRAINT "CustomGroupMembers_custom_group_id_fkey" FOREIGN KEY ("custom_group_id") REFERENCES "CustomGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadPost" ADD CONSTRAINT "ThreadPost_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadPostAttachments" ADD CONSTRAINT "ThreadPostAttachments_thread_post_id_fkey" FOREIGN KEY ("thread_post_id") REFERENCES "ThreadPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
