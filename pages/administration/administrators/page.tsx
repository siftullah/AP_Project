'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

interface Administrator {
  administration_id: string
  first_name: string
  last_name: string
  email: string
  role_name: string
  role_id: string
}

interface Role {
  id: string
  role: string
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Administrator[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null)
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    roleId: ''
  })
  const [editAdmin, setEditAdmin] = useState({
    uniAdministrationId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    roleId: '',
    roleName: ''
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const columns: ColumnDef<Administrator>[] = [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name", 
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role_name",
      header: "Role",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const admin = row.original
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEditAdmin(admin)}>
              Edit
            </Button>
            {admin.role_name.toLowerCase() !== 'super admin' && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDeleteAdmin(admin.administration_id)}
                disabled={deletingAdminId === admin.administration_id}
              >
                {deletingAdminId === admin.administration_id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: admins,
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

  useEffect(() => {
    fetchAdministrators()
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/administration/administrators/get-roles')
      const data = await response.json()
      setRoles(data.filter((role: Role) => role.role.toLowerCase() !== 'super admin'))
    } catch (error) {
      console.error('Error fetching roles:', error)
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive"
      })
    }
  }

  const fetchAdministrators = async () => {
    try {
      const response = await fetch('/api/administration/administrators/get-administrators')
      const data = await response.json()
      setAdmins(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching administrators:', error)
      toast({
        title: "Error",
        description: "Failed to fetch administrators",
        variant: "destructive"
      })
      setLoading(false)
    }
  }

  const validateInputs = (admin: typeof newAdmin | typeof editAdmin) => {
    if (!admin.firstName.trim()) {
      toast({
        title: "Error",
        description: "First name is required",
        variant: "destructive"
      })
      return false
    }
    if (!admin.lastName.trim()) {
      toast({
        title: "Error",
        description: "Last name is required",
        variant: "destructive"
      })
      return false
    }
    if (!admin.emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.emailAddress)) {
      toast({
        title: "Error",
        description: "Valid email address is required",
        variant: "destructive"
      })
      return false
    }
    if (!admin.roleId) {
      toast({
        title: "Error",
        description: "Role selection is required",
        variant: "destructive"
      })
      return false
    }
    return true
  }

  const handleAddAdmin = async () => {
    if (!validateInputs(newAdmin)) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/administrators/add-administrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add administrator')
      }

      toast({
        title: "Success",
        description: "Administrator added successfully",
      })
      
      setNewAdmin({
        firstName: '',
        lastName: '',
        emailAddress: '',
        roleId: ''
      })
      fetchAdministrators()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error adding administrator:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add administrator",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditAdmin = (admin: Administrator) => {
    setEditAdmin({
      uniAdministrationId: admin.administration_id,
      firstName: admin.first_name,
      lastName: admin.last_name,
      emailAddress: admin.email,
      roleId: admin.role_id,
      roleName: admin.role_name
    })
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = async () => {
    if (!validateInputs(editAdmin)) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/administrators/edit-administrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editAdmin),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update administrator')
      }

      toast({
        title: "Success",
        description: "Administrator updated successfully",
      })
      
      setEditAdmin({
        uniAdministrationId: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        roleId: '',
        roleName: ''
      })
      fetchAdministrators()
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating administrator:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update administrator",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAdmin = async (adminId: string) => {
    setDeletingAdminId(adminId)
    try {
      const response = await fetch('/api/administration/administrators/delete-administrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniAdministrationId: adminId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete administrator')
      }

      toast({
        title: "Success",
        description: "Administrator deleted successfully",
      })
      
      fetchAdministrators()
    } catch (error) {
      console.error('Error deleting administrator:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete administrator",
        variant: "destructive"
      })
    } finally {
      setDeletingAdminId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center relative mt-40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-pacifico text-sky-400">Admin Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>Enter the details of the new admin user.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">First Name</Label>
                <Input
                  id="firstName"
                  value={newAdmin.firstName}
                  onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">Last Name</Label>
                <Input
                  id="lastName"
                  value={newAdmin.lastName}
                  onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="emailAddress" className="text-right">Email</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={newAdmin.emailAddress}
                  onChange={(e) => setNewAdmin({ ...newAdmin, emailAddress: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select
                  value={newAdmin.roleId}
                  onValueChange={(value) => setNewAdmin({ ...newAdmin, roleId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAdmin} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  'Add Administrator'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Admin</DialogTitle>
              <DialogDescription>Update the administrator's details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editFirstName" className="text-right">First Name</Label>
                <Input
                  id="editFirstName"
                  value={editAdmin.firstName}
                  onChange={(e) => setEditAdmin({ ...editAdmin, firstName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLastName" className="text-right">Last Name</Label>
                <Input
                  id="editLastName"
                  value={editAdmin.lastName}
                  onChange={(e) => setEditAdmin({ ...editAdmin, lastName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editEmailAddress" className="text-right">Email</Label>
                <Input
                  id="editEmailAddress"
                  type="email"
                  value={editAdmin.emailAddress}
                  onChange={(e) => setEditAdmin({ ...editAdmin, emailAddress: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRole" className="text-right">Role</Label>
                <Select
                  value={editAdmin.roleId}
                  onValueChange={(value) => setEditAdmin({ ...editAdmin, roleId: value })}
                  disabled={editAdmin.roleName.toLowerCase() === 'super admin'}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating
                  </>
                ) : (
                  'Update Administrator'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter administrators..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
                    No administrators found.
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
    </div>
  )
}
