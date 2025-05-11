import React from "react";
import StudentLayout from "@/components/layouts/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const coursesData = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    credits: 3,
    progress: 65,
  },
  {
    id: 2,
    code: "MATH201",
    title: "Calculus II",
    instructor: "Prof. John Doe",
    credits: 4,
    progress: 78,
  },
  {
    id: 3,
    code: "ENG105",
    title: "Academic Writing",
    instructor: "Dr. Emily Johnson",
    credits: 3,
    progress: 92,
  },
  {
    id: 4,
    code: "PHYS101",
    title: "Physics I",
    instructor: "Prof. Michael Brown",
    credits: 4,
    progress: 45,
  },
];

const StudentCourses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Browse Course Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coursesData.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    {course.code}: {course.title}
                  </CardTitle>
                  <CardDescription>
                    Instructor: {course.instructor}
                  </CardDescription>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {course.credits} Credits
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                  Materials
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                  Assignments
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                  Grades
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Set the layout for this page
StudentCourses.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default StudentCourses;
