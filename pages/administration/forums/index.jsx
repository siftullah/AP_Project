import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ForumsPage({ initialForums }) {
  const router = useRouter()
  const [forums, setForums] = useState(initialForums)
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)

  const [newForumName, setNewForumName] = useState('')
  const [forumType, setForumType] = useState('Public')
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [showNewForumDialog, setShowNewForumDialog] = useState(false)


  const [editForumName, setEditForumName] = useState('')
  const [editForumId, setEditForumId] = useState('')
  const [showEditDialog, setShowEditDialog] = useState(false)

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/administration/forums/get-groups', {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to fetch groups')
      const data = await response.json()
      setGroups(data.groups)
    } catch (err) {
      console.error('Error fetching groups:', err)
    }
  }

  const handleCreateForum = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/forums/create-forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forum_name: newForumName,
          group_id: forumType === 'Private' ? selectedGroupId : null
        })
      })

      if (!response.ok) throw new Error('Failed to create forum')
      
      const forumsResponse = await fetch('/api/administration/forums/get-forums')
      const newForums = await forumsResponse.json()
      setForums(newForums)

      setNewForumName('')
      setForumType('Public')
      setSelectedGroupId('')
      setShowNewForumDialog(false)
    } catch (err) {
      console.error('Error creating forum:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditForum = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/forums/edit-forum', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forum_id: editForumId,
          forum_name: editForumName
        })
      })

      if (!response.ok) throw new Error('Failed to update forum')

      const forumsResponse = await fetch('/api/administration/forums/get-forums')
      const newForums = await forumsResponse.json()
      setForums(newForums)

      setShowEditDialog(false)
    } catch (err) {
      console.error('Error updating forum:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteForum = async (forumId) => {
    setIsDeleting(forumId)
    try {
      const response = await fetch('/api/administration/forums/delete-forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forum_id: forumId })
      })

      if (!response.ok) throw new Error('Failed to delete forum')

      const forumsResponse = await fetch('/api/administration/forums/get-forums')
      const newForums = await forumsResponse.json()
      setForums(newForums)
    } catch (err) {
      console.error('Error deleting forum:', err)
    } finally {
      setIsDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center relative mt-40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-sky-900">Forums</h1>
          <p className="text-sky-600">Total Forums: {forums.length}</p>
        </div>
        
        <Dialog open={showNewForumDialog} onOpenChange={setShowNewForumDialog}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                fetchGroups()
                setShowNewForumDialog(true)
              }}
              className="bg-sky-500 hover:bg-sky-600"
            >
              Create New Forum
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Forum</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="forum-name">Forum Name</Label>
                <Input
                  id="forum-name"
                  value={newForumName}
                  onChange={(e) => setNewForumName(e.target.value)}
                />
              </div>
              <div>
                <Label>Forum Type</Label>
                <Select value={forumType} onValueChange={(value) => setForumType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {forumType === 'Private' && (
                <div>
                  <Label>Select Group</Label>
                  <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.group_id} value={group.group_id}>
                          {group.group_name} ({group.group_type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button 
                className="w-full bg-sky-500 hover:bg-sky-600" 
                onClick={handleCreateForum}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  'Create Forum'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map((forum) => (
          <Card key={forum.id} className="flex flex-col border-sky-100">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-sky-900">{forum.name}</h2>
              <div className="space-y-2 text-sm text-sky-600">
                <p>Created by: {forum.created_by} ({forum.created_by_role})</p>
                <p>Type: {forum.type}</p>
                {forum.group_name && (
                  <p>Group: {forum.group_name} ({forum.group_type})</p>
                )}
                <p>Threads: {forum.thread_count}</p>
                <p>Created: {formatDistanceToNow(new Date(forum.created_at))} ago</p>
                {forum.last_thread_date && (
                  <p>Last activity: {formatDistanceToNow(new Date(forum.last_thread_date))} ago</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 mt-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push(`/administration/forums/${forum.id}`)}
                className="text-sky-600 hover:text-sky-700 border-sky-200 hover:bg-sky-50"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditForumId(forum.id)
                      setEditForumName(forum.name)
                      setShowEditDialog(true)
                    }}
                    className="text-sky-600 hover:text-sky-700 border-sky-200 hover:bg-sky-50"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Forum</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-forum-name">Forum Name</Label>
                      <Input
                        id="edit-forum-name"
                        value={editForumName}
                        onChange={(e) => setEditForumName(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full bg-sky-500 hover:bg-sky-600" 
                      onClick={handleEditForum}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting
                        </>
                      ) : (
                        'Update Forum'
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDeleteForum(forum.id)}
                disabled={isDeleting === forum.id}
              >
                {isDeleting === forum.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Deleting
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  try {
    const response = await fetch(`http://localhost:3000/api/administration/forums/get-forums`, {
      headers: {
        Cookie: req.headers.cookie || ""
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch forums')
    }

    const forums = await response.json()

    return {
      props: {
        initialForums: forums
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        initialForums: []
      }
    }
  }
}
