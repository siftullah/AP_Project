import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, FileIcon, Loader2 } from "lucide-react";
import Loader from "./_components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AnnouncementPage = ({ initialAnnouncementData }) => {
  const [reply, setReply] = useState("");
  const [announcementData, setAnnouncementData] = useState(
    initialAnnouncementData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { announcementID } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
        `/api/faculty/announcements/${announcementID}/post-reply`,
        {
          reply,
        }
      );

      setReply("");
      toast.success("Reply posted successfully!");

      // Refresh announcement data
      const { data } = await axios.get(
        `/api/faculty/announcements/${announcementID}`
      );
      setAnnouncementData(data);
    } catch (error) {
      console.error("Failed to post reply:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "An error occurred while posting your reply."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!announcementData) {
    router.push("/404");
    return null;
  }

  return (
    <div className="px-4 sm:px-0 py-6">
      <ToastContainer />
      <Button onClick={() => router.back()} className="flex items-center mb-4">
        <ArrowLeftIcon className="mr-2 w-4 h-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{announcementData.title}</CardTitle>
          <div className="flex items-center text-gray-500 text-sm">
            <span>{announcementData.main_post.created_by}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{announcementData.main_post.description}</p>
          <div className="flex items-center gap-4">
            {announcementData.main_post.attachments &&
              announcementData.main_post.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 bg-gray-50 mb-4 p-2 rounded-md"
                >
                  <FileIcon className="w-4 h-4" />
                  <a
                    href={attachment.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {attachment.filename}
                  </a>
                </div>
              ))}
          </div>
          <div className="space-y-4">
            {announcementData.replies?.map((reply, index) => {
              return (
                <Card key={index}>
                  <CardContent className="flex items-start space-x-4 pt-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={reply.created_by}
                      />
                      <AvatarFallback>
                        {reply.created_by[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{reply.created_by}</h4>
                      </div>
                      <p className="mt-1">{reply.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <Textarea
              placeholder="Write your reply..."
              className="mb-2"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              {isSubmitting ? "Posting..." : "Post Reply"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req, params } = context;
  const { announcementID } = params;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/faculty/announcements/${announcementID}`,
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        initialAnnouncementData: response.data,
      },
    };
  } catch (error) {
    console.error("Failed to fetch announcement:", error);
    return {
      props: {
        initialAnnouncementData: null,
      },
    };
  }
}

export default AnnouncementPage;
