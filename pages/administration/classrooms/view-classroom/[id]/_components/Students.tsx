'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check } from "lucide-react"

interface Student {
  user_id: string
  roll_number: string
  name: string
  is_enrolled: boolean
}

interface StudentsProps {
  classroomId: string
}

export default function Students({ classroomId }: StudentsProps) {
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([])
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/administration/classrooms/view-classroom/get-students?classroom_id=${classroomId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch students')
        }

        const data = await response.json()
        setEnrolledStudents(data.enrolled_students)
        setAllStudents(data.all_students)
        
        // Set initially selected students
        setSelectedStudents(data.all_students
          .filter((student: Student) => student.is_enrolled)
          .map((student: Student) => student.user_id)
        )

      } catch (err) {
        console.error('Error fetching students:', err)
        setError(err instanceof Error ? err.message : 'Failed to load students')
      }
    }

    fetchStudents()
  }, [classroomId])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          user_ids: selectedStudents
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update students')
      }

      // Refresh students list
      const studentsResponse = await fetch(`/api/administration/classrooms/view-classroom/get-students?classroom_id=${classroomId}`)
      const studentsData = await studentsResponse.json()
      setEnrolledStudents(studentsData.enrolled_students)
      setAllStudents(studentsData.all_students)
      setDialogOpen(false)

    } catch (err) {
      console.error('Error updating students:', err)
      setError(err instanceof Error ? err.message : 'Failed to update students')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Students
        </CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Manage Students</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Students</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label>Select Students</Label>
              <Command className="border mt-2 rounded-lg h-[300px] overflow-auto">
                <CommandInput placeholder="Search students..." />
                <CommandEmpty>No students found.</CommandEmpty>
                <CommandGroup>
                  {allStudents.map((student) => (
                    <CommandItem
                      key={student.user_id}
                      onSelect={() => {
                        setSelectedStudents(prev => 
                          prev.includes(student.user_id)
                            ? prev.filter(id => id !== student.user_id)
                            : [...prev, student.user_id]
                        )
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedStudents.includes(student.user_id) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span>{student.name}</span>
                        <span className="text-sm text-gray-500">Roll No: {student.roll_number}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Students"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {enrolledStudents.map((student) => (
            <div key={student.user_id} className="flex flex-col p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{student.name}</span>
              </div>
              <span className="text-sm text-gray-500 mt-1">Roll No: {student.roll_number}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
