-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_university_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "university_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;
