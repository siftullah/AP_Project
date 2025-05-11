import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-6">
          <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-40 h-10" />
        </div>

        <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-5 h-5" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-48 h-7" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-16 h-5" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
              </div>

              <div className="space-y-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-5" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-[150px]" />
              </div>

              <div className="space-y-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-5" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
              </div>

              <div className="space-y-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-16 h-5" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
              </div>

              <div className="space-y-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-5" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-10" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-24 h-10" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-40 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Loader;
