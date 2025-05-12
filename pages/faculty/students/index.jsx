"use client";

import { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import type { StudentData } from "@/app/faculty/types/students";

const fetchStudentsData = async (): Promise<StudentData> => {
  const { data } = await axios.get("/api/faculty/students");
  return data;
};

const removeStudent = async (enrollmentId: string) => {
  const { data } = await axios.delete("/api/faculty/students/remove", {
    data: { enrollmentId },
  });
  return data;
};

const FacultyStudentsContent = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudentsData,
  });

  const removeMutation = useMutation({
    mutationFn: removeStudent,
    onSuccess: () => {
      toast.success("Student removed successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: () => {
      toast.error("Failed to remove student");
    },
  });

  const [filter, setFilter] = useState(searchParams.get("classId") || "all");

  const filteredStudents =
    data?.students.filter((student) =>
      filter === "all" ? true : student.classroom_id === filter
    ) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <ToastContainer />
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Students Details</CardTitle>
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {data?.classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll No.</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.roll_number}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeMutation.mutate(student.id)}
                    disabled={removeMutation.isPending}
                  >
                    {removeMutation.isPending ? "Removing..." : "Remove"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FacultyStudentsContent />
    </Suspense>
  );
};

export default Page;
