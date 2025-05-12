import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { FileText, Calendar, Award, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const AssignmentCard = ({ assignments }) => {
  const router = useRouter();

  if (!assignments.length) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No assignments yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment) => (
        <Card 
          key={assignment.id} 
          className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted by {assignment.author} •{" "}
                    {formatDistanceToNow(new Date(assignment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {assignment.assignment && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {assignment.assignment.totalMarks} marks
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">{assignment.description}</p>
            </div>

            {assignment.assignment && (
              <div className="border-t border-gray-100">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-sm">
                          {new Date(assignment.assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Submissions</p>
                        <p className="text-sm">
                          {assignment.assignment.submissionCount} submitted
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {assignment.attachments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {assignment.attachments.length} attachment{assignment.attachments.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {assignment.assignment && assignment.assignment.pendingGrading > 0 && (
                    <Button
                      onClick={() => router.push(`/faculty/assignments/${assignment.assignment.id}/grade`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Grade
                    </Button>
                  )}
                  <Button
                    onClick={() => router.push(`/faculty/assignments/${assignment.assignment.id}`)}
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssignmentCard;
