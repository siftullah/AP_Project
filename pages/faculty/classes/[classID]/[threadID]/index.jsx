import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  FileIcon,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./_components/Loader";

const ThreadPage = ({ thread, error }) => {
  const [reply, setReply] = useState("");
  const router = useRouter();
  const { classID, threadID } = router.query;

  if (error) {
    return (
      <div className="px-4 sm:px-0 py-6">
        <div className="text-center text-gray-500">
          Failed to load thread. Please try again later.
        </div>
      </div>
    );
  }

  if (!thread) {
    return <Loader />;
  }

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/faculty/classes/${classID}/${threadID}/post-reply`,
        { reply }
      );
      setReply("");
      toast.success("Reply posted successfully");
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post reply");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="px-4 sm:px-0 py-6">
      <Button onClick={() => router.back()} variant="ghost" className="mb-4">
        <ArrowLeftIcon className="mr-2 w-4 h-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{thread.title}</CardTitle>
              <p className="mt-1 text-gray-500 text-sm">
                Posted by {thread.mainPost.author} on{" "}
                {formatDate(thread.mainPost.createdAt)}
              </p>
            </div>
            <Badge
              variant={thread.type === "assignment" ? "destructive" : "default"}
            >
              {thread.type.charAt(0).toUpperCase() + thread.type.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{thread.mainPost.description}</p>

            {thread.mainPost.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {thread.mainPost.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <FileIcon className="w-4 h-4" />
                    <span>{attachment.filename}</span>
                  </a>
                ))}
              </div>
            )}

            {thread.assignment && (
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Due: {formatDate(thread.assignment.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                      <span>
                        {thread.assignment.submissionCount} Submissions
                      </span>
                    </div>
                    {thread.assignment.pendingGrading > 0 && (
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>{thread.assignment.pendingGrading} Pending</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4 mt-8">
              <h3 className="font-semibold">Replies</h3>
              {thread.replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="pt-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>
                          {reply.author[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold">{reply.author}</p>
                          <span className="text-gray-500 text-sm">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="mt-2">{reply.description}</p>
                        {reply.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {reply.attachments.map((attachment) => (
                              <a
                                key={attachment.id}
                                href={attachment.filepath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-md"
                              >
                                <FileIcon className="w-4 h-4" />
                                <span>{attachment.filename}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <form onSubmit={handleSubmitReply}>
                <Textarea
                  placeholder="Write your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="mb-2"
                  required
                />
                <Button type="submit">Post Reply</Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/faculty/classes/${params.classID}/${params.threadID}`,
      {
        headers: {
          Cookie: req.headers.cookie || ''
        }
      }
    );

    return {
      props: {
        thread: data,
        error: null
      }
    };
  } catch (err) {
    return {
      props: {
        thread: null,
        error: err.message || "An error occurred"
      }
    };
  }
};

export default ThreadPage;
