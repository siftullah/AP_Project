import { ArrowLeftIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const Loader = () => {
  return (
    <div className="px-4 sm:px-0 py-6">
      <Button disabled className="flex items-center mb-4">
        <ArrowLeftIcon className="mr-2 w-4 h-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          {/* Title skeleton */}
          <div className="bg-gray-300 rounded-md w-2/3 h-8 animate-pulse" />
          {/* Author skeleton */}
          <div className="bg-gray-300 mt-2 rounded-md w-1/4 h-4 animate-pulse" />
        </CardHeader>
        <CardContent>
          {/* Description skeleton */}
          <div className="space-y-2 mb-6">
            <div className="bg-gray-300 rounded-md w-full h-4 animate-pulse" />
            <div className="bg-gray-300 rounded-md w-full h-4 animate-pulse" />
            <div className="bg-gray-300 rounded-md w-3/4 h-4 animate-pulse" />
          </div>

          {/* Replies skeleton */}
          <div className="space-y-4">
            {[1, 2].map((_, index) => (
              <Card key={index}>
                <CardContent className="flex items-start space-x-4 pt-4">
                  {/* Avatar skeleton */}
                  <div className="bg-gray-300 rounded-full w-10 h-10 animate-pulse" />
                  <div className="flex-1">
                    {/* Reply author skeleton */}
                    <div className="bg-gray-300 mb-2 rounded-md w-1/4 h-4 animate-pulse" />
                    {/* Reply content skeleton */}
                    <div className="space-y-2">
                      <div className="bg-gray-300 rounded-md w-full h-4 animate-pulse" />
                      <div className="bg-gray-300 rounded-md w-3/4 h-4 animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reply form skeleton */}
          <div className="mt-6">
            <div className="bg-gray-200 mb-2 rounded-md w-full h-24 animate-pulse" />
            <div className="bg-gray-200 rounded-md w-24 h-10 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loader;
