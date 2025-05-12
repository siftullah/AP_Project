"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, MessageSquare, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/faculty/announcements");
        setAnnouncements(response.data.threads);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const filterAnnouncements = (category) => {
    if (category === "All") return announcements;
    return announcements.filter((d) => d.type === category);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Announcement Board
          </h2>
          <p className="text-slate-500 mt-1">Stay updated with the latest news and updates</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-100/80 backdrop-blur-sm p-1 rounded-xl border border-slate-200/50">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2.5 rounded-lg transition-all"
          >
            <Bell className="w-4 h-4 mr-2" />
            All Announcements
          </TabsTrigger>
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2.5 rounded-lg transition-all"
          >
            <Bell className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="department"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2.5 rounded-lg transition-all"
          >
            <Bell className="w-4 h-4 mr-2" />
            Department
          </TabsTrigger>
          <TabsTrigger
            value="batch"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-6 py-2.5 rounded-lg transition-all"
          >
            <Bell className="w-4 h-4 mr-2" />
            Batch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AnnouncementCard announcements={filterAnnouncements("All")} />
        </TabsContent>
        <TabsContent value="general">
          <AnnouncementCard announcements={filterAnnouncements("General")} />
        </TabsContent>
        <TabsContent value="department">
          <AnnouncementCard announcements={filterAnnouncements("Department")} />
        </TabsContent>
        <TabsContent value="batch">
          <AnnouncementCard announcements={filterAnnouncements("Batch")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AnnouncementCard = ({ announcements }) => {
  const pathname = usePathname();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return formatDistanceToNow(date, {
        addSuffix: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="grid gap-6">
      {announcements.map((announcement, index) => (
        <motion.div
          key={announcement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`${pathname}/${announcement.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {announcement.title}
                  </CardTitle>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200">
                    {announcement.type}
                  </span>
                </div>
                <p className="text-slate-600 line-clamp-2">
                  {announcement.main_post.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-blue-500" />
                    <span>{announcement.main_post.created_by}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                    <span>{announcement.reply_count} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>
                      {formatDate(announcement.main_post.created_at)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Announcements;
