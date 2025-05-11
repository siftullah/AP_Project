;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";

const ForumCard = ({ forums }) => {
  const pathname = usePathname();
  const isFacultyRoute = pathname.startsWith("/faculty");
  const basePath = isFacultyRoute ? "/faculty/forums" : "/student/forums";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  if (!forums || forums.length === 0) {
    return (
      <div className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center">
        <p className="text-gray-700">No forums available at the moment.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {forums.map((forum) => (
        <motion.div key={forum.id} variants={itemVariants}>
          <Link href={`${basePath}/${forum.id}`}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 h-full overflow-hidden transition-all">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-1"></div>
                <CardContent className="p-6">
                  <h3 className="flex items-center gap-2 mb-2 font-semibold text-gray-900 text-xl">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    {forum.title}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-gray-700"
                    >
                      {forum.thread_count}{" "}
                      {forum.thread_count === 1 ? "thread" : "threads"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Forum
                    </Button>
                    <div className="text-right">
                      <p className="flex justify-end items-center gap-1 text-gray-600 text-xs">
                        <Clock className="w-3 h-3" />
                        Last activity
                      </p>
                      <p className="font-medium text-gray-700 text-xs">
                        {formatDate(forum.last_activity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForumCard;
