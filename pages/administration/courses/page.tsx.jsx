'use client'

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
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

const courseSchema = z.object({
  course_name: z.string().min(1, "Course name is required"),
  course_code: z.string().min(1, "Course code is required"),
  department_id: z.string().min(1, "Department is required")
})

type Course = {
  id: string
  name: string
  code: string
  department: string
  department_id: string
  student_count: number
  classroom_count: number
}

type Department = {
  id: string
  name: string
}

export default function CoursesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [courses, setCourses] = useState<Course[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Course>[] = [
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
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const addForm = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: "",
      course_code: "",
      department_id: ""
    }
  })

  const editForm = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: selectedCourse?.name || "",
      course_code: selectedCourse?.code || "",
      department_id: selectedCourse?.department_id || ""
    }
  })

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/administration/courses/get-departments')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setDepartments(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch departments",
        variant: "destructive"
      })
    }
  }

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/administration/courses/get-courses')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCourses(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive"
      })
    } finally {
      setIsLoadingInitial(false)
    }
  }

  const onAddSubmit = async (values: z.infer<typeof courseSchema>) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/courses/add-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setIsLoadingInitial(true)
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
      setIsLoadingInitial(false)
    }
  }

  const onEditSubmit = async (values: z.infer<typeof courseSchema>) => {
    if (!selectedCourse) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/courses/edit-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/courses/delete-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  useEffect(() => {
    fetchDepartments()
    fetchCourses()
  }, [])

  if (isLoadingInitial) {
    return (
      <div className="flex items-center justify-center relative mt-40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    )
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
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
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
