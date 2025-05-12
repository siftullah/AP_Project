import { Suspense } from "react";
import RemindersContent from "@/components/RemindersContent";
import ReminderLoader from "@/components/ReminderLoader";

export default function FacultyRemindersPage() {
  return (
    <div className="mx-auto p-6 container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-gray-800 text-2xl">My Reminders</h1>
      </div>
      <Suspense fallback={<ReminderLoader />}>
        <RemindersContent />
      </Suspense>
    </div>
  );
}
