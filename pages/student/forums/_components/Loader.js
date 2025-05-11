import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const Loader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-8 h-8" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-48 h-10" />
          </div>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="bg-white shadow-sm border-blue-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-1"></div>
              <CardContent className="p-6">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-4 w-3/4 h-6" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-4 w-full h-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-5" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-16 h-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
