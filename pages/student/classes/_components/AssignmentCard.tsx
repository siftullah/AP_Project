"use client";
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
import type { Assignment } from "@/app/types/classroom";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  Calendar,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const AssignmentCard = ({ assignments }: { assignments: Assignment[] }) => {
  const pathname = usePathname();

  const formatDate = (dateString?: string) => {
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

  const getSubmissionStatus = (assignmentId: string) => {
    const marks = assignments.find((a) => a.id === assignmentId)?.assignment
      ?.marks;
    if (!marks) return "pending";
    return "submitted";
  };

  const getDueStatus = (dueDate?: string) => {
    if (!dueDate) return "no-due-date";

    const now = new Date();
    const due = new Date(dueDate);

    if (due < now) {
      return "overdue";
    }

    // Due in less than 24 hours
    const hoursLeft = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursLeft < 24) {
      return "due-soon";
    }

    return "upcoming";
  };

  const renderStatusBadge = (
    status: string | null,
    totalMarks?: number,
    marks?: number
  ) => {
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

  const renderDueStatusBadge = (dueStatus: string, dueDate?: string) => {
    switch (dueStatus) {
      case "overdue":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Overdue
          </Badge>
        );
      case "due-soon":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600"
          >
            <Clock className="w-3 h-3" /> Due Soon
          </Badge>
        );
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-blue-200 text-black-700"
          >
            <Calendar className="w-3 h-3" /> Due: {formatDate(dueDate)}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-blue-200 text-black-700">
            No Due Date
          </Badge>
        );
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
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {assignments.map((thread) => {
        const status = getSubmissionStatus(thread.id);
        const dueStatus = getDueStatus(thread?.assignment?.dueDate);

        return (
          <motion.div key={thread.id} variants={itemVariants}>
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
                    <div className="flex items-center gap-2">
                      {renderDueStatusBadge(
                        dueStatus,
                        thread?.assignment?.dueDate
                      )}
                    </div>
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
