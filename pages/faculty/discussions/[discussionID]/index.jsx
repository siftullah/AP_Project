"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, FileIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

interface Discussion {
  id: string;
  title: string;
  main_post: Post;
  replies?: Post[];
}

interface Post {
  id: string;
  description: string;
  created_by: string;
  attachments?: {
    id: string;
    filename: string;
    filepath: string;
  }[];
}

const fetchDiscussion = async (id: string): Promise<Discussion> => {
  const { data } = await axios.get(`/api/faculty/discussions/${id}`);
  return data;
};

const postReply = async ({
  discussionId,
  reply,
}: {
  discussionId: string;
  reply: string;
}) => {
  const { data } = await axios.post(
    `/api/faculty/discussions/${discussionId}/post-reply`,
    {
      reply,
    }
  );
  return data;
};

const DiscussionPage = ({ params }: { params: { discussionID: string } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: discussion, isLoading } = useQuery({
    queryKey: ["discussion", params.discussionID],
    queryFn: () => fetchDiscussion(params.discussionID),
  });

  const mutation = useMutation({
    mutationFn: () => postReply({ discussionId: params.discussionID, reply }),
    onSuccess: () => {
      setReply("");
      toast.success("Reply posted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["discussion", params.discussionID],
      });
    },
    onError: () => {
      toast.error("Failed to post reply. Please try again.");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  const filteredReplies = discussion?.replies?.filter((reply) =>
    reply.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-blue-500">
        Loading discussion...
      </div>
    );
  }

  if (!discussion) return null;

  return (
    <div className="px-4 md:px-10 py-8 space-y-6">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="text-blue-600 mb-4"
      >
        <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back
      </Button>

      <Card className="rounded-xl border border-blue-100 shadow-md">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-xl px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold">{discussion.title}</h1>
          <p className="text-sm text-blue-100">Created by {discussion.main_post.created_by}</p>
        </div>

        <CardContent className="space-y-4 pt-6 pb-4 px-6">
          <p className="text-slate-700 text-sm leading-relaxed">
            {discussion.main_post.description}
          </p>

          {discussion.main_post.attachments?.map((attachment) => (
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

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search replies..."
                className="w-full max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <h2 className="text-base font-semibold">Replies</h2>
            <div className="space-y-4">
              {filteredReplies?.map((reply) => (
                <div
                  key={reply.id}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                >
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt={reply.created_by} />
                    <AvatarFallback>{reply.created_by[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-700">
                      {reply.created_by}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {reply.description}
                    </div>
                  </div>
                </div>
              ))}
              {filteredReplies?.length === 0 && (
                <p className="text-slate-500 text-sm italic">No matching replies found.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Textarea
              placeholder="Write your reply..."
              className="resize-none"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            />
            <div>
              <Button
                type="submit"
                disabled={mutation.isPending || !reply.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {mutation.isPending ? "Posting..." : "Post Reply"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscussionPage;
