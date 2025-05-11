import { NextRequest, NextResponse } from 'next/server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const client = await clerkClient()
  
  try {
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
        const firstName = row[mappings['First Name']] as string
        const lastName = row[mappings['Last Name']] as string
        const email = row[mappings['Email']] as string
        const department = row[mappings['Department']] as string
        const designation = row[mappings['Designation']] as string

        // Generate 10 digit random password
        const randomPassword = Math.random().toString(36).slice(-10)

        // Create Clerk user
        const clerkUser = await client.users.createUser({
          emailAddress: [email],
          firstName,
          lastName,
          password: randomPassword,
        })

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

        // Create user record
        await prisma.user.create({
          data: {
            id: clerkUser.id,
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            role: 'faculty',
            university_id: universityId,
          },
        })

        // Create faculty record
        const faculty = await prisma.faculty.create({
          data: {
            user_id: clerkUser.id,
            dept_id: dept.id,
            designation,
          },
        })

        // Update Clerk user metadata
        await client.users.updateUserMetadata(clerkUser.id, {
          publicMetadata: {
            role: 'faculty',
            university_id: universityId,
            faculty_id: faculty.id,
          },
        })

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
    console.error('Error in create-teachers:', error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: 'Failed to process teacher registration' },
      { status: 500 }
    )
  }
}