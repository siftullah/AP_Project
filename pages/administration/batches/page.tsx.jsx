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

const batchSchema = z.object({
  name: z.string().min(1, "Batch name is required")
})

type Batch = {
  id: string
  name: string
  student_count: number
  classroom_count: number
}

export default function BatchesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [batches, setBatches] = useState<Batch[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Batch>[] = [
    {
      accessorKey: "name",
      header: "Name",
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
        const batch = row.original
        return (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedBatch(batch)
                editForm.setValue("name", batch.name)
                setIsEditDialogOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(batch.id)}
              disabled={isDeleting === batch.id}
            >
              {isDeleting === batch.id && (
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
    data: batches,
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

  const addForm = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      name: ""
    }
  })

  const editForm = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      name: selectedBatch?.name || ""
    }
  })

  const fetchBatches = async () => {
    try {
      const res = await fetch('/api/administration/batches/get-batches')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setBatches(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch batches",
        variant: "destructive"
      })
    } finally {
      setIsLoadingInitial(false)
    }
  }

  const onAddSubmit = async (values: z.infer<typeof batchSchema>) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/batches/add-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      toast({
        title: "Success",
        description: "Batch added successfully"
      })
      setIsAddDialogOpen(false)
      addForm.reset()
      fetchBatches()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add batch",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditSubmit = async (values: z.infer<typeof batchSchema>) => {
    if (!selectedBatch) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/batches/edit-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: selectedBatch.id,
          batch_name: values.name
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Batch updated successfully"
      })
      setIsEditDialogOpen(false)
      editForm.reset()
      fetchBatches()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update batch",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/batches/delete-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_id: id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Batch deleted successfully"
      })
      fetchBatches()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete batch",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  useEffect(() => {
    fetchBatches()
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
        <h2 className="text-4xl font-pacifico text-sky-400">Batches</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Batch</DialogTitle>
              <DialogDescription>
                Enter the details of the new batch here.
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
                    Add Batch
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
            placeholder="Filter batches..."
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
                    No batches found.
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
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogDescription>
              Update the batch details here.
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
                  Update Batch
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}