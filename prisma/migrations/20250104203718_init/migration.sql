/*
  Warnings:

  - You are about to drop the column `created_by` on the `ClassroomThread` table. All the data in the column will be lost.
  - Added the required column `designation` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassroomThread" DROP COLUMN "created_by";

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "designation" TEXT NOT NULL;
