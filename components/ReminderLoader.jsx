"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const ReminderLoader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg w-10 h-10" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-48 h-10" />
          </div>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-1 bg-white shadow-sm border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-6" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-6 rounded-full w-32 h-32" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-32 h-9" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-white shadow-sm border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-48 h-6" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-4" />
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-4" />
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-16 h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-28 h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-16 h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
                </div>
                <div className="pt-2">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-32 h-10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ReminderLoader;
