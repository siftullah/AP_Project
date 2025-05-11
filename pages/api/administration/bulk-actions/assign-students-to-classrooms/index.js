import { NextRequest, NextResponse } from 'next/server'
import { currentUser,auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
  await auth()
    // Get current user and their university_id from metadata
    const user = await currentUser()
    if (!(user?.publicMetadata['university_id'])) {
      return NextResponse.json({ error: 'University ID of authenticated user not found'  }, { status: 401 })
    }
    const universityId = user?.publicMetadata['university_id'] as string

    // Get form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const mappingsStr = formData.get('mappings') as string
    const mappings = JSON.parse(mappingsStr)

    // Read Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Record<string, string>[]

    // Skip header row and track failed rows
    const failedRows: Record<string, string>[] = []
    
    // Process each row starting from index 1 (skipping header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        // Extract mapped data
        const rollNo = row[mappings['Roll No']] as string
        const department = row[mappings['Department']] as string
        const courseCode = row[mappings['Course Code']] as string
        const batch = row[mappings['Batch']] as string
        const classroomName = row[mappings['Classroom Name']] as string
        const action = row[mappings['Action']] as string

        // Check if student exists
        const student = await prisma.student.findFirst({
          where: {
            roll_number: rollNo,
            department_batch: {
              department: {
                university_id: universityId
              }
            }
          }
        })

        if (!student) {
          throw new Error(`Student with roll number ${rollNo} not found`)
        }

        // Find department
        const dept = await prisma.department.findFirst({
          where: {
            university_id: universityId,
            name: department
          }
        })

        if (!dept) {
          throw new Error(`Department ${department} not found`)
        }

        // Find course
        const course = await prisma.course.findFirst({
          where: {
            dept_id: dept.id,
            course_code: courseCode
          }
        })

        if (!course) {
          throw new Error(`Course with code ${courseCode} not found in department ${department}`)
        }

        // Find batch
        const batchRecord = await prisma.batch.findFirst({
          where: {
            university_id: universityId,
            name: batch
          }
        })

        if (!batchRecord) {
          throw new Error(`Batch ${batch} not found`)
        }

        // Find classroom
        const classroom = await prisma.classroom.findFirst({
          where: {
            name: classroomName,
            course_id: course.id,
            batch_id: batchRecord.id
          }
        })

        if (!classroom) {
          throw new Error(`Classroom ${classroomName} not found`)
        }

        // Process based on action
        if (action.toLowerCase() === 'registered') {
          // Check if enrollment exists
          const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
              classroom_id_student_id: {
                classroom_id: classroom.id,
                student_id: student.id
              }
            }
          })

          if (!existingEnrollment) {
            // Create new enrollment
            await prisma.enrollment.create({
              data: {
                classroom_id: classroom.id,
                student_id: student.id
              }
            })
          }
        } else if (action.toLowerCase() === 'dropped') {
          // Check if enrollment exists and delete if found
          await prisma.enrollment.deleteMany({
            where: {
              classroom_id: classroom.id,
              student_id: student.id
            }
          })
        } else {
          throw new Error(`Invalid action: ${action}. Must be either 'registered' or 'dropped'`)
        }

      } catch (error) {
        console.error('Error processing row:', row, error)
        failedRows.push(row)
      }
    }

    await prisma.$disconnect()
    return NextResponse.json({ 
      success: true,
      failedRows: failedRows.length > 0 ? failedRows : undefined
    })

  } catch (error) {
    console.error('Error in assign-students-to-classrooms:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to process student classroom assignments' },
      { status: 500 }
    )
  }
}