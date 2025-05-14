/*
  Warnings:

  - You are about to drop the column `title` on the `ClassroomPost` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ThreadPost` table. All the data in the column will be lost.
  - Added the required column `title` to the `ClassroomThread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ClassroomThread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassroomPost" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "ClassroomThread" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ThreadPost" DROP COLUMN "title";
