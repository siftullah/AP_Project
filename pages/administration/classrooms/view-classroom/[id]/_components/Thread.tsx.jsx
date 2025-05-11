'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Pencil, Trash2, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

interface Thread {
  thread_id: string
  thread_title: string
  created_at: string
  created_by_user_name: string | null
  total_posts: number
  last_post_created_at: string | null
}

interface Post {
  post_id: string
  description: string
  created_at: string
  created_by: {
    name: string
    role: string
  }
  attachments: {
    id: string
    filename: string
    filepath: string
  }[]
}

interface ThreadProps {
  classroomId: string
  threadId: string
}

export default function Thread({ classroomId, threadId }: ThreadProps) {
  const router = useRouter()
  const [thread, setThread] = useState<Thread | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [editingThread, setEditingThread] = useState(false)
  const [editThreadTitle, setEditThreadTitle] = useState('')
  const [isSavingThread, setIsSavingThread] = useState(false)
  const [isSavingPost, setIsSavingPost] = useState(false)
  const [isDeletingThread, setIsDeletingThread] = useState(false)
  const [isDeletingPost, setIsDeletingPost] = useState<string | null>(null)

  const fetchThreadAndPosts = async () => {
    try {
      // Fetch thread details
      const threadResponse = await fetch(`/api/administration/classrooms/view-classroom/get-threads?classroom_id=${classroomId}&thread_id=${threadId}`)
      if (!threadResponse.ok) {
        throw new Error('Failed to fetch thread details')
      }
      const threadData = await threadResponse.json()
      setThread(threadData[0])

      // Fetch posts
      const postsResponse = await fetch(`/api/administration/classrooms/view-classroom/get-posts?thread_id=${threadId}`)
      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts')
      }
      const postsData = await postsResponse.json()
      setPosts(postsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreadAndPosts()
  }, [classroomId, threadId])

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          description: replyContent
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to post reply')
      }

      await fetchThreadAndPosts()
      setReplyContent('')
    } catch (err) {
      console.error('Error posting reply:', err)
      setError(err instanceof Error ? err.message : 'Failed to post reply')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditPost = async (postId: string) => {
    if (!editContent.trim()) return

    setIsSavingPost(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          description: editContent
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to edit post')
      }

      await fetchThreadAndPosts()
      setEditingPostId(null)
      setEditContent('')
    } catch (err) {
      console.error('Error editing post:', err)
      setError(err instanceof Error ? err.message : 'Failed to edit post')
    } finally {
      setIsSavingPost(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setIsDeletingPost(postId)
    try {
      const response = await fetch(`/api/administration/classrooms/view-classroom/delete-post?post_id=${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      await fetchThreadAndPosts()
    } catch (err) {
      console.error('Error deleting post:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    } finally {
      setIsDeletingPost(null)
    }
  }

  const handleEditThread = async () => {
    if (!editThreadTitle.trim()) return

    setIsSavingThread(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-thread', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          title: editThreadTitle
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to edit thread')
      }

      await fetchThreadAndPosts()
      setEditingThread(false)
      setEditThreadTitle('')
    } catch (err) {
      console.error('Error editing thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to edit thread')
    } finally {
      setIsSavingThread(false)
    }
  }

  const handleDeleteThread = async () => {
    if (!confirm('Are you sure you want to delete this thread?')) return

    setIsDeletingThread(true)
    try {
      const response = await fetch(`/api/administration/classrooms/view-classroom/delete-thread?thread_id=${threadId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete thread')
      }

      router.push(`/administration/classrooms/view-classroom/${classroomId}`)
    } catch (err) {
      console.error('Error deleting thread:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete thread')
    } finally {
      setIsDeletingThread(false)
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

  if (!thread) {
    return <div className="text-center">Thread not found</div>
  }

  return (
    <div className="container mx-auto">

      {/* Thread Details Card */}
      <Card className="w-full mb-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardContent className="pt-6">
          {editingThread ? (
            <div>
              <Textarea
                value={editThreadTitle}
                onChange={(e) => setEditThreadTitle(e.target.value)}
                className="mb-2"
                placeholder="Enter new thread title"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleEditThread}
                  disabled={!editThreadTitle.trim() || isSavingThread}
                >
                  {isSavingThread ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEditingThread(false)
                    setEditThreadTitle('')
                  }}
                  disabled={isSavingThread}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-bold mb-4">{thread.thread_title}</h1>
          )}
          <div className="space-y-2 text-sm text-gray-600">
            <p>Created by: {thread.created_by_user_name}</p>
            <p>Total Posts: {thread.total_posts}</p>
            <p>Created: {formatDistanceToNow(new Date(thread.created_at))} ago</p>
            {thread.last_post_created_at && (
              <p>Last activity: {formatDistanceToNow(new Date(thread.last_post_created_at))} ago</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-gray-50 py-4">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-green-50"
            onClick={() => {
              setEditingThread(true)
              setEditThreadTitle(thread.thread_title)
            }}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:bg-red-50"
            onClick={handleDeleteThread}
            disabled={isDeletingThread}
          >
            {isDeletingThread ? (
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

      {/* Posts Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Posts</h2>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.post_id} className="w-full">
            <CardContent className="pt-6">
              {editingPostId === post.post_id ? (
                <div>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="mb-2"
                    placeholder="Edit your post..."
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleEditPost(post.post_id)}
                      disabled={!editContent.trim() || isSavingPost}
                    >
                      {isSavingPost ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save'
                      )}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditingPostId(null)
                        setEditContent('')
                      }}
                      disabled={isSavingPost}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mb-4">{post.description}</p>
                  <div className="text-sm text-gray-600">
                    <p>Posted by: {post.created_by.name} ({post.created_by.role})</p>
                    <p>{formatDistanceToNow(new Date(post.created_at))} ago</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-gray-50">
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-green-50"
                onClick={() => {
                  setEditingPostId(post.post_id)
                  setEditContent(post.description)
                }}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 hover:bg-red-50"
                onClick={() => handleDeletePost(post.post_id)}
                disabled={isDeletingPost === post.post_id}
              >
                {isDeletingPost === post.post_id ? (
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

      {/* Reply Form */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
          <Textarea
            placeholder="Write your reply here..."
            className="min-h-[150px] mb-4"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button 
            onClick={handleSubmitReply}
            disabled={isSubmitting || !replyContent.trim()}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Replying...
              </>
            ) : (
              'Post Reply'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
