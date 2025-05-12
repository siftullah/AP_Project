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
        className="mx-auto max-w-4xl"
      >
        <div className="mb-6">
          <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-10" />
        </div>

        <Card className="bg-white shadow-sm mb-6 border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
          <CardHeader className="pb-4">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-2/3 h-8" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-6" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-6 h-6" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-40 h-4" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mx-2 rounded-full w-4 h-4" />
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-6 w-3/4 h-4" />

            <div className="mb-6">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-32 h-5" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-32 h-10" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-40 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-5 h-5" />
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-40 h-6" />
          </div>

          {/* Reply skeletons */}
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-white shadow-sm mb-4 border-blue-100 overflow-hidden"
            >
              <CardContent className="flex items-start gap-4 pt-4">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-10 h-10" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-5" />
                    <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-24 h-4" />
                  </div>
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 mb-2 w-full h-4" />
                  <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-3/4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 w-32 h-6" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-full h-[120px]" />

              <div className="flex justify-between items-center">
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-32 h-10" />
                <Skeleton className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-md w-32 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Loader;
