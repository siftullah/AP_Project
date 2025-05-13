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
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required")
})

export default function DepartmentsPage({ initialDepartments }) {
  const router = useRouter()
  const { toast } = useToast()
  const [departments, setDepartments] = useState(initialDepartments)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const [columnFilters, setColumnFilters] = useState([])

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "faculty_count",
      header: "Faculty",
    },
    {
      accessorKey: "student_count", 
      header: "Students",
    },
    {
      accessorKey: "course_count",
      header: "Courses",
    },
    {
      accessorKey: "classroom_count",
      header: "Classrooms",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const dept = row.original
        return (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedDepartment(dept)
                editForm.setValue("name", dept.name)
                setIsEditDialogOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(dept.id)}
              disabled={isDeleting === dept.id}
            >
              {isDeleting === dept.id && (
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
    data: departments,
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
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: ""
    }
  })

  const editForm = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: selectedDepartment?.name || ""
    }
  })

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/administration/departments/get-departments', {
        headers: {
       
        },
      })
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

  const onAddSubmit = async (values) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/departments/add-department', {
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
        description: "Department added successfully"
      })
      setIsAddDialogOpen(false)
      addForm.reset()
      fetchDepartments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add department",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditSubmit = async (values) => {
    if (!selectedDepartment) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/departments/edit-department', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({
          department_id: selectedDepartment.id,
          department_name: values.name
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Department updated successfully"
      })
      setIsEditDialogOpen(false)
      editForm.reset()
      fetchDepartments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/departments/delete-department', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ department_id: id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Department deleted successfully"
      })
      fetchDepartments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete department",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-pacifico text-sky-400">Departments</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Department</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Enter the details of the new department here.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
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
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Department
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
            placeholder="Filter departments..."
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
                    No departments found.
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
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update the department details here.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
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
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Department
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
    const res = await fetch(`http://localhost:3000/api/administration/departments/get-departments`, {
      headers: {
        Cookie: req.headers.cookie || ""
      }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch departments')
    }

    const departments = await res.json()

    return {
      props: {
        initialDepartments: departments
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        initialDepartments: []
      }
    }
  }
}
