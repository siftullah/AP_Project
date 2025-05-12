import React, { useState, useEffect } from "react";
import axios from "axios";
import ReminderLoader from "@/components/ReminderLoader";

const FacultyRemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get("/api/faculty/reminders");
        setReminders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reminders:", error);
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className="mx-auto p-6 container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-gray-800 text-2xl">My Reminders</h1>
      </div>
      {isLoading ? (
        <ReminderLoader />
      ) : (
        <div>
          {reminders.map((reminder) => (
            <div key={reminder.id}>
              {/* Render reminder content here */}
              {reminder.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyRemindersPage;
