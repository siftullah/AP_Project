/*
  Warnings:

  - You are about to drop the column `created_by` on the `ClassroomPost` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `ThreadPost` table. All the data in the column will be lost.
  - Added the required column `batch_id` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ClassroomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Forum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ThreadPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "batch_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassroomPost" DROP COLUMN "created_by",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "created_by",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ThreadPost" DROP COLUMN "created_by",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UniAdministration" ADD CONSTRAINT "UniAdministration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomTeachers" ADD CONSTRAINT "ClassroomTeachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomPost" ADD CONSTRAINT "ClassroomPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomGroupMembers" ADD CONSTRAINT "CustomGroupMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadPost" ADD CONSTRAINT "ThreadPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
