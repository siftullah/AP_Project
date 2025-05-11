'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2, MessageCircle, Calendar, User, Clock, ArrowLeft, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Forum {
  id: string
  name: string
  created_by: string
  created_by_role: string
  created_at: string
  thread_count: number
  last_thread_date: string | null
  group_id: string | null
  type: 'Public' | 'Private'
  group_type: string | null
  group_name: string | null
}

interface Thread {
  thread_id: string
  thread_title: string
  main_post_description: string | null
  created_at: string
  created_by_user_name: string | null
  total_posts: number
  last_post_created_at: string | null
}

export default function ForumThreadsPage() {
  const params = useParams()
  const router = useRouter()
  const forumId = params.id as string

  const [forum, setForum] = useState<Forum | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [threadTitle, setThreadTitle] = useState('')
  const [threadDescription, setThreadDescription] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingThread, setEditingThread] = useState<Thread | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isSavingThread, setIsSavingThread] = useState(false)
  const [isDeletingThread, setIsDeletingThread] = useState<string | null>(null)
  const [showEditForumDialog, setShowEditForumDialog] = useState(false)
  const [editForumName, setEditForumName] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEditForum = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/forums/edit-forum', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forum_id: forumId,
          forum_name: editForumName
        })
      })

      if (!response.ok) throw new Error('Failed to update forum')

      await fetchData()
      setShowEditForumDialog(false)
    } catch (err) {
      console.error('Error updating forum:', err)
      setError(err instanceof Error ? err.message : 'Failed to update forum')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteForum = async () => {
    if (!confirm('Are you sure you want to delete this forum? This will delete all threads and posts.')) return

    setIsDeleting(true)
    try {
      const response = await fetch('/api/administration/forums/delete-forum', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forum_id: forumId })
      })

      if (!response.ok) throw new Error('Failed to delete forum')

      router.push('/administration/forums')
    } catch (err) {
      console.error('Error deleting forum:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete forum')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCreateThread = async () => {
    if (!threadTitle || !threadDescription) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/forums/create-thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forum_id: forumId,
          thread_title: threadTitle,
          description: threadDescription
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create thread')
      }

      await fetchData()

      // Reset form
      setThreadTitle('')
      setThreadDescription('')
      setDialogOpen(false)
    } catch (err) {
      console.error('Error creating thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to create thread')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditThread = async () => {
    if (!editTitle.trim() || !editingThread) return

    setIsSavingThread(true)
    try {
      const response = await fetch('/api/administration/forums/edit-thread', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId: editingThread.thread_id,
          title: editTitle
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to edit thread')
      }

      await fetchData()
      
      // Reset edit state
      setEditingThread(null)
      setEditTitle('')
      setEditDialogOpen(false)
    } catch (err) {
      console.error('Error editing thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to edit thread')
    } finally {
      setIsSavingThread(false)
    }
  }

  const handleDeleteThread = async (threadId: string) => {
    if (!confirm('Are you sure you want to delete this thread? This will delete all posts in the thread.')) return

    setIsDeletingThread(threadId)
    try {
      const response = await fetch(`/api/administration/forums/delete-thread?thread_id=${threadId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete thread')
      }

      await fetchData()
    } catch (err) {
      console.error('Error deleting thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete thread')
    } finally {
      setIsDeletingThread(null)
    }
  }

  const fetchData = async () => {
    try {
      // Fetch forum details
      const forumResponse = await fetch(`/api/administration/forums/get-forums?forum_id=${forumId}`)
      if (!forumResponse.ok) {
        throw new Error('Failed to fetch forum details')
      }
      const forumData = await forumResponse.json()
      setForum(forumData[0])
      setEditForumName(forumData[0].name)

      // Fetch threads
      const threadsResponse = await fetch(`/api/administration/forums/get-threads?forum_id=${forumId}`)
      if (!threadsResponse.ok) {
        throw new Error('Failed to fetch threads')
      }
      const threadsData = await threadsResponse.json()
      setThreads(threadsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [forumId])

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

  if (!forum) {
    return <div className="text-center">Forum not found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push('/administration/forums')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Forums
      </Button>

      {/* Forum Details Card */}
      <Card className="w-full mb-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4">{forum.name}</h1>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Created by: {forum.created_by} ({forum.created_by_role})</p>
            <p>Type: {forum.type}</p>
            {forum.group_name && (
              <p>Group: {forum.group_name} ({forum.group_type})</p>
            )}
            <p>Total Threads: {forum.thread_count}</p>
            <p>Created: {formatDistanceToNow(new Date(forum.created_at))} ago</p>
            {forum.last_thread_date && (
              <p>Last activity: {formatDistanceToNow(new Date(forum.last_thread_date))} ago</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Dialog open={showEditForumDialog} onOpenChange={setShowEditForumDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowEditForumDialog(true)}
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
                  className="w-full" 
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
            onClick={handleDeleteForum}
            disabled={isDeleting}
          >
            {isDeleting ? (
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

      {/* Threads Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Threads</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              Create New Thread
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Thread Title</label>
                <Input
                  placeholder="Enter thread title"
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">First Post</label>
                <Textarea
                  placeholder="Enter Text"
                  value={threadDescription}
                  onChange={(e) => setThreadDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleCreateThread}
                disabled={isSubmitting || !threadTitle || !threadDescription}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Create Thread'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Thread</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Thread Title</label>
              <Input
                placeholder="Enter thread title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleEditThread}
              disabled={isSavingThread || !editTitle.trim()}
            >
              {isSavingThread ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {threads.map((thread) => (
          <Card 
            key={thread.thread_id} 
            className="w-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <CardContent className="pt-6 pb-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 transition-colors">
                    {thread.thread_title}
                  </h3>
                  {thread.main_post_description && (
                    <p className="line-clamp-2 text-gray-600 mb-6 text-base">
                      {thread.main_post_description}
                    </p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{thread.created_by_user_name}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      <span>{thread.total_posts} posts</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDistanceToNow(new Date(thread.created_at))} ago</span>
                    </div>
                    {thread.last_post_created_at && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Last post: {formatDistanceToNow(new Date(thread.last_post_created_at))} ago</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-2 bg-gray-50 py-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push(`/administration/forums/${forumId}/view-thread/${thread.thread_id}`)}
                className="hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-green-50"
                onClick={() => {
                  setEditingThread(thread)
                  setEditTitle(thread.thread_title)
                  setEditDialogOpen(true)
                }}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteThread(thread.thread_id)}
                disabled={isDeletingThread === thread.thread_id}
              >
                {isDeletingThread === thread.thread_id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Deleting...
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
