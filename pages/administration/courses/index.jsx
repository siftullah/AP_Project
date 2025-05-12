import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

const courseSchema = z.object({
  course_name: z.string().min(1, "Course name is required"),
  course_code: z.string().min(1, "Course code is required"), 
  department_id: z.string().min(1, "Department is required")
})

export default function CoursesPage({ initialCourses, initialDepartments }) {
  const router = useRouter()
  const { toast } = useToast()
  const [courses, setCourses] = useState(initialCourses)
  const [departments, setDepartments] = useState(initialDepartments)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const [columnFilters, setColumnFilters] = useState([])

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "code", 
      header: "Code",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "student_count",
      header: "Students",
    },
    {
      accessorKey: "classroom_count",
      header: "Classrooms", 
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const course = row.original
        return (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCourse(course)
                editForm.setValue("course_name", course.name)
                editForm.setValue("course_code", course.code)
                editForm.setValue("department_id", course.department_id)
                setIsEditDialogOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(course.id)}
              disabled={isDeleting === course.id}
            >
              {isDeleting === course.id && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const addForm = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: "",
      course_code: "",
      department_id: ""
    }
  })

  const editForm = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: selectedCourse?.name || "",
      course_code: selectedCourse?.code || "",
      department_id: selectedCourse?.department_id || ""
    }
  })

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/administration/courses/get-courses', {
        headers: {
         
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCourses(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive"
      })
    }
  }

  const onAddSubmit = async (values) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/courses/add-course', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({
          department_id: values.department_id,
          course_name: values.course_name,
          course_code: values.course_code
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      toast({
        title: "Success",
        description: "Course added successfully"
      })
      setIsAddDialogOpen(false)
      addForm.reset()
      fetchCourses()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add course",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditSubmit = async (values) => {
    if (!selectedCourse) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/courses/edit-course', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
          course_id: selectedCourse.id,
          department_id: values.department_id,
          course_name: values.course_name,
          course_code: values.course_code
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Course updated successfully"
      })
      setIsEditDialogOpen(false)
      editForm.reset()
      fetchCourses()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/courses/delete-course', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ course_id: id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Course deleted successfully"
      })
      fetchCourses()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-pacifico text-sky-400">Courses</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter the details of the new course here.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="course_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="course_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Course
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter courses..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the course details here.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="course_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="course_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={selectedCourse?.department_id}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Course
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  try {
    const [coursesResponse, departmentsResponse] = await Promise.all([
      fetch(`http://localhost:3000/api/administration/courses/get-courses`, {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      }),
      fetch(`http://localhost:3000/api/administration/courses/get-departments`, {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      })
    ])

    if (!coursesResponse.ok || !departmentsResponse.ok) {
      throw new Error('Failed to fetch data')
    }

    const [courses, departments] = await Promise.all([
      coursesResponse.json(),
      departmentsResponse.json()
    ])

    return {
      props: {
        initialCourses: courses,
        initialDepartments: departments
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        initialCourses: [],
        initialDepartments: []
      }
    }
  }
}
