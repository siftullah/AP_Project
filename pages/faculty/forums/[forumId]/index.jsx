"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const safeFormatDistanceToNow = (dateString: string | undefined | null) => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown date";
  return formatDistanceToNow(date, { addSuffix: true });
};

const ForumPage = ({ params }: { params: { forumId: string } }) => {
  const [forumData, setForumData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const isFacultyRoute = pathname.startsWith("/faculty");
  const basePath = isFacultyRoute
    ? "/faculty/discussions"
    : "/student/discussions";

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const response = await fetch(`/api/faculty/forums/${params.forumId}`);
        const data = await response.json();
        setForumData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forum data:", error);
        setLoading(false);
      }
    };

    fetchForumData();
  }, [params.forumId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/30 to-slate-100/60 py-12 px-2 overflow-x-hidden">
      {/* Decorative blurred background shapes */}
      <div className="pointer-events-none select-none">
        <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-gradient-to-br from-blue-200/20 via-cyan-100/20 to-transparent rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[300px] bg-gradient-to-tr from-cyan-100/20 via-blue-100/20 to-transparent rounded-full blur-[100px] z-0" />
      </div>
      <div className="relative w-full max-w-6xl mx-auto z-10">
        <Button onClick={() => router.back()} className="flex items-center mb-6">
          <ArrowLeftIcon className="mr-2 w-4 h-4" />
          Back
        </Button>
        {/* Forum Main Card */}
        <Card className="mb-12 bg-white/95 rounded-3xl shadow-2xl border-0 px-0 md:px-8 py-8">
          <CardHeader>
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16 border-4 border-blue-200/70 shadow">
                <AvatarImage src={`/avatars/${forumData?.created_by || "default"}.png`} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                  {forumData?.created_by?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold text-slate-900">
                  {forumData?.forum_name || "Forum Threads"}
                </CardTitle>
                <div className="text-sm text-slate-500 mt-1">
                  Created by <span className="font-semibold">{forumData?.created_by || "Unknown"}</span>
                  <span className="mx-2">•</span>
                  {safeFormatDistanceToNow(forumData?.created_at)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mt-4 text-lg">{forumData?.description}</p>
          </CardContent>
        </Card>

        {/* Threads List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Threads</h2>
          {!forumData?.threads?.length && (
            <div className="text-center text-slate-400 py-8">No threads yet.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {forumData?.threads?.map((thread: any) => (
              <Link key={thread.id} href={`${basePath}/${thread.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-200 border-0 bg-white/90 rounded-2xl overflow-hidden flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="w-12 h-12 border-2 border-blue-200/70 shadow">
                      <AvatarImage src={`/avatars/${thread.author || "default"}.png`} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                        {thread.author?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {thread.title}
                      </CardTitle>
                      <div className="text-xs text-slate-500">
                        By {thread.author || "Unknown"} &middot;{" "}
                        {safeFormatDistanceToNow(thread.date)}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                      <MessageSquare className="w-4 h-4 text-cyan-500" />
                      <span>{thread.replies} replies</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 line-clamp-2">{thread.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
