import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftIcon, FileIcon, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const fetchSubmissions = async (assignmentId) => {
  const { data } = await axios.get(
    `/api/faculty/assignments/${assignmentId}/submissions`
  );
  return data;
};

const updateSubmissionMarks = async ({ assignmentId, submissionId, marks }) => {
  const { data } = await axios.put(
    `/api/faculty/assignments/${assignmentId}/submissions`,
    {
      submissionId,
      marks,
    }
  );
  return data;
};

const SubmissionsPage = () => {
  const router = useRouter();
  const { assignmentId } = router.query;
  const [marks, setMarks] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingSubmissionId, setUpdatingSubmissionId] = useState(null);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (!assignmentId) return;

      try {
        setIsLoading(true);
        const response = await fetchSubmissions(assignmentId);
        setData(response);

        const marksState = {};
        response.submissions.forEach((submission) => {
          marksState[submission.id] = submission.marks?.toString() || "";
        });
        setMarks(marksState);

        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmissions();
  }, [assignmentId]);

  const handleMarkSubmission = async (submissionId) => {
    if (!marks[submissionId]) return;

    try {
      setIsUpdating(true);
      setUpdatingSubmissionId(submissionId);

      await updateSubmissionMarks({
        assignmentId,
        submissionId,
        marks: marks[submissionId],
      });

      toast.success("Marks updated successfully");
      const updatedData = await fetchSubmissions(assignmentId);
      setData(updatedData);
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "Failed to update marks"
      );
    } finally {
      setIsUpdating(false);
      setUpdatingSubmissionId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (isError || !data?.assignment) {
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
            Assignment not found or failed to load submissions
          </CardContent>
        </Card>
      </div>
    );
  }

  const { assignment, submissions, totalEnrolled } = data;

  return (
    <div className="px-6 py-8 space-y-6">
      <ToastContainer />
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-white mb-3"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{assignment.title} - Submissions</h1>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-blue-100">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {assignment.classroom.course.code} - {assignment.classroom.name}
          </Badge>
          <span>
            Total Submissions: {submissions.length} / {totalEnrolled}
          </span>
        </div>
      </div>

      <Card className="rounded-2xl shadow">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Attachments</TableHead>
                <TableHead>Marks ({assignment.totalMarks})</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.student.name}</TableCell>
                  <TableCell>{submission.student.rollNumber}</TableCell>
                  <TableCell>
                    {new Date(submission.submittedOn).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      {submission.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.filepath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <FileIcon className="w-4 h-4" />
                          {attachment.filename}
                        </a>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={assignment.totalMarks}
                      value={marks[submission.id]}
                      onChange={(e) =>
                        setMarks({
                          ...marks,
                          [submission.id]: e.target.value,
                        })
                      }
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleMarkSubmission(submission.id)}
                      disabled={
                        (isUpdating &&
                          updatingSubmissionId === submission.id) ||
                        !marks[submission.id] ||
                        marks[submission.id] === submission.marks?.toString()
                      }
                    >
                      {isUpdating && updatingSubmissionId === submission.id && (
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      )}
                      {submission.marks ? "Update" : "Mark"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsPage;
