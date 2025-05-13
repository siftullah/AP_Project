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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

const classroomSchema = z.object({
  name: z.string().min(1, "Classroom name is required"),
  course_id: z.string().min(1, "Course is required"),
  batch_id: z.string().min(1, "Batch is required"),
  classroom_id: z.string().nullable()
})

export default function ClassroomsPage({ initialClassrooms, initialDepartments, initialBatches }) {
  const router = useRouter()
  const { toast } = useToast()
  const [classrooms, setClassrooms] = useState(initialClassrooms)
  const [departments, setDepartments] = useState(initialDepartments)
  const [batches, setBatches] = useState(initialBatches)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedClassroom, setSelectedClassroom] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)

  const [columnFilters, setColumnFilters] = useState([])

  const columns = [
    {
      accessorKey: "classroom_name",
      header: "Classroom Name",
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => `${row.original.course_code} - ${row.original.course_name}`
    },
    {
      accessorKey: "department_name", 
      header: "Department",
    },
    {
      accessorKey: "batch_name",
      header: "Batch",
    },
    {
      accessorKey: "teachers",
      header: "Teachers",
      cell: ({ row }) => row.original.teachers.join(", ")
    },
    {
      accessorKey: "student_count",
      header: "Total Students",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const classroom = row.original
        return (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/administration/classrooms/view-classroom/${classroom.classroom_id}`)}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedClassroom(classroom)
                editForm.setValue("name", classroom.classroom_name)
                editForm.setValue("classroom_id", classroom.classroom_id)
                editForm.setValue("course_id", classroom.course_id)
                editForm.setValue("batch_id", classroom.batch_id)
                setIsEditDialogOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(classroom.classroom_id)}
              disabled={isDeleting === classroom.classroom_id}
            >
              {isDeleting === classroom.classroom_id && (
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
    data: classrooms,
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
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      classroom_id: "",
      name: "",
      course_id: "",
      batch_id: ""
    }
  })

  const editForm = useForm({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      name: selectedClassroom?.classroom_name || "",
      course_id: selectedClassroom?.course_id || "",
      batch_id: selectedClassroom?.batch_id || "",
      classroom_id: selectedClassroom?.classroom_id || ""
    }
  })

  const onAddSubmit = async (values) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/classrooms/add-classroom', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(values)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      toast({
        title: "Success",
        description: "Classroom added successfully"
      })
      setIsAddDialogOpen(false)
      addForm.reset()
      
      const classroomsRes = await fetch('/api/administration/classrooms/get-classrooms', {
        headers: {
          
        
        },
      })
      const classroomsData = await classroomsRes.json()
      setClassrooms(classroomsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add classroom",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditSubmit = async (values) => {
    if (!selectedClassroom) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/classrooms/edit-classroom', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
       
        },
        body: JSON.stringify({
          ...values
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Classroom updated successfully"
      })
      setIsEditDialogOpen(false)
      editForm.reset()
      
      const classroomsRes = await fetch('/api/administration/classrooms/get-classrooms', {
        headers: {
          
         
        },
      })
      const classroomsData = await classroomsRes.json()
      setClassrooms(classroomsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update classroom",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/classrooms/delete-classroom', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ classroom_id: id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Classroom deleted successfully"
      })
      
      const classroomsRes = await fetch('/api/administration/classrooms/get-classrooms', {
        headers: {
          
      
        },
      })
      const classroomsData = await classroomsRes.json()
      setClassrooms(classroomsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete classroom",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-pacifico text-sky-400">Classrooms</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Classroom</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Classroom</DialogTitle>
              <DialogDescription>
                Enter the details of the new classroom here.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classroom Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter classroom name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="course_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {departments.map((dept) => (
                            dept.courses.length > 0 && (
                              <SelectGroup key={dept.department_name}>
                                <SelectLabel>{dept.department_name}</SelectLabel>
                                {dept.courses.map((course) => (
                                  <SelectItem key={course.course_id} value={course.course_id}>
                                    {course.course_code} - {course.course_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            )
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="batch_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a batch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {batches.map((batch) => (
                            <SelectItem key={batch.batch_id} value={batch.batch_id}>
                              {batch.batch_name}
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
                    Add Classroom
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
            placeholder="Filter classrooms..."
            value={(table.getColumn("classroom_name")?.getFilterValue() ?? "")}
            onChange={(event) =>
              table.getColumn("classroom_name")?.setFilterValue(event.target.value)
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
                    No classrooms found.
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
            <DialogTitle>Edit Classroom</DialogTitle>
            <DialogDescription>
              Update the classroom details here.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classroom Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter classroom name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {departments.map((dept) => (
                          dept.courses.length > 0 && (
                            <SelectGroup key={dept.department_name}>
                              <SelectLabel>{dept.department_name}</SelectLabel>
                              {dept.courses.map((course) => (
                                <SelectItem key={course.course_id} value={course.course_id}>
                                  {course.course_code} - {course.course_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="batch_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a batch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {batches.map((batch) => (
                          <SelectItem key={batch.batch_id} value={batch.batch_id}>
                            {batch.batch_name}
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
                  Update Classroom
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
    const [classroomsRes, coursesRes, batchesRes] = await Promise.all([
      fetch(`http://localhost:3000/api/administration/classrooms/get-classrooms`, {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      }),
      fetch(`http://localhost:3000/api/administration/classrooms/get-courses`, {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      }),
      fetch(`http://localhost:3000/api/administration/classrooms/get-batches`, {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      })
    ])

    if (!classroomsRes.ok || !coursesRes.ok || !batchesRes.ok) {
      throw new Error('Failed to fetch data')
    }

    const [classrooms, departments, batches] = await Promise.all([
      classroomsRes.json(),
      coursesRes.json(),
      batchesRes.json()
    ])

    return {
      props: {
        initialClassrooms: classrooms,
        initialDepartments: departments,
        initialBatches: batches
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        initialClassrooms: [],
        initialDepartments: [],
        initialBatches: []
      }
    }
  }
}
