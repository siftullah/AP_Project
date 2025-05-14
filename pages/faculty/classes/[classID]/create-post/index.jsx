import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";

const createClassPost = async (formData, classId) => {
  const { data } = await axios.post(
    `/api/faculty/classes/${classId}/create-post`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const CreateClassPost = ({ classDetails, error }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (error) {
    return (
      <div className="px-4 sm:px-0 py-6">
        <div className="text-center text-gray-500">
          Failed to load class details. Please try again later.
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      if (file) {
        formData.append("attachment", file);
      }

      await createClassPost(formData, classDetails.id);
      toast.success("Post created successfully");
      router.push(`/faculty/classes/${classDetails.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-0 py-6">
      <Button onClick={() => router.back()} variant="ghost" className="mb-4">
        <ArrowLeftIcon className="mr-2 w-4 h-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Class Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Post Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter post description"
                required
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="attachment">Attachment (optional)</Label>
              <div className="space-y-2">
                <Input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
                {file && (
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                    {filePreview ? (
                      <Image
                        src={filePreview}
                        alt="Preview"
                        width={40}
                        height={40}
                        className="rounded w-10 h-10 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gray-200 rounded w-10 h-10">
                        {file.name.split(".").pop()?.toUpperCase()}
                      </div>
                    )}
                    <span className="flex-1 truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/faculty/classes/${params.classID}`,
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        classDetails: data,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        classDetails: null,
        error: err.message || "An error occurred",
      },
    };
  }
};

export default CreateClassPost;
