import { useState } from "react";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileIcon,
  Upload,
  AlertTriangle,
  CheckCircle,
  FileUp,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "./_components/Loader";
import axios from "axios";

const AssignmentPage = ({ assignmentData, error }) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { classID, assignmentId } = router.query;

  // Function to submit assignment
  const submitAssignment = async () => {
    setIsSubmitting(true);

    try {
      setUploadProgress(10);

      // Upload files to public folder
      const uploadedFiles = await Promise.all(
        uploadFiles.map(async (file, index) => {
          const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", fileName);

          // Use axios for upload
          const response = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 80) / progressEvent.total
              );
              // Update progress for each file
              const progressIncrement = 80 / uploadFiles.length;
              setUploadProgress((prev) =>
                Math.min(
                  10 + (percentCompleted * (index + 1)) / uploadFiles.length,
                  90
                )
              );
            },
          });

          return {
            filename: file.name,
            filepath: `/uploads/${fileName}`,
          };
        })
      );

      setUploadProgress(90);

      // Submit assignment with file references
      await axios.post(`/api/student/assignments/${assignmentId}`, {
        attachments: uploadedFiles,
      });

      setUploadProgress(100);

      // Refresh the page to get updated data
      router.replace(router.asPath);

      setUploadFiles([]);
      setUploadProgress(0);
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to delete submission
  const deleteSubmission = async () => {
    setIsDeleting(true);

    try {
      // Use the combined API endpoint
      await axios.delete(`/api/student/assignments/${assignmentId}`);

      // Refresh the page to get updated data
      router.replace(router.asPath);
    } catch (error) {
      console.error("Failed to delete submission:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDueStatus = () => {
    if (!assignmentData?.assignment?.dueDate) return "no-due-date";

    // If already submitted, don't show as overdue
    if (assignmentData.status === "submitted") {
      return "submitted";
    }

    const now = new Date();
    const due = new Date(assignmentData.assignment.dueDate);

    if (due < now) {
      return "overdue";
    }

    // Due in less than 24 hours
    const hoursLeft = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursLeft < 24) {
      return "due-soon";
    }

    return "upcoming";
  };

  const getTimeRemaining = () => {
    if (!assignmentData?.assignment?.dueDate) return null;

    const now = new Date();
    const due = new Date(assignmentData.assignment.dueDate);

    if (due < now) {
      return "Overdue";
    }

    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ${diffHours} hour${
        diffHours !== 1 ? "s" : ""
      } remaining`;
    }

    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} remaining`;
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadFiles.length === 0) {
      return;
    }

    submitAssignment();
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    deleteSubmission();
  };

  if (!assignmentData && !error) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="mx-auto max-w-4xl text-center">
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
          <h3 className="mb-2 font-semibold text-black-900 text-xl">{error}</h3>
          <Button
            onClick={() => router.push(`/student/classes/${classID}`)}
            className="bg-blue-600 hover:bg-blue-700 mt-4"
          >
            Return to Class
          </Button>
        </div>
      </div>
    );
  }

  const dueStatus = getDueStatus();
  const timeRemaining = getTimeRemaining();

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-6">
          <motion.div
            whileHover={{ x: -3 }}
            whileTap={{ x: -6 }}
            className="inline-block"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center hover:bg-blue-50 text-black-700 hover:text-black-800"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Class
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm mb-6 border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 h-2"></div>
            <CardHeader className="pb-4">
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2">
                <CardTitle className="text-black-900">
                  {assignmentData.title}
                </CardTitle>
                <Badge className="self-start bg-blue-700 hover:bg-blue-800">
                  Assignment
                </Badge>
              </div>
              <div className="flex items-center mt-2 text-black-600 text-sm">
                <Avatar className="mr-2 w-6 h-6">
                  <AvatarImage
                    src=""
                    alt={assignmentData.main_post.created_by}
                  />
                  <AvatarFallback className="bg-blue-700 text-white text-xs">
                    {assignmentData.main_post.created_by
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>Created by: {assignmentData.main_post.created_by}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-black-900 text-lg">
                    Description
                  </h3>
                  <p className="text-black-800 whitespace-pre-line">
                    {assignmentData.main_post.description}
                  </p>
                </div>

                {assignmentData.main_post.attachments &&
                  assignmentData.main_post.attachments.length > 0 && (
                    <div>
                      <h3 className="mb-3 font-semibold text-black-900 text-lg">
                        Attachments
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {assignmentData.main_post.attachments.map(
                          (attachment) => (
                            <a
                              key={attachment.id}
                              href={attachment.filepath}
                              download={attachment.filename}
                              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 p-2 border border-blue-100 rounded-md text-black-700 transition-colors"
                            >
                              <FileIcon className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-700 hover:underline">
                                {attachment.filename}
                              </span>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="flex sm:flex-row flex-col sm:items-center gap-4 bg-blue-50 p-4 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-black-700" />
                    <div>
                      <p className="font-medium text-black-600 text-sm">
                        Due Date
                      </p>
                      <p className="font-semibold text-black-900">
                        {formatDate(assignmentData.assignment.dueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-black-700" />
                    <div>
                      <p className="font-medium text-black-600 text-sm">
                        Total Marks
                      </p>
                      <p className="font-semibold text-black-900">
                        {assignmentData.assignment.totalMarks}
                      </p>
                    </div>
                  </div>

                  {timeRemaining && (
                    <div className="ml-auto">
                      {assignmentData.status === "submitted" ? (
                        <Badge
                          variant="default"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-3 h-3" /> Submitted
                        </Badge>
                      ) : assignmentData.status === "overdue" ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </Badge>
                      ) : dueStatus === "due-soon" ? (
                        <Badge
                          variant="default"
                          className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600"
                        >
                          <Clock className="w-3 h-3" /> {timeRemaining}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 border-blue-200 text-black-700"
                        >
                          <Clock className="w-3 h-3" /> {timeRemaining}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-black-900 text-lg">
                    Submission Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {assignmentData.status === "submitted" ? (
                        <Badge
                          variant="default"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-3 h-3" /> Submitted
                        </Badge>
                      ) : assignmentData.status === "overdue" ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-black-700"
                        >
                          Not Submitted
                        </Badge>
                      )}

                      {assignmentData.status === "overdue" && (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1 ml-2"
                        >
                          <AlertTriangle className="w-3 h-3" /> Deadline Passed
                        </Badge>
                      )}
                    </div>

                    <AnimatePresence>
                      {assignmentData.assignment.attachments &&
                        assignmentData.assignment.attachments.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 bg-blue-50 p-4 border border-blue-100 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-black-900">
                                Your Submission
                              </h4>
                              <p className="text-black-600 text-sm">
                                Submitted on:{" "}
                                {formatDate(
                                  assignmentData.assignment?.submittedOn
                                )}
                              </p>
                            </div>

                            {assignmentData.assignment.attachments?.length >
                              0 && (
                              <div>
                                <h4 className="mb-2 font-medium text-black-900">
                                  Submitted Files
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {assignmentData.assignment.attachments.map(
                                    (attachment) => (
                                      <a
                                        key={attachment.id}
                                        href={attachment.filepath}
                                        download={attachment.filename}
                                        className="flex items-center gap-2 bg-white hover:bg-blue-50 p-2 border border-blue-100 rounded-md text-black-700 transition-colors"
                                      >
                                        <FileIcon className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-blue-700 hover:underline">
                                          {attachment.filename}
                                        </span>
                                      </a>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="pt-2">
                              <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isDeleting || isSubmitting}
                                className="flex items-center gap-2"
                              >
                                {isDeleting ? (
                                  <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                                Delete Submission
                              </Button>
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>

                    {assignmentData.assignment.marks !== undefined && (
                      <div className="bg-blue-50 p-4 border border-blue-100 rounded-lg">
                        <h4 className="mb-2 font-medium text-black-900">
                          Grading
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Progress
                              value={
                                (assignmentData.assignment.marks /
                                  assignmentData.assignment.totalMarks) *
                                100
                              }
                              className="bg-blue-100 h-2.5"
                            />
                          </div>
                          <p className="font-semibold text-black-900">
                            {assignmentData.assignment.marks} /{" "}
                            {assignmentData.assignment.totalMarks}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {assignmentData.status === "pending" &&
                  dueStatus !== "overdue" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-black-900 text-lg">
                            Submit Assignment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor="file-upload"
                                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 border border-blue-200 rounded-md text-black-700 transition-colors cursor-pointer"
                                >
                                  <FileUp className="w-4 h-4" />
                                  <span>Select Files</span>
                                </label>
                                <input
                                  id="file-upload"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  multiple
                                />
                              </div>

                              {uploadFiles.length > 0 && (
                                <div className="space-y-2 mt-4">
                                  <p className="font-medium text-black-700 text-sm">
                                    Files to submit:
                                  </p>
                                  <div className="space-y-2">
                                    {uploadFiles.map((file, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-between items-center bg-blue-50 p-2 border border-blue-100 rounded-md"
                                      >
                                        <div className="flex items-center gap-2 text-black-800">
                                          <FileUp className="w-4 h-4 text-black-600" />
                                          <span className="max-w-[200px] text-sm truncate">
                                            {file.name}
                                          </span>
                                          <span className="text-black-500 text-xs">
                                            ({(file.size / 1024).toFixed(1)} KB)
                                          </span>
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeFile(index)}
                                          className="hover:bg-blue-100 w-6 h-6 text-black-700 hover:text-black-900"
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {isSubmitting && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-black-700 text-sm">
                                  <span>Uploading...</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <Progress
                                  value={uploadProgress}
                                  className="bg-blue-100 h-2"
                                />
                              </div>
                            )}
                          </form>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 pt-4 border-t border-blue-50">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              onClick={handleSubmit}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={
                                isSubmitting || uploadFiles.length === 0
                              }
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                                  <span>Submitting...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Upload className="w-4 h-4" />
                                  <span>Submit Assignment</span>
                                </div>
                              )}
                            </Button>
                          </motion.div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Use getServerSideProps to fetch data on the server side
export async function getServerSideProps(context) {
  const { classID, assignmentId } = context.params;
  const { req } = context;

  try {
    // Fetch assignment details using axios from the server
    const response = await axios.get(
      `http://localhost:3000/api/student/assignments/${assignmentId}`,
      {
        headers: {
          
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        assignmentData: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching assignment details:", error);

    return {
      props: {
        assignmentData: null,
        error:
          error.response?.data?.error || "Failed to fetch assignment details",
      },
    };
  }
}

export default AssignmentPage;
