import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import axios from "axios";

const AssignmentsContent = ({ data, initialFilter }) => {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState("");

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading assignments.
      </div>
    );
  }

  const { classes, assignments } = data;

  const filteredAssignments = assignments
    .filter((a) => (filter === "all" ? true : a.classroom.id === filter))
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Input
          placeholder="Search by assignment title..."
          className="md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filter}
          onValueChange={(value) => {
            setFilter(value);
            router.push(
              {
                pathname: router.pathname,
                query: value !== "all" ? { classId: value } : {},
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.course.code} - {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="text-center text-slate-500 py-12">
          No assignments found.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="rounded-2xl shadow-md hover:shadow-xl transition duration-200 border border-slate-200"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-semibold text-blue-700">
                  {assignment.title}
                </CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  {assignment.description}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {assignment.classroom.course.code}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                    {assignment.classroom.name}
                  </span>
                </div>
                <div>
                  <strong>Due:</strong>{" "}
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Marks:</strong> {assignment.totalMarks} |{" "}
                  <strong>Submissions:</strong> {assignment.submissionCount}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-blue-600 text-blue-700 hover:bg-blue-50"
                  onClick={() =>
                    router.push(`/faculty/assignments/${assignment.id}`)
                  }
                >
                  View Assignment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const Assignments = ({ data, initialFilter }) => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl text-slate-800">Assignments</h1>
        <Button
          onClick={() => router.push("/faculty/assignments/create")}
          className="bg-gradient-to-r from-blue-500 to-cyan-500"
        >
          <Plus className="mr-2 w-4 h-4" />
          Create New Assignment
        </Button>
      </div>

      <AssignmentsContent data={data} initialFilter={initialFilter} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req, query } = context;
  const initialFilter = query.classId || "all";

  try {
    const response = await axios.get(
      "http://localhost:3000/api/faculty/assignments",
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
    console.error("Error fetching assignments:", error);
    return {
      props: {
        data: null,
        initialFilter,
      },
    };
  }
}

export default Assignments;
