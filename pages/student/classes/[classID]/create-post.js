import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import StudentLayout from "@/components/layouts/StudentLayout";

// Axios function to create a new post
const createPost = async (classId, payload) => {
  try {
    const { data } = await axios.post(
      `/api/student/classes/${classId}/create-post`,
      payload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to create post");
    }
    throw error;
  }
};

const CreateClassPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  // Create mutation hook
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => createPost(router.query.classID, payload),
    onSuccess: () => {
      router.push(`/student/classes/${router.query.classID}`);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({ title, description });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-6">
          <motion.div
            whileHover={{ x: -3 }}
            whileTap={{ x: -6 }}
            className="inline-block"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center hover:bg-blue-50 text-black-700 hover:text-black-800"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Class
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-black-900">Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-black-800">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your post"
                    className="border-blue-200 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-black-800">
                    Description
                  </Label>
                  <Textarea
                    id="content"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your post content here..."
                    className="border-blue-200 focus:ring-blue-500 min-h-[150px]"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 pt-4 border-t border-blue-50">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="hover:bg-blue-50 border-blue-200 text-black-700 hover:text-black-800"
              >
                Cancel
              </Button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Create Post</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

CreateClassPost.getLayout = (page) => <StudentLayout>{page}</StudentLayout>;

export default CreateClassPost;
