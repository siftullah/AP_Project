import React from "react";
import StudentLayout from "@/components/layouts/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 3 classes scheduled today</p>
            {/* Class list would go here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Your upcoming assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 2 pending assignments</p>
            {/* Assignment list would go here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grades</CardTitle>
            <CardDescription>Your recent grades</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Current semester GPA: 3.8</p>
            {/* Grade details would go here */}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>
              Recent announcements from your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>No new announcements</p>
            {/* Announcements would go here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 5 upcoming events this week</p>
            {/* Calendar events would go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Set the layout for this page
StudentDashboard.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default StudentDashboard;
