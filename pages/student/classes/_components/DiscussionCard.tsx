"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Discussion } from "@/app/types/classroom";
import { motion } from "framer-motion";
import { MessageSquare, Users, ChevronRight } from "lucide-react";

const DiscussionCard = ({ discussions }: { discussions: Discussion[] }) => {
  const pathname = usePathname();

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

  if (discussions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center"
      >
        <p className="text-black-700">No discussions yet.</p>
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
      {discussions.map((discussion) => {
        return (
          <motion.div key={discussion.id} variants={itemVariants}>
            <Link href={`${pathname}/${discussion.id}`}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 overflow-hidden transition-all">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-1"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-black-600" />
                      <CardTitle className="text-black-900">
                        {discussion.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-black-700 line-clamp-2">
                      {discussion.main_post.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-black-500 text-sm">
                        Started by: {discussion.main_post.author}
                      </div>
                      <div className="flex items-center gap-2 text-black-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{discussion.reply_count}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2 border-t border-blue-50">
                    <Button
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      View Discussion
                    </Button>
                    <ChevronRight className="w-5 h-5 text-black-400" />
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DiscussionCard;
