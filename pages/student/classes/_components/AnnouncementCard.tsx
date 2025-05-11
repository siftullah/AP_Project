"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Announcement } from "@/app/types/classroom";
import { motion } from "framer-motion";

const AnnouncementCard = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pathname = usePathname();

  // Calculate how recent the announcement is
  const getTimeAgo = (dateString: string) => {
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
      return formatDate(dateString);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (announcements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center"
      >
        <p className="text-black-700">No announcements yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {announcements.map((announcement) => {
        const isRecent =
          new Date(announcement.main_post.createdAt).getTime() >
          Date.now() - 24 * 60 * 60 * 1000;

        return (
          <motion.div key={announcement.id} variants={itemVariants}>
            <Link href={`${pathname}/${announcement.id}`}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 overflow-hidden transition-all">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-1"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Bell
                          className={`w-5 h-5 ${
                            isRecent ? "text-black-600" : "text-black-400"
                          }`}
                        />
                        <CardTitle className="text-black-900">
                          {announcement.title}
                        </CardTitle>
                      </div>
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        Announcement
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-black-700 line-clamp-2">
                      {announcement.main_post.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-black-500 text-sm">
                        <Calendar className="mr-2 w-4 h-4" />
                        <span>
                          {getTimeAgo(announcement.main_post.createdAt)}
                        </span>
                        <span className="mx-2">•</span>
                        <span>By: {announcement.main_post.author}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-black-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AnnouncementCard;
