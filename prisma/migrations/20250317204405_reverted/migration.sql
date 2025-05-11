-- AddForeignKey
ALTER TABLE "ClassroomThread" ADD CONSTRAINT "ClassroomThread_main_post_id_fkey" FOREIGN KEY ("main_post_id") REFERENCES "ClassroomPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_main_post_id_fkey" FOREIGN KEY ("main_post_id") REFERENCES "ThreadPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
