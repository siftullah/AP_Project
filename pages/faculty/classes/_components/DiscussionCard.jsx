import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router"; // Changed to next/router
import axios from "axios";

const DiscussionCard = ({ discussions }) => { // Removed TypeScript types
  const router = useRouter();

  if (!discussions.length) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No discussions yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {discussions.map((discussion) => (
        <Card 
          key={discussion.id} 
          className="overflow-hidden border-l-4 border-l-purple-500 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {discussion.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted by {discussion.author} •{" "}
                    {formatDistanceToNow(new Date(discussion.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">{discussion.description}</p>
            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {discussion.attachments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {discussion.attachments.length} attachment{discussion.attachments.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => router.push(`/faculty/discussions/${discussion.id}`)}
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DiscussionCard;
