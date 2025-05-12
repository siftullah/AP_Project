;

import { Suspense, useState, useEffect } from "react";
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
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const FacultyStudentsContent = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [filter, setFilter] = useState(searchParams.get("classId") || "all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/faculty/students");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleRemoveStudent = async (studentId) => {
    setIsRemoving(true);
    try {
      await axios.delete("/api/faculty/students/remove", {
        data: { enrollmentId: studentId },
      });
      toast.success("Student removed successfully");
      
      // Refresh students data
      const response = await axios.get("/api/faculty/students");
      setData(response.data);
    } catch (error) {
      console.error("Error removing student:", error);
      toast.error("Failed to remove student");
    } finally {
      setIsRemoving(false);
    }
  };

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
                    onClick={() => handleRemoveStudent(student.id)}
                    disabled={isRemoving}
                  >
                    {isRemoving ? "Removing..." : "Remove"}
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
