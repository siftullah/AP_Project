import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prisma = new PrismaClient()
  
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated User" })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user?.publicMetadata['university_id']) {
      return res.status(401).json({ error: 'University ID of authenticated user not found' })
    }
    const universityId = user.publicMetadata['university_id']

    // Get form data
    const formData = await req.formData()
    const file = formData.get('file')
    const mappingsStr = formData.get('mappings')
    const mappings = JSON.parse(mappingsStr)

    // Read Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Skip header row and track failed rows
    const failedRows = []
    
    // Process each row starting from index 1 (skipping header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        // Extract mapped data
        const classroomName = row[mappings['Classroom Name']]
        const courseName = row[mappings['Course Name']]
        const courseCode = row[mappings['Course Code']]
        const department = row[mappings['Department']]
        const batch = row[mappings['Batch']]
        const teacherEmail = row[mappings['Teacher Email']]

        // Check if teacher exists
        const teacher = await prisma.user.findFirst({
          where: {
            email_address: teacherEmail,
            role: 'faculty'
          }
        })

        if (!teacher) {
          throw new Error(`Teacher with email ${teacherEmail} not found`)
        }

        // Find or create department
        const dept = await prisma.department.upsert({
          where: {
            university_id_name: {
              university_id: universityId,
              name: department,
            },
          },
          create: {
            university_id: universityId,
            name: department,
            groups: {
              create: {
                group: {
                  create: {
                    name: `${department} Group`,
                    type: 'department'
                  }
                }
              }
            }
          },
          update: {},
        })

        // Find or create batch with associated group
        const batchRecord = await prisma.batch.upsert({
          where: {
            university_id_name: {
              university_id: universityId,
              name: batch,
            },
          },
          create: {
            university_id: universityId,
            name: batch,
          },
          update: {},
        })

        // Create group and batch group if batch was just created
        const existingBatchGroup = await prisma.batchGroup.findUnique({
          where: {
            batch_id: batchRecord.id
          }
        })

        if (!existingBatchGroup) {
          const group = await prisma.group.create({
            data: {
              name: `${batch} Group`,
              type: 'batch',
              batch: {
                create: {
                  batch_id: batchRecord.id
                }
              }
            }
          })
        }

        // Find or create department batch record
        await prisma.departmentBatches.upsert({
          where: {
            dept_id_batch_id: {
              dept_id: dept.id,
              batch_id: batchRecord.id,
            },
          },
          create: {
            dept_id: dept.id,
            batch_id: batchRecord.id,
          },
          update: {},
        })

        // Create or find course
        const course = await prisma.course.upsert({
          where: {
            dept_id_course_code: {
              dept_id: dept.id,
              course_code: courseCode
            }
          },
          create: {
            dept_id: dept.id,
            course_name: courseName,
            course_code: courseCode
          },
          update: {}
        })

        // Create classroom
        const classroom = await prisma.classroom.create({
          data: {
            name: classroomName,
            course_id: course.id,
            batch_id: batchRecord.id
          }
        })

        // Add teacher to classroom
        await prisma.classroomTeachers.create({
          data: {
            classroom_id: classroom.id,
            user_id: teacher.id,
            type: 'faculty'
          }
        })

      } catch (error) {
        console.error('Error processing row:', row, error)
        failedRows.push(row)
      }
    }

    await prisma.$disconnect()
    return res.json({ 
      success: true,
      failedRows: failedRows.length > 0 ? failedRows : undefined
    })

  } catch (error) {
    console.error('Error in create-classrooms:', error)
    await prisma.$disconnect()
    return res.status(500).json({ error: 'Failed to process classroom creation' })
  }
}