'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Users, GraduationCap, Building2, School } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Students from './_components/Students'
import Forum from './_components/Forum'

interface ClassroomDetails {
  classroom_id: string
  classroom_name: string 
  course_id: string
  course_name: string
  course_code: string
  department_name: string
  batch_id: string
  batch_name: string
  student_count: number
}

interface Teacher {
  user_id: string
  name: string
  is_classroom_teacher: boolean
  classroom_teacher_id?: string
}

interface TeachersByDepartment {
  [department: string]: Teacher[]
}

interface Student {
  user_id: string
  name: string
  is_classroom_teacher: boolean
  classroom_teacher_id?: string
}

interface StudentsByDepartment {
  [department: string]: Student[]
}

export default function ViewClassroomPage() {
  const params = useParams()
  const router = useRouter()
  const classroomId = params.id as string

  const [classroom, setClassroom] = useState<ClassroomDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teachers, setTeachers] = useState<TeachersByDepartment>({})
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [teachingAssistants, setTeachingAssistants] = useState<StudentsByDepartment>({})
  const [selectedTAs, setSelectedTAs] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [taDialogOpen, setTaDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classroomResponse, teachersResponse, tasResponse] = await Promise.all([
          fetch(`/api/administration/classrooms/view-classroom/get-classroom-details?classroom_id=${classroomId}`),
          fetch(`/api/administration/classrooms/view-classroom/get-teachers?classroom_id=${classroomId}`),
          fetch(`/api/administration/classrooms/view-classroom/get-teaching-assistants?classroom_id=${classroomId}`)
        ])

        if (!classroomResponse.ok || !teachersResponse.ok || !tasResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const classroomData = await classroomResponse.json()
        const teachersData = await teachersResponse.json()
        const tasData = await tasResponse.json()

        setClassroom(classroomData)
        setTeachers(teachersData.faculty_by_department)
        setTeachingAssistants(tasData.students_by_department)
        
        // Set initially selected teachers
        const initialSelectedTeachers = Object.values(teachersData.faculty_by_department)
          .flat()
          .filter((teacher: Teacher) => teacher.is_classroom_teacher)
          .map((teacher: Teacher) => teacher.user_id)
        setSelectedTeachers(initialSelectedTeachers)

        // Set initially selected TAs
        const initialSelectedTAs = Object.values(tasData.students_by_department)
          .flat()
          .filter((student: Student) => student.is_classroom_teacher)
          .map((student: Student) => student.user_id)
        setSelectedTAs(initialSelectedTAs)

      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [classroomId])

  const handleSubmitTeachers = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          user_ids: selectedTeachers
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update teachers')
      }

      // Refresh teachers list
      const teachersResponse = await fetch(`/api/administration/classrooms/view-classroom/get-teachers?classroom_id=${classroomId}`)
      const teachersData = await teachersResponse.json()
      setTeachers(teachersData.faculty_by_department)
      setDialogOpen(false)

    } catch (err) {
      console.error('Error updating teachers:', err)
      setError(err instanceof Error ? err.message : 'Failed to update teachers')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitTAs = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/administration/classrooms/view-classroom/edit-teaching-assistants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classroom_id: classroomId,
          user_ids: selectedTAs
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update teaching assistants')
      }

      // Refresh TAs list
      const tasResponse = await fetch(`/api/administration/classrooms/view-classroom/get-teaching-assistants?classroom_id=${classroomId}`)
      const tasData = await tasResponse.json()
      setTeachingAssistants(tasData.students_by_department)
      setTaDialogOpen(false)

    } catch (err) {
      console.error('Error updating teaching assistants:', err)
      setError(err instanceof Error ? err.message : 'Failed to update teaching assistants')
    } finally {
      setIsSubmitting(false)
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

  if (!classroom) {
    return <div className="text-center">Classroom not found</div>
  }

  const currentTeachers = Object.values(teachers)
    .flat()
    .filter((teacher: Teacher) => teacher.is_classroom_teacher)

  const currentTAs = Object.values(teachingAssistants)
    .flat()
    .filter((student: Student) => student.is_classroom_teacher)

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push('/administration/classrooms')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Classrooms
      </Button>

      <Card className="w-full shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            {classroom.classroom_name}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {/* Course Information Card */}
            <Card className="bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                  <BookOpen className="h-5 w-5" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm text-gray-500">Course Name</p>
                  <p className="font-medium">{classroom.course_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Course Code</p>
                  <p className="font-medium">{classroom.course_code}</p>
                </div>
              </CardContent>
            </Card>

            {/* Department Information Card */}
            <Card className="bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                  <Building2 className="h-5 w-5" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-sm text-gray-500">Department Name</p>
                  <p className="font-medium">{classroom.department_name}</p>
                </div>
              </CardContent>
            </Card>

            {/* Batch Information Card */}
            <Card className="bg-purple-50/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                  <GraduationCap className="h-5 w-5" />
                  Batch Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm text-gray-500">Batch Name</p>
                  <p className="font-medium">{classroom.batch_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student Count</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <p className="font-medium">{classroom.student_count} Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teachers Card */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teachers
              </CardTitle>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Manage Teachers</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Manage Teachers</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label>Select Teachers</Label>
                    <Command className="border mt-2 rounded-lg">
                      <CommandInput placeholder="Search teachers..." />
                      <CommandEmpty>No teachers found.</CommandEmpty>
                      {Object.entries(teachers).map(([department, departmentTeachers]) => (
                        <CommandGroup key={department} heading={department}>
                          {departmentTeachers.map((teacher: Teacher) => (
                            <CommandItem
                              key={teacher.user_id}
                              onSelect={() => {
                                setSelectedTeachers(prev => 
                                  prev.includes(teacher.user_id)
                                    ? prev.filter(id => id !== teacher.user_id)
                                    : [...prev, teacher.user_id]
                                )
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedTeachers.includes(teacher.user_id) ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {teacher.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </Command>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitTeachers} disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Teachers"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {currentTeachers.map((teacher: Teacher) => (
                  <div key={teacher.user_id} className="flex items-center gap-2 p-2 border rounded-lg">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{teacher.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teaching Assistants Card */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <School className="h-5 w-5" />
                Teaching Assistants
              </CardTitle>
              <Dialog open={taDialogOpen} onOpenChange={setTaDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Manage Teaching Assistants</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Manage Teaching Assistants</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label>Select Teaching Assistants</Label>
                    <Command className="border mt-2 rounded-lg">
                      <CommandInput placeholder="Search students..." />
                      <CommandEmpty>No students found.</CommandEmpty>
                      {Object.entries(teachingAssistants).map(([department, students]) => (
                        <CommandGroup key={department} heading={department}>
                          {students.map((student: Student) => (
                            <CommandItem
                              key={student.user_id}
                              onSelect={() => {
                                setSelectedTAs(prev => 
                                  prev.includes(student.user_id)
                                    ? prev.filter(id => id !== student.user_id)
                                    : [...prev, student.user_id]
                                )
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedTAs.includes(student.user_id) ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {student.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </Command>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitTAs} disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Teaching Assistants"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {currentTAs.map((ta: Student) => (
                  <div key={ta.user_id} className="flex items-center gap-2 p-2 border rounded-lg">
                    <School className="h-4 w-4 text-gray-500" />
                    <span>{ta.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white">
          <TabsTrigger value="announcements" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Announcements
          </TabsTrigger>
          <TabsTrigger value="forum" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Forum
          </TabsTrigger>
          <TabsTrigger value="students" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="announcements">
        <Forum classroomId={params.id.toString()} threadType="announcement" />
        </TabsContent>
        <TabsContent value="forum">
        <Forum classroomId={params.id.toString()} threadType="general" />
        </TabsContent>
        <TabsContent value="students">
          <Students classroomId={params.id.toString()} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
