'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"

const initialDiscussions = [
  { id: 1, title: "Course Material Feedback", type: "Classroom", participants: 25, status: "Active", content: "Discussion about the effectiveness of the current course materials and suggestions for improvement." },
  { id: 2, title: "Department Meeting", type: "Department", participants: 10, status: "Scheduled", content: "Agenda for the upcoming department meeting, including budget discussions and research proposals." },
  { id: 3, title: "Student Council", type: "Batch", participants: 50, status: "Active", content: "Ongoing discussion about student welfare, event planning, and campus improvements." },
  { id: 4, title: "Project Collaboration", type: "Personal", participants: 3, status: "Archived", content: "Archived discussion about a completed research project collaboration between faculty members." },
]

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState(initialDiscussions)
  const [filter, setFilter] = useState('all')
  const [selectedDiscussion, setSelectedDiscussion] = useState<typeof initialDiscussions[0] | null>(null)
  const [newDiscussion, setNewDiscussion] = useState({ title: '', type: '', content: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredDiscussions = filter === 'all' 
    ? discussions 
    : discussions.filter(d => d.type.toLowerCase() === filter)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewDiscussion({ ...newDiscussion, [name]: value })
  }

  const handleSelectChange = (value: string) => {
    setNewDiscussion({ ...newDiscussion, type: value })
  }

  const handleAddDiscussion = () => {
    const newId = Math.max(...discussions.map(d => d.id)) + 1
    const newDiscussionItem = {
      ...newDiscussion,
      id: newId,
      participants: 0,
      status: 'Active'
    }
    setDiscussions([...discussions, newDiscussionItem])
    setNewDiscussion({ title: '', type: '', content: '' })
    setIsDialogOpen(false)
    toast({
      title: "Discussion added",
      description: "The new discussion has been successfully created.",
    })
  }

  const handleDeleteDiscussion = (id: number) => {
    setDiscussions(discussions.filter(d => d.id !== id))
    toast({
      title: "Discussion removed",
      description: "The discussion has been successfully removed.",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-pacifico text-sky-400">Discussions Management</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Create New Discussion</Button>
      </div>
      <div className="mb-4">
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="classroom">Classroom</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="batch">Batch</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDiscussions.map((discussion) => (
            <TableRow key={discussion.id}>
              <TableCell>{discussion.title}</TableCell>
              <TableCell>{discussion.type}</TableCell>
              <TableCell>{discussion.participants}</TableCell>
              <TableCell>{discussion.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedDiscussion(discussion)}>
                  View
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteDiscussion(discussion.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={selectedDiscussion !== null} onOpenChange={() => setSelectedDiscussion(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedDiscussion?.title}</DialogTitle>
            <DialogDescription>
              Type: {selectedDiscussion?.type} | Participants: {selectedDiscussion?.participants} | Status: {selectedDiscussion?.status}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Discussion Content:</h3>
            <p className="text-gray-700">{selectedDiscussion?.content}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recent Activity:</h3>
            <ul className="list-disc pl-5">
              <li>User1 posted a new reply (2 hours ago)</li>
              <li>User2 uploaded a document (1 day ago)</li>
              <li>Moderator pinned an important message (3 days ago)</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedDiscussion(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Discussion</DialogTitle>
            <DialogDescription>Enter the details for the new discussion.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                name="title"
                value={newDiscussion.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select discussion type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classroom">Classroom</SelectItem>
                  <SelectItem value="Department">Department</SelectItem>
                  <SelectItem value="Batch">Batch</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={newDiscussion.content}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddDiscussion}>Create Discussion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

