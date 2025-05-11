'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UploadCloud } from 'lucide-react'
import * as XLSX from 'xlsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BulkActionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<{name: string, index: number}[]>([])
  const [selectedAction, setSelectedAction] = useState<string>("")
  const [columnMappings, setColumnMappings] = useState<{[key: string]: number}>({})
  const [failedRows, setFailedRows] = useState<any[]>([])
  const [showFailedRows, setShowFailedRows] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setHeaders([])
      setSelectedAction("")
      setColumnMappings({})
      setFailedRows([])
      setShowFailedRows(false)
    }
  }

  const handleUpload = async (action: string) => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file before uploading.",
        variant: "destructive",
      })
      return
    }
  
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const headerRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[]
        const headersWithIndex = headerRow.map((header, index) => ({
          name: header,
          index
        }))
        setHeaders(headersWithIndex)
        setSelectedAction(action)

        toast({
          title: "File processed",
          description: "Please map the columns to their corresponding fields.",
        })
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      toast({
        title: "File processing failed", 
        description: "An error occurred while reading the file.",
        variant: "destructive",
      })
    }
  }

  const handleSubmitMapping = async () => {
    if (!file || !selectedAction) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('mappings', JSON.stringify(columnMappings))

      const apiEndpoints: { [key: string]: string } = {
        "Teacher registration": "/api/administration/bulk-actions/create-teachers",
        "Student registration": "/api/administration/bulk-actions/create-students",
        "Classroom creation": "/api/administration/bulk-actions/create-classrooms",
        "Student assignment": "/api/administration/bulk-actions/assign-students-to-classrooms"
      }

      const response = await fetch(apiEndpoints[selectedAction], {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'API request failed')
      }

      if (data.failedRows && data.failedRows.length > 0) {
        setFailedRows(data.failedRows)
        setShowFailedRows(true)
        toast({
          title: "Upload Failed",
          description: `${data.failedRows.length} rows failed to process. Please review the errors below.`,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Upload Successful",
          description: `${selectedAction} data has been processed successfully.`,
        })
        // Reset form on success
        setFile(null)
        setHeaders([])
        setSelectedAction("")
        setColumnMappings({})
        setFailedRows([])
        setShowFailedRows(false)
      }
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your request.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setHeaders([])
    setSelectedAction("")
    setColumnMappings({})
    setFailedRows([])
    setShowFailedRows(false)
  }

  const renderMappingForm = () => {
    const requiredFields: { [key: string]: string[] } = {
      "Teacher registration": ["First Name", "Last Name", "Email", "Department", "Designation"],
      "Student registration": ["Roll No", "First Name", "Last Name", "Email", "Department", "Batch"],
      "Classroom creation": ["Classroom Name", "Course Name", "Course Code", "Department", "Batch", "Teacher Email"],
      "Student assignment": ["Roll No", "Classroom Name", "Course Code", "Batch", "Department", "Action"]
    }

    const fields = requiredFields[selectedAction] || []

    return (
      <div className="space-y-4 mt-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Map Columns for {selectedAction}</h3>
        {fields.map((field) => (
          <div key={field} className="grid grid-cols-2 gap-4 items-center">
            <Label>{field}:</Label>
            <Select
              value={columnMappings[field]?.toString()}
              onValueChange={(value) => setColumnMappings({...columnMappings, [field]: parseInt(value)})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header) => (
                  <SelectItem key={header.index} value={header.index.toString()}>
                    {header.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
        <div className="flex gap-4 mt-4">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSubmitMapping}
            disabled={Object.keys(columnMappings).length !== fields.length}
          >
            Process {selectedAction}
          </Button>
        </div>
      </div>
    )
  }

  const renderFailedRows = () => {
    if (!failedRows.length) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-600">Failed Rows</h2>
          <Button onClick={handleCancel}>
            Back to Upload Form
          </Button>
        </div>
        <p className="text-gray-600">
          {failedRows.length} rows failed to process. Please review the data below and try again.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(failedRows[0] || {}).map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {failedRows.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value: any, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-pacifico text-sky-400">Bulk Actions</h2>
      {showFailedRows ? (
        renderFailedRows()
      ) : (
        <div className="space-y-4">
          {!headers.length && (
            <>
              <div className="flex items-center justify-center w-full">
                <Label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Excel or CSV files (XLSX, XLS, CSV)</p>
                  </div>
                  <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
                </Label>
              </div>
              {file && <p className="text-sm text-gray-500">Selected file: {file.name}</p>}
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" onClick={(e) => {
                  e.preventDefault()
                  handleUpload("Teacher registration")
                }} disabled={!file}>
                  Upload Teachers
                </Button>
                <Button type="button" onClick={(e) => {
                  e.preventDefault()
                  handleUpload("Student registration")
                }} disabled={!file}>
                  Upload Students
                </Button>
                <Button type="button" onClick={(e) => {
                  e.preventDefault()
                  handleUpload("Classroom creation")
                }} disabled={!file}>
                  Create Classrooms
                </Button>
                <Button type="button" onClick={(e) => {
                  e.preventDefault()
                  handleUpload("Student assignment")
                }} disabled={!file}>
                  Assign Students to Classrooms
                </Button>
              </div>
            </>
          )}
          {headers.length > 0 && selectedAction && renderMappingForm()}
        </div>
      )}
    </div>
  )
}
