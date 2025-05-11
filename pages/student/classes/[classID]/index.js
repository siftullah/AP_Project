import { useState } from "react";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BookOpen, Users } from "lucide-react";
import AnnouncementCard from "@/pages/student/classes/_components/AnnouncementCard";
import AssignmentCard from "@/pages/student/classes/_components/AssignmentCard";
import DiscussionCard from "@/pages/student/classes/_components/DiscussionCard";
import Loader from "@/pages/student/classes/_components/Loader";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentLayout from "@/components/layouts/StudentLayout";

// Custom fetch function using Axios
const fetchClassDetails = async (classId) => {
  try {
    const { data } = await axios.get(`/api/student/classes/${classId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch class details"
      );
    }
    throw error;
  }
};

const ClassPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  console.log(router.query);

  // Fetch class details using TanStack Query
  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classDetails", router.query.classID],
    queryFn: () => fetchClassDetails(router.query.classID),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 text-center"
      >
        <div className="mb-4 text-black-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-16 h-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-7a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-semibold text-black-900 text-xl">
          {error instanceof Error
            ? error.message
            : "Unable to load class details. Please try again later."}
        </h3>
        <Button
          onClick={() => router.push("/student/classes")}
          className="bg-blue-600 hover:bg-blue-700 mt-4"
        >
          Return to Classes
        </Button>
      </motion.div>
    );
  }

  if (!classData) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
        style={{ position: "relative", zIndex: 1 }}
      >
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-2 font-bold text-black-900 text-3xl"
          >
            {classData.name}
          </motion.h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-black-900">
                Class Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 mt-0.5 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-black-700" />
                  </div>
                  <div>
                    <p className="font-medium text-black-600 text-sm">
                      Course Code
                    </p>
                    <p className="font-semibold text-black-900">
                      {classData.courseInfo.code}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 mt-0.5 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-black-700" />
                  </div>
                  <div>
                    <p className="font-medium text-black-600 text-sm">
                      Instructor
                    </p>
                    <p className="font-semibold text-black-900">
                      {classData.teachers.faculty[0]?.name || "Not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 mt-0.5 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-black-700" />
                  </div>
                  <div>
                    <p className="font-medium text-black-600 text-sm">
                      Teaching Assistant
                    </p>
                    <p className="font-semibold text-black-900">
                      {classData.teachers.ta[0]?.name || "Not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 mt-0.5 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-black-700" />
                  </div>
                  <div>
                    <p className="font-medium text-black-600 text-sm">
                      Enrolled Students
                    </p>
                    <p className="font-semibold text-black-900">
                      {classData.studentCount}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-black-900 text-xl">Class Feed</h3>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ position: "relative", zIndex: 5 }}
            >
              <Button
                onClick={() =>
                  router.push(
                    `/student/classes/${router.query.classID}/create-post`
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 w-4 h-4" /> Create New Post
              </Button>
            </motion.div>
          </div>

          <Tabs
            defaultValue="all"
            className="relative mb-6"
            value={activeTab}
            onValueChange={setActiveTab}
            style={{ position: "relative", zIndex: 1 }}
          >
            <TabsList className="relative bg-blue-50/70 shadow-sm p-1 border border-blue-100 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-blue-100/30 rounded-lg pointer-events-none"
                layoutId="tabBackground"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              {["all", "announcements", "assignments", "discussions"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="group z-10 relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:shadow-sm px-4 py-2 rounded-md text-black-700 data-[state=active]:hover:text-white data-[state=active]:text-white hover:text-blue-600 capitalize transition-all"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "all" ? "All Posts" : tab}
                    <motion.div
                      className="bottom-0 left-1/2 absolute bg-blue-500 opacity-0 group-data-[state=active]:opacity-100 rounded-full w-1 h-1 transition-all -translate-x-1/2 pointer-events-none transform"
                      initial={{ scale: 0 }}
                      animate={{ scale: tab === activeTab ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </TabsTrigger>
                )
              )}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="z-0 relative space-y-6"
              >
                <AnnouncementCard
                  announcements={classData.threads.announcements}
                />
                <AssignmentCard assignments={classData.threads.assignments} />
                <DiscussionCard discussions={classData.threads.discussions} />
              </motion.div>
            </TabsContent>

            <TabsContent value="announcements" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="z-0 relative space-y-6"
              >
                <AnnouncementCard
                  announcements={classData.threads.announcements}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="z-0 relative space-y-6"
              >
                <AssignmentCard assignments={classData.threads.assignments} />
              </motion.div>
            </TabsContent>

            <TabsContent value="discussions" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="z-0 relative space-y-6"
              >
                <DiscussionCard discussions={classData.threads.discussions} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

ClassPage.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default ClassPage;
