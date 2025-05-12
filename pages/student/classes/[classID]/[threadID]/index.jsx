import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  FileIcon,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Loader from "./_components/Loader";
import axios from "axios";

const ThreadPage = ({ threadData, error }) => {
  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { classID, threadID } = router.query;

  // Function to post a reply
  const submitReply = async (replyText) => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);

    try {
      await axios.post(
        `/api/student/classes/${classID}/${threadID}/post-reply`,
        {
          reply: replyText,
        }
      );

      setReply("");
      // Refresh the page to get updated data
      router.replace(router.asPath);
    } catch (error) {
      console.error("Failed to post reply:", error);
      alert(error.response?.data?.error || "Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!threadData && !error) {
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
        <h3 className="mb-2 font-semibold text-black-900 text-xl">{error}</h3>
        <Button
          onClick={() => router.push(`/student/classes/${classID}`)}
          className="bg-blue-600 hover:bg-blue-700 mt-4"
        >
          Return to Class
        </Button>
      </motion.div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return diffInHours === 0
        ? "Just now"
        : `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitReply(reply);
  };

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
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-4">
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2">
                <CardTitle className="text-black-900">
                  {threadData.title}
                </CardTitle>
                <Badge className="self-start bg-blue-600 hover:bg-blue-700">
                  Discussion Thread
                </Badge>
              </div>
              <div className="flex items-center mt-2 text-black-600 text-sm">
                <Avatar className="mr-2 w-6 h-6">
                  <AvatarImage src={""} alt={threadData.main_post.created_by} />
                  <AvatarFallback className="bg-blue-700 text-white text-xs">
                    {threadData.main_post.created_by.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{threadData.main_post.created_by}</span>
                {threadData.main_post.createdAt && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{formatDate(threadData.main_post.createdAt)}</span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-black-800 whitespace-pre-line">
                {threadData.main_post.description}
              </p>

              {threadData.main_post.attachments &&
                threadData.main_post.attachments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-2 font-medium text-black-700 text-sm">
                      Attachments:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {threadData.main_post.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.filepath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 p-2 border border-blue-100 rounded-md text-black-700 transition-colors"
                        >
                          <FileIcon className="w-4 h-4 text-black-600" />
                          <span className="text-sm">{attachment.filename}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" className="mb-6">
          <h3 className="flex items-center gap-2 mb-4 font-semibold text-black-900 text-lg">
            <MessageSquare className="w-5 h-5 text-black-700" />
            Replies ({threadData.replies?.length || 0})
          </h3>

          <AnimatePresence>
            {!threadData.replies || threadData.replies.length === 0 ? (
              <motion.div className="bg-blue-50 mb-6 p-6 border border-blue-100 rounded-lg text-center">
                <p className="text-black-700">
                  No replies yet. Be the first to respond!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {threadData.replies.map((reply, index) => (
                  <motion.div key={reply.id || index}>
                    <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 overflow-hidden transition-all">
                      <CardContent className="flex items-start gap-4 pt-4">
                        <Avatar>
                          <AvatarImage src={""} alt={reply.created_by} />
                          <AvatarFallback className="bg-blue-700 text-white">
                            {reply.created_by.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-black-900">
                              {reply.created_by}
                            </h4>
                            {reply.createdAt && (
                              <span className="text-black-500 text-sm">
                                {formatDate(reply.createdAt)}
                              </span>
                            )}
                          </div>
                          <p className="text-black-800 whitespace-pre-line">
                            {reply.description}
                          </p>

                          {reply.attachments &&
                            reply.attachments.length > 0 && (
                              <div className="mt-4">
                                <h5 className="mb-2 font-medium text-black-700 text-sm">
                                  Attachments:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {reply.attachments.map((attachment) => (
                                    <a
                                      key={attachment.id}
                                      href={attachment.filepath}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 p-2 border border-blue-100 rounded-md text-black-700 transition-colors"
                                    >
                                      <FileIcon className="w-4 h-4 text-black-600" />
                                      <span className="text-sm">
                                        {attachment.filename}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-black-900 text-lg">
                Post a Reply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Write your reply..."
                  className="border-blue-200 focus:ring-blue-500 min-h-[120px]"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                />

                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-blue-50 border-blue-200 text-black-700"
                  >
                    <Paperclip className="mr-2 w-4 h-4" />
                    Attach Files
                  </Button>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                          <span>Posting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          <span>Post Reply</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Use getServerSideProps to fetch data on the server side
export async function getServerSideProps(context) {
  const { classID, threadID } = context.params;
  const { req } = context;

  try {
    // Fetch thread details using axios from the server
    const response = await axios.get(
      `http://localhost:3000/api/student/classes/${classID}/${threadID}`,
      {
        headers: {
          
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        threadData: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching thread details:", error);

    return {
      props: {
        threadData: null,
        error: error.response?.data?.error || "Failed to fetch thread details",
      },
    };
  }
}

export default ThreadPage;
