"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-2/3 h-10" />
            <div className="flex items-center gap-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-20 h-1" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-10 h-1" />
            </div>
          </div>

          <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-8 rounded-xl w-full h-[200px]" />

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-40 h-8" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-40 h-10" />
            </div>

            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-6 rounded-lg w-full h-12" />
          </div>
          <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-6 rounded-lg w-full h-12" />

          <div className="space-y-6">
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-xl w-full h-[180px]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
