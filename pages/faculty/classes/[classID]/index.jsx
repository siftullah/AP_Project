;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Users,
  BookOpen,
  GraduationCap,
  Mail,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import AnnouncementCard from "@/app/faculty/classes/_components/AnnouncementCard";
import AssignmentCard from "@/app/faculty/classes/_components/AssignmentCard";
import DiscussionCard from "@/app/faculty/classes/_components/DiscussionCard";

const ClassPage = ({ classID }) => {
  const router = useRouter();
  const [classDetails, setClassDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/faculty/classes/${classID}`);
        setClassDetails(data);
        setError(null);
      } catch (err) {
        setError(err);
        toast.error(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetails();
  }, [classID]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0 py-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-gray-500 text-center">
              Failed to load class details. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="px-4 sm:px-0 py-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-gray-500 text-center">Class not found</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <h2 className="mb-8 font-bold text-3xl text-gray-900">{classDetails.name}</h2>

      {/* Class Information */}
      <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-2xl text-gray-800">Class Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-3 font-semibold text-lg text-gray-800">Course Details</h3>
                <p className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{classDetails.course.code}</span> - {classDetails.course.name}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-3 font-semibold text-lg text-gray-800">Class Statistics</h3>
                <div className="gap-6 grid grid-cols-2">
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{classDetails.stats.studentCount}</p>
                      <p className="text-sm text-gray-500">Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{classDetails.stats.assignmentCount}</p>
                      <p className="text-sm text-gray-500">Assignments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-3 font-semibold text-lg text-gray-800">Teaching Staff</h3>
                <div className="space-y-3">
                  {classDetails.teachers.faculty.map((faculty) => (
                    <div key={faculty.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{faculty.name}</span>
                      <a
                        href={`mailto:${faculty.email}`}
                        className="ml-auto text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                  {classDetails.teachers.ta.map((ta) => (
                    <div key={ta.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{ta.name} <span className="text-sm text-gray-500">(TA)</span></span>
                      <a
                        href={`mailto:${ta.email}`}
                        className="ml-auto text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Class Feed Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-2xl text-gray-900">Class Feed</h3>
          <Button
            onClick={() => router.push(`/faculty/classes/${classID}/create-post`)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <Plus className="mr-2 w-4 h-4" /> Create New Post
          </Button>
        </div>
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all"
            >
              All Posts
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="discussions"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all"
            >
              Discussions
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all"
            >
              Assignments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              <AnnouncementCard announcements={classDetails.threads.announcements} />
              <DiscussionCard discussions={classDetails.threads.discussions} />
              <AssignmentCard assignments={classDetails.threads.assignments} />
            </div>
          </TabsContent>
          <TabsContent value="announcements">
            <div className="space-y-4">
              <AnnouncementCard
                announcements={classDetails.threads.announcements}
              />
            </div>
          </TabsContent>
          <TabsContent value="discussions">
            <div className="space-y-4">
              <DiscussionCard discussions={classDetails.threads.discussions} />
            </div>
          </TabsContent>
          <TabsContent value="assignments">
            <div className="space-y-4">
              <AssignmentCard assignments={classDetails.threads.assignments} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassPage;

export async function getServerSideProps({ params }) {
  return {
    props: {
      classID: params.classID
    }
  };
}
