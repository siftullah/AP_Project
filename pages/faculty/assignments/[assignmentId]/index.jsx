import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, FileIcon, Edit, Eye } from "lucide-react";
import axios from "axios";

const FacultyAssignmentPage = ({ assignment, error }) => {
  const router = useRouter();

  if (error || !assignment) {
    return (
      <div className="px-6 py-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back
        </Button>
        <Card className="rounded-xl shadow border border-red-200">
          <CardContent className="py-8 text-center text-red-600">
            {error || "Failed to load assignment."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl p-6 shadow">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-white mb-3"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold">{assignment.title}</h1>
        <div className="flex items-center mt-2 gap-2 text-sm">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {assignment.classroom.course.code}
          </Badge>
          <span className="opacity-90">
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Description */}
        <Card className="bg-white rounded-2xl shadow md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            {assignment.description}
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="bg-white rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-slate-700">
            <div>
              <strong>Total Marks:</strong> {assignment.totalMarks}
            </div>
            <div>
              <strong>Submissions:</strong> {assignment.submissions.total} /{" "}
              {assignment.submissions.enrolled}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attachments */}
      <Card className="bg-white rounded-2xl shadow">
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assignment.attachments.length > 0 ? (
            assignment.attachments.map((file) => (
              <a
                key={file.id}
                href={file.filepath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-md bg-slate-50 hover:bg-slate-100 transition"
              >
                <FileIcon className="w-4 h-4 text-blue-500" />
                <span className="truncate text-sm text-blue-700 hover:underline">
                  {file.filename}
                </span>
              </a>
            ))
          ) : (
            <p className="text-sm text-slate-500">No attachments</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-700 hover:bg-blue-50"
          onClick={() =>
            router.push(`/faculty/assignments/${assignment.id}/submissions`)
          }
        >
          <Eye className="w-4 h-4 mr-2" /> View Submissions
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() =>
            router.push(`/faculty/assignments/${assignment.id}/edit`)
          }
        >
          <Edit className="w-4 h-4 mr-2" /> Edit Assignment
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req, params } = context;
  const { assignmentId } = params;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/faculty/assignments/${assignmentId}`,
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        assignment: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return {
      props: {
        assignment: null,
        error: error.message || "Failed to load assignment",
      },
    };
  }
}

export default FacultyAssignmentPage;
