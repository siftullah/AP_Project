import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./_components/Loader";
import axios from "axios";

const ForumPage = ({ forumData, error }) => {
  const router = useRouter();
  const basePath = "/student/discussions";

  if (!forumData && !error) {
    return <Loader />;
  }

  // Error handling UI
  if (error || !forumData) {
    return (
      <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 text-gray-700">
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
          <h3 className="mb-2 font-semibold text-gray-900 text-xl">
            {error || "Forum not found or error loading forum data."}
          </h3>
          <Button
            onClick={() => router.push("/student")}
            className="bg-blue-600 hover:bg-blue-700 mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
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
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
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
              className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-gray-800"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Forums
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
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-gray-900">
                  {forumData.forum_name || "Forum Threads"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {forumData.threads.length === 0 ? (
                  <div className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center">
                    <p className="text-gray-700">
                      No threads found in this forum.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {forumData.threads.map((thread) => (
                      <motion.div key={thread.id}>
                        <Link href={`${basePath}/${thread.id}`}>
                          <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 overflow-hidden transition-all">
                              <CardContent className="flex justify-between items-center py-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {thread.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm">
                                    Started by {thread.author} -{" "}
                                    {formatDate(thread.date)}
                                  </p>
                                </div>
                                <Badge className="bg-blue-600 hover:bg-blue-700">
                                  {thread.replies}{" "}
                                  {thread.replies === 1 ? "reply" : "replies"}
                                </Badge>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Server-side rendering to fetch forum data
export async function getServerSideProps(context) {
  const { req, params } = context;
  const { forumId } = params;

  try {
    // Get the cookie from the request headers
    const cookies = req.headers.cookie;

    if (!cookies) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    // Fetch forum data using axios from the server
    const response = await axios.get(
      `http://localhost:3000/api/student/forums/${forumId}`,
      {
        headers: {
          // Forward the authentication cookie from the request
          Cookie: cookies,
        },
      }
    );

    return {
      props: {
        forumData: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching forum data:", error);

    // Handle unauthorized errors by redirecting to sign-in
    if (error.response?.status === 401) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    return {
      props: {
        forumData: null,
        error: error.response?.data?.error || "Failed to fetch forum data",
      },
    };
  }
}

export default ForumPage;
