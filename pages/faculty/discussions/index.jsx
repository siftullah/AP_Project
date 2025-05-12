"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { DiscussionsData, Discussion } from "@/app/types/discussions";

const fetchDiscussions = async (): Promise<DiscussionsData> => {
  const { data } = await axios.get("/api/faculty/discussions");
  return data;
};

const Discussions = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });

  const filterDiscussions = (category: string) => {
    if (!data?.threads) return [];
    if (category === "All") return data.threads;
    return data.threads.filter((d) => d.type === category.toLowerCase());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600">Loading discussions...</span>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 flex items-center justify-between shadow">
        <h2 className="text-2xl font-bold">Discussion Board</h2>
        <Button onClick={() => router.push("/faculty/discussions/create")} className="bg-white text-blue-600 hover:bg-blue-100">
          <Plus className="mr-2 w-4 h-4" /> Create New Discussion
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-lg flex flex-wrap gap-2">
          {[
            "All Discussions",
            "General",
            "Department",
            "Batch",
            "Custom Groups",
          ].map((label) => (
            <TabsTrigger
              key={label}
              value={label.toLowerCase().replace(" discussions", "")}
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 px-4 py-2 rounded-md transition-all"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <DiscussionCard discussions={filterDiscussions("All")} />
        </TabsContent>
        <TabsContent value="general">
          <DiscussionCard discussions={filterDiscussions("General")} />
        </TabsContent>
        <TabsContent value="department">
          <DiscussionCard discussions={filterDiscussions("Department")} />
        </TabsContent>
        <TabsContent value="batch">
          <DiscussionCard discussions={filterDiscussions("Batch")} />
        </TabsContent>
        <TabsContent value="custom">
          <DiscussionCard discussions={filterDiscussions("Custom")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DiscussionCard = ({ discussions }: { discussions: Discussion[] }) => {
  const pathname = usePathname();

  if (!discussions.length) {
    return <div className="text-center text-slate-500 py-10">No discussions found.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {discussions.map((discussion) => (
        <Card
        key={discussion.id}
        className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all bg-white"
      >
        {/* Top Blue Accent Strip */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-black-700"></div>
      
        <CardHeader className="pb-1">
          <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition">
            {discussion.title}
          </CardTitle>
        </CardHeader>
      
        <CardContent className="text-sm text-slate-600 space-y-3">
          <p className="line-clamp-2">{discussion.main_post.description}</p>
          <div className="flex items-center justify-between text-xs">
            <div className="bg-slate-50 px-3 py-1 rounded-full text-slate-500">
              👤 {discussion.main_post.created_by}
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-600 font-medium">
              🗨️ {discussion.reply_count} replies
            </div>
          </div>
        </CardContent>
      
        <CardFooter className="mt-2">
          <Link href={`${pathname}/${discussion.id}`}>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              View Full Discussion
            </Button>
          </Link>
        </CardFooter>
      </Card>
      ))}
    </div>
  );
};


export default Discussions;
