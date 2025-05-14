/*
  Warnings:

  - A unique constraint covering the columns `[main_post_id]` on the table `ClassroomThread` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[main_post_id]` on the table `Thread` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClassroomThread_main_post_id_key" ON "ClassroomThread"("main_post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Thread_main_post_id_key" ON "Thread"("main_post_id");

-- AddForeignKey
ALTER TABLE "ClassroomThread" ADD CONSTRAINT "ClassroomThread_main_post_id_fkey" FOREIGN KEY ("main_post_id") REFERENCES "ClassroomPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_main_post_id_fkey" FOREIGN KEY ("main_post_id") REFERENCES "ThreadPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
