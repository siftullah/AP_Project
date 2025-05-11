-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
