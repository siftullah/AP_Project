'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialFaculty = [
  { id: 1, name: "Dr. John Doe", department: "Computer Science", role: "Professor" },
  { id: 2, name: "Dr. Jane Smith", department: "Electrical Engineering", role: "Associate Professor" },
]

const initialStudents = [
  { id: 1, name: "Alice Johnson", department: "Computer Science", year: "3rd" },
  { id: 2, name: "Bob Williams", department: "Mechanical Engineering", year: "2nd" },
]

export default function UsersPage() {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [students, setStudents] = useState(initialStudents)
  const [newUser, setNewUser] = useState({ name: '', department: '', role: '', year: '' })
  const [editingUser, setEditingUser] = useState<(typeof initialFaculty[0] & { year?: string }) | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userType, setUserType] = useState<'faculty' | 'student'>('faculty')
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value })
    } else {
      setNewUser({ ...newUser, [name]: value })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value })
    } else {
      setNewUser({ ...newUser, [name]: value })
    }
  }

  const handleAddUser = () => {
    if (userType === 'faculty') {
      setFaculty([...faculty, { id: faculty.length + 1, ...newUser }])
    } else {
      setStudents([...students, { id: students.length + 1, ...newUser }])
    }
    setNewUser({ name: '', department: '', role: '', year: '' })
    setIsDialogOpen(false)
    toast({
      title: "User added",
      description: `New ${userType} has been successfully added.`,
    })
  }

  const handleEditUser = () => {
    if (editingUser) {
      if ('role' in editingUser) {
        setFaculty(faculty.map(f => f.id === editingUser.id ? editingUser : f))
      } else {
        setStudents(students.map(s => s.id === editingUser.id ? editingUser : s))
      }
      setEditingUser(null)
      setIsDialogOpen(false)
      toast({
        title: "User updated",
        description: "The user has been successfully updated.",
      })
    }
  }

  const handleDeleteUser = (id: number, type: 'faculty' | 'student') => {
    if (type === 'faculty') {
      setFaculty(faculty.filter(f => f.id !== id))
    } else {
      setStudents(students.filter(s => s.id !== id))
    }
    toast({
      title: "User removed",
      description: `The ${type} has been successfully removed.`,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-pacifico text-sky-400">Users Management</h2>
        <Button onClick={() => {
          setEditingUser(null)
          setNewUser({ name: '', department: '', role: '', year: '' })
          setUserType('faculty')
          setIsDialogOpen(true)
        }}>Add New User</Button>
      </div>
      <Tabs defaultValue="faculty">
        <TabsList>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="faculty">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => {
                      setEditingUser(member)
                      setUserType('faculty')
                      setIsDialogOpen(true)
                    }}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(member.id, 'faculty')}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="students">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => {
                      setEditingUser(student)
                      setUserType('student')
                      setIsDialogOpen(true)
                    }}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(student.id, 'student')}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Edit the user details.' : 'Enter the details of the new user.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={editingUser ? editingUser.name : newUser.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Input
                id="department"
                name="department"
                value={editingUser ? editingUser.department : newUser.department}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {userType === 'faculty' ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('role', value)}
                  defaultValue={editingUser?.role || newUser.role}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">Year</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('year', value)}
                  defaultValue={editingUser?.year || newUser.year}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st</SelectItem>
                    <SelectItem value="2nd">2nd</SelectItem>
                    <SelectItem value="3rd">3rd</SelectItem>
                    <SelectItem value="4th">4th</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={editingUser ? handleEditUser : handleAddUser}>
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

