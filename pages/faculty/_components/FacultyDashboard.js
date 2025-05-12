import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Users,
  ChevronRight,
  Calendar,
  MessageSquare,
} from "lucide-react";

export const FacultyDashboard = ({ data }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Welcome {data.user.first_name} {data.user.last_name}
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Here is your academic overview
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-4 rounded-xl">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Classes
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {data.stats.activeClasses}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-4 rounded-xl">
                  <FileText className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Assignments
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {data.stats.totalAssignments}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 p-4 rounded-xl">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {data.stats.totalStudents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assignments Section */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Assignments
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => router.push("/faculty/assignments")}
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {data.recentAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {assignment.classroom_name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Total Marks: {assignment.total_marks}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                        Due:{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Discussions Section */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-rose-600" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Discussions
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  onClick={() => router.push("/faculty/discussions")}
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {data.recentDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {discussion.author} - {discussion.classroom_name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-700">
                        {discussion.replies} replies
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
