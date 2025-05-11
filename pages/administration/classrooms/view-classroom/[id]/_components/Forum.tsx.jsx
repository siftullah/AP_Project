'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2, MessageCircle, Calendar, User, Clock, Loader2, ArrowLeft } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Thread from './Thread'

interface Thread {
  thread_id: string
  thread_title: string
  main_post_description: string | null
  created_at: string
  created_by_user_name: string | null
  total_posts: number
  last_post_created_at: string | null
}

interface ForumProps {
  classroomId: string
  threadType: string
}

export default function Forum({ classroomId, threadType }: ForumProps) {
  const router = useRouter()
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
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const handleCreateThread = async () => {
    if (!threadTitle || !threadDescription) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/create-thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          thread_title: threadTitle,
          description: threadDescription,
          thread_type: threadType
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create thread')
      }

      await fetchThreads()

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
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-thread', {
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

      await fetchThreads()
      
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
      const response = await fetch(`/api/administration/classrooms/view-classroom/delete-thread?thread_id=${threadId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete thread')
      }

      await fetchThreads()
    } catch (err) {
      console.error('Error deleting thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete thread')
    } finally {
      setIsDeletingThread(null)
    }
  }

  const fetchThreads = async () => {
    try {
      const response = await fetch(`/api/administration/classrooms/view-classroom/get-threads?classroom_id=${classroomId}&thread_type=${threadType}`)
      if (!response.ok) {
        throw new Error('Failed to fetch threads')
      }
      const data = await response.json()
      setThreads(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreads()
  }, [classroomId, threadType])

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

  if (selectedThreadId) {
    return (
      <div>
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => setSelectedThreadId(null)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Threads
        </Button>
        <Thread classroomId={classroomId} threadId={selectedThreadId} />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center space-y-6">
        <h2 className="text-xl font-bold">Threads</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Thread</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Thread Title</Label>
                <Input
                  placeholder="Enter thread title"
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>First Post</Label>
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
              <Label>Thread Title</Label>
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

      <div className="space-y-2">
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
                onClick={() => setSelectedThreadId(thread.thread_id)}
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
