;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditAssignment = () => {
  const router = useRouter();
  const { assignmentId } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    totalMarks: "",
    classroomId: "",
  });

  const [assignment, setAssignment] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!assignmentId) return;

      try {
        const [assignmentRes, classesRes] = await Promise.all([
          axios.get(`/api/faculty/assignments/${assignmentId}`),
          axios.get("/api/faculty/assignments")
        ]);

        setAssignment(assignmentRes.data);
        setClasses(classesRes.data.classes);

        const assignment = assignmentRes.data;
        setFormData({
          title: assignment.title,
          description: assignment.description,
          dueDate: new Date(assignment.dueDate).toISOString().split("T")[0],
          totalMarks: assignment.totalMarks.toString(),
          classroomId: assignment.classroom.id,
        });

      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [assignmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`/api/faculty/assignments/${assignmentId}`, formData);
      toast.success("Assignment updated successfully");
      router.push(`/faculty/assignments/${assignmentId}`);
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error(
        error.response?.data?.error || 
        error.message || 
        "Failed to update assignment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 py-8">
        <ToastContainer />
        <Button onClick={() => router.back()} variant="outline" className="mb-4">
          <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back
        </Button>
        <Card className="rounded-xl shadow border border-red-200">
          <CardContent className="py-8 text-center text-red-600">
            Failed to load assignment data. Please try again.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <ToastContainer />
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow mb-6">
        <Button onClick={() => router.back()} variant="ghost" className="text-white mb-3">
          <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Assignment</h1>
      </div>
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) =>
                  setFormData({ ...formData, totalMarks: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="classroomId">Class</Label>
              <Select
                value={formData.classroomId}
                onValueChange={(value) =>
                  setFormData({ ...formData, classroomId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes &&
                    classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.course.code} - {cls.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white">
              {isSubmitting && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              {isSubmitting ? "Updating..." : "Update Assignment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAssignment;
