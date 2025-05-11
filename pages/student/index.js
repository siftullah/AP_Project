"use client";

import React from "react";
import { ClassCard } from "./_components/ClassCard";
import { ClassSkeleton } from "./_components/ClassSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookOpen } from "lucide-react";
import StudentLayout from "@/components/layouts/StudentLayout";

const fetchClassrooms = async () => {
  const { data } = await axios.get("/api/student/classes");
  return data;
};

const Home = () => {
  const {
    data: classroomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classrooms"],
    queryFn: fetchClassrooms,
  });

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/50 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        <motion.header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-black-700" />
            </div>
            <h1 className="font-bold text-black-900 text-3xl md:text-4xl">
              My Classes
            </h1>
          </div>
        </motion.header>

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 mb-8 p-6 border border-red-200 rounded-lg text-center"
          >
            <h3 className="mb-1 font-medium text-red-700 text-lg">
              Unable to load classes
            </h3>
            <p className="text-red-600">
              Please try again later or contact support.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              <ClassSkeleton count={6} />
            </motion.div>
          ) : classroomData && classroomData.length > 0 ? (
            <motion.div
              key="classes"
              className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {classroomData.map((classroom, index) => (
                <ClassCard
                  key={classroom.id}
                  classroom={classroom}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-sm px-6 py-16 border border-blue-100 rounded-xl text-center"
            >
              <div className="inline-block bg-blue-50 mb-6 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-black-600"
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
              <h3 className="mb-3 font-semibold text-black-900 text-2xl">
                No classes found
              </h3>
              <p className="mx-auto mb-6 max-w-md text-black-700">
                You haven&apos;t been enrolled in any classes yet. Classes will
                appear here once you&apos;re enrolled.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

Home.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default Home;
