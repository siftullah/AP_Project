;
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  Calendar,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const AssignmentCard = ({ assignments }) => {
  const pathname = usePathname();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSubmissionStatus = (assignmentId) => {
    const marks = assignments.find((a) => a.id === assignmentId)?.assignment
      ?.marks;
    if (!marks) return "pending";
    return "submitted";
  };

  const renderStatusBadge = (status, totalMarks, marks) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-blue-200 text-black-700">
            Total Marks: {totalMarks}
          </Badge>
        );
      case "marked":
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            Marked - {marks} / {totalMarks}
          </Badge>
        );
      default:
        return null;
    }
  };

  if (assignments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center"
      >
        <p className="text-black-700">No assignments yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible">
      {assignments.map((thread) => {
        const status = getSubmissionStatus(thread.id);

        return (
          <motion.div key={thread.id}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white shadow-sm hover:shadow-md border-blue-100 overflow-hidden transition-all">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 h-1"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-black-600" />
                      <CardTitle className="text-black-900">
                        {thread.title}
                      </CardTitle>
                    </div>
                    {renderStatusBadge(
                      status,
                      thread?.assignment?.totalMarks,
                      thread?.assignment?.marks
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-black-700 line-clamp-2">
                    {thread.main_post.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-black-500 text-sm">
                      <span>By: {thread.main_post.author}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2 border-t border-blue-50">
                  <Link href={`${pathname}/assignment/${thread.id}`}>
                    <Button
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      View Assignment
                    </Button>
                  </Link>
                  <ChevronRight className="w-5 h-5 text-black-400" />
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AssignmentCard;
