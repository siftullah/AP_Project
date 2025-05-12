import { useState } from "react";
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
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const FacultyStudentsPage = ({ data, initialFilter }) => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const [filter, setFilter] = useState(initialFilter || "all");

  const handleFilterChange = (value) => {
    setFilter(value);
    // Update the URL query parameter
    router.push(
      {
        pathname: router.pathname,
        query: value !== "all" ? { classId: value } : {},
      },
      undefined,
      { shallow: true }
    );
  };

  const handleRemoveStudent = async (studentId) => {
    setIsRemoving(true);
    try {
      await axios.delete("/api/faculty/students/remove", {
        data: { enrollmentId: studentId },
      });
      toast.success("Student removed successfully");

      // Refresh the page to get updated data
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error removing student:", error);
      toast.error("Failed to remove student");
      setIsRemoving(false);
    }
  };

  const filteredStudents =
    data?.students.filter((student) =>
      filter === "all" ? true : student.classroom_id === filter
    ) ?? [];

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Card>
      <ToastContainer />
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Students Details</CardTitle>
        <Select value={filter} onValueChange={handleFilterChange}>
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

export async function getServerSideProps(context) {
  const { req, query } = context;
  const initialFilter = query.classId || "all";

  try {
    const response = await axios.get(
      "http://localhost:3000/api/faculty/students",
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        data: response.data,
        initialFilter,
      },
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    return {
      props: {
        data: null,
        initialFilter,
      },
    };
  }
}

export default FacultyStudentsPage;
