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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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

const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  users: z.array(z.string()).min(1, "At least one user must be selected")
})

type Group = {
  group_id: string
  group_name: string
  group_type: string
  created_at: string
}

type Member = {
  user_id: string
  name: string
  role: string
}

export default function GroupsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [groups, setGroups] = useState<Group[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [users, setUsers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditMembersDialogOpen, setIsEditMembersDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Group>[] = [
    {
      accessorKey: "group_name",
      header: "Name",
    },
    {
      accessorKey: "group_type",
      header: "Type",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString()
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const group = row.original
        return (
          <div className="space-x-2">
            {group.group_type === 'custom' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await handleView(group.group_id)
                    setSelectedGroup(group)
                    setIsViewDialogOpen(true)
                  }}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedGroup(group)
                    editForm.setValue("name", group.group_name)
                    setIsEditDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await handleView(group.group_id)
                    setSelectedGroup(group)
                    const memberIds = members.map(m => m.user_id)
                    editMembersForm.setValue("users", memberIds)
                    setIsEditMembersDialogOpen(true)
                  }}
                >
                  Edit Members
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(group.group_id)}
                  disabled={isDeleting === group.group_id}
                >
                  {isDeleting === group.group_id && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </Button>
              </>
            )}
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: groups,
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

  const addForm = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      users: []
    }
  })

  const editForm = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: selectedGroup?.group_name || "",
      users: []
    }
  })

  const editMembersForm = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema.pick({ users: true })),
    defaultValues: {
      users: []
    }
  })

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/administration/groups/get-users', {
        method: 'POST'
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUsers(data.users)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      })
    }
  }

  const fetchGroups = async () => {
    try {
      const res = await fetch('/api/administration/groups/get-groups', {
        method: 'POST'
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setGroups(data.groups)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch groups",
        variant: "destructive"
      })
    } finally {
      setIsLoadingInitial(false)
    }
  }

  const handleView = async (groupId: string) => {
    try {
      const res = await fetch('/api/administration/groups/view-group-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group_id: groupId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMembers(data.members)
      return data.members
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch group members",
        variant: "destructive"
      })
    }
  }

  const onAddSubmit = async (values: z.infer<typeof groupSchema>) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/groups/add-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_name: values.name,
          type: 'custom',
          user_ids: values.users
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      toast({
        title: "Success",
        description: "Group added successfully"
      })
      setIsAddDialogOpen(false)
      addForm.reset()
      fetchGroups()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add group",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditSubmit = async (values: z.infer<typeof groupSchema>) => {
    if (!selectedGroup) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/groups/edit-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_id: selectedGroup.group_id,
          group_name: values.name
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Group updated successfully"
      })
      setIsEditDialogOpen(false)
      editForm.reset()
      fetchGroups()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update group",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onEditMembersSubmit = async (values: z.infer<typeof groupSchema>) => {
    if (!selectedGroup) return

    try {
      setIsLoading(true)
      const res = await fetch('/api/administration/groups/edit-group-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_id: selectedGroup.group_id,
          user_ids: values.users
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Group members updated successfully"
      })
      setIsEditMembersDialogOpen(false)
      editMembersForm.reset()
      fetchGroups()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update group members",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      const res = await fetch('/api/administration/groups/delete-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group_id: id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast({
        title: "Success",
        description: "Group deleted successfully"
      })
      fetchGroups()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete group",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  useEffect(() => {
    fetchGroups()
    fetchUsers()
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
        <h2 className="text-4xl font-pacifico text-sky-400">Groups</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>
                Enter the details of the new group here.
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
                <FormField
                  control={addForm.control}
                  name="users"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Members</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value?.length > 0
                                ? `${field.value.length} members selected`
                                : "Select members"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="Search members..." />
                              <CommandEmpty>No members found.</CommandEmpty>
                              <CommandGroup className="max-h-[200px] overflow-y-auto">
                                {users.map((user) => (
                                  <CommandItem
                                    key={user.user_id}
                                    onSelect={() => {
                                      const currentValue = field.value || []
                                      const newValue = currentValue.includes(user.user_id)
                                        ? currentValue.filter((id) => id !== user.user_id)
                                        : [...currentValue, user.user_id]
                                      field.onChange(newValue)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(user.user_id)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {user.name} ({user.role})
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Group
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
            placeholder="Filter groups..."
            value={(table.getColumn("group_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("group_name")?.setFilterValue(event.target.value)
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
                    No groups found.
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
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update the group details here.
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
                  Update Group
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditMembersDialogOpen} onOpenChange={setIsEditMembersDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group Members</DialogTitle>
            <DialogDescription>
              Update the members of {selectedGroup?.group_name}
            </DialogDescription>
          </DialogHeader>
          <Form {...editMembersForm}>
            <form onSubmit={editMembersForm.handleSubmit(onEditMembersSubmit)} className="space-y-4">
              <FormField
                control={editMembersForm.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value?.length > 0
                              ? `${field.value.length} members selected`
                              : "Select members"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search members..." />
                            <CommandEmpty>No members found.</CommandEmpty>
                            <CommandGroup className="max-h-[200px] overflow-y-auto">
                              {users.map((user) => (
                                <CommandItem
                                  key={user.user_id}
                                  onSelect={() => {
                                    const currentValue = field.value || []
                                    const newValue = currentValue.includes(user.user_id)
                                      ? currentValue.filter((id) => id !== user.user_id)
                                      : [...currentValue, user.user_id]
                                    field.onChange(newValue)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.includes(user.user_id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {user.name} ({user.role})
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Members
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Group Members</DialogTitle>
            <DialogDescription>
              Members of {selectedGroup?.group_name}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.user_id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}