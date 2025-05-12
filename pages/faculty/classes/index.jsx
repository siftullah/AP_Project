"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Loader2, Users, BookOpen, CheckSquare, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/faculty/classes");
        setClasses(data.classes);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred");
        toast.error(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0 py-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <h1 className="mb-6 font-semibold text-3xl text-slate-900">My Classes</h1>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-lg">
          <div className="text-slate-500 text-center">
            Failed to load classes. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="px-4 sm:px-0 py-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <h1 className="mb-6 font-semibold text-3xl text-slate-900">My Classes</h1>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-lg">
          <div className="text-slate-500 text-center">
            No classes found. Please contact the administrator.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Classes</h1>
          <p className="mt-2 text-lg text-slate-600">Manage your classes and assignments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="p-6 border-b border-slate-200/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{cls.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {cls.course.code} - {cls.course.name}
                    </p>
                  </div>
                  {cls.assignmentStats.pendingGrading > 0 && (
                    <Badge variant="destructive" className="bg-rose-50 text-rose-600 border border-rose-200">
                      {cls.assignmentStats.pendingGrading} Pending
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Students</p>
                      <p className="text-lg font-semibold text-slate-900">{cls.studentCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Assignments</p>
                      <p className="text-lg font-semibold text-slate-900">{cls.assignmentStats.total}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/faculty/assignments?classId=${cls.id}`}>
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-blue-500 to-cyan-500"
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Assignments
                    </Button>
                  </Link>
                  <Link href={`/faculty/students?classId=${cls.id}`}>
                    <Button
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Students
                    </Button>
                  </Link>
                  <Link href={`/faculty/classes/${cls.id}`}>
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;