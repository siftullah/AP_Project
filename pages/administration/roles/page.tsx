'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
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
import { format } from "date-fns"

interface Permission {
  id: string
  permission: string
}

interface Role {
  id: string
  role: string
  permissions: Permission[]
  createdAt: Date
  university_id: string
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [newRole, setNewRole] = useState<{ role: string, permissions: string[] }>({ role: '', permissions: [] })
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleEdit = (role: Role) => {
    setEditingRole({
      ...role,
      permissions: role.permissions.map(p => ({
        id: p.id,
        permission: p.permission
      }))
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch('/api/administration/roles/delete-role', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })

      await fetchRoles()
      toast({
        title: "Role removed",
        description: "The role has been successfully removed.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<Role>[] = [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1
    },
    {
      accessorKey: "role",
      header: "Role Name",
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions") as Permission[]
        return permissions.map(p => p.permission).join(", ")
      }
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return format(new Date(row.getValue("createdAt")), "PPP")
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const role = row.original.role
        if (role === 'Super Admin' || role === 'Disabled') {
          return null
        }
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
              Delete
            </Button>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: roles,
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
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/administration/roles/get-roles')
      if (!response.ok) {
        throw new Error('Failed to fetch roles')
      }
      const data = await response.json()
      setRoles(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/administration/roles/get-permissions')
      const data = await response.json()
      setPermissions(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch permissions",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingRole) {
      setEditingRole({ ...editingRole, [name]: value })
    } else {
      setNewRole({ ...newRole, [name]: value })
    }
  }

  const handlePermissionChange = (permissionId: string) => {
    if (editingRole) {
      const updatedPermissions = editingRole.permissions.some(p => p.id === permissionId)
        ? editingRole.permissions.filter(p => p.id !== permissionId)
        : [...editingRole.permissions, { id: permissionId, permission: permissions.find(p => p.id === permissionId)?.permission || '' }]
      
      setEditingRole({
        ...editingRole,
        permissions: updatedPermissions
      })
    } else {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(id => id !== permissionId)
          : [...prev.permissions, permissionId]
      }))
    }
  }

  const validateRole = (role: string, permissions: string[] | Permission[]) => {
    if (!role.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive",
      })
      return false
    }

    if (permissions.length === 0) {
      toast({
        title: "Validation Error", 
        description: "At least one permission must be selected",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleAddRole = async () => {
    if (!validateRole(newRole.role, newRole.permissions)) {
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/administration/roles/add-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRole)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add role')
      }
      
      await fetchRoles()
      setNewRole({ role: '', permissions: [] })
      setIsDialogOpen(false)
      toast({
        title: "Role added",
        description: "The new role has been successfully added.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add role",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditRole = async () => {
    if (!editingRole) return

    if (!validateRole(editingRole.role, editingRole.permissions)) {
      return
    }

    try {
      setIsSubmitting(true)
      await fetch('/api/administration/roles/edit-role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...editingRole,
          permissions: editingRole.permissions.map(p => p.id)
        })
      })

      await fetchRoles()
      setEditingRole(null)
      setIsDialogOpen(false)
      toast({
        title: "Role updated",
        description: "The role has been successfully updated.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center relative mt-40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-pacifico text-sky-400">Role Management</h2>
        <Button onClick={() => {
          setEditingRole(null)
          setNewRole({ role: '', permissions: [] })
          setIsDialogOpen(true)
        }}>
          Add New Role
        </Button>
      </div>

      <div>
        <div className="flex items-center py-4">
          <div className="relative max-w-sm w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              placeholder="Filter roles..."
              value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("role")?.setFilterValue(event.target.value)
              }
              className="pl-8 max-w-sm"
            />
          </div>
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
                    No roles found.
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
            className="px-4 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 flex items-center gap-2"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole ? 'Edit the details of the role.' : 'Enter the details of the new role here.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Name
              </Label>
              <Input
                id="role"
                name="role"
                value={editingRole ? editingRole.role : newRole.role}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Permissions</Label>
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={editingRole 
                      ? editingRole.permissions.some(p => p.id === permission.id)
                      : newRole.permissions.includes(permission.id)
                    }
                    onCheckedChange={() => handlePermissionChange(permission.id)}
                  />
                  <Label htmlFor={permission.id}>{permission.permission}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={editingRole ? handleEditRole : handleAddRole}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                  Submitting...
                </>
              ) : (
                editingRole ? 'Update Role' : 'Add Role'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
