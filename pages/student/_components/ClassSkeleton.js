"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const ClassSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: index * 0.05,
              duration: 0.4,
            },
          }}
          className="bg-white shadow-sm border border-blue-100 rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-200 to-blue-100 h-3"></div>
          <div className="p-5">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-3 w-3/4 h-6" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-6 w-1/2 h-4" />

            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-10 h-10" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-1/3 h-4" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};
