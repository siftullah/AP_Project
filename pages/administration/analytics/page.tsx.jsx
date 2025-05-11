'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const enrollmentData = [
  { year: '2018', students: 1200 },
  { year: '2019', students: 1350 },
  { year: '2020', students: 1500 },
  { year: '2021', students: 1650 },
  { year: '2022', students: 1800 },
]

const graduationData = [
  { year: '2018', rate: 85 },
  { year: '2019', rate: 87 },
  { year: '2020', rate: 86 },
  { year: '2021', rate: 88 },
  { year: '2022', rate: 90 },
]

const departmentPerformance = [
  { name: 'CS', performance: 92 },
  { name: 'EE', performance: 88 },
  { name: 'ME', performance: 85 },
  { name: 'CE', performance: 87 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-pacifico text-sky-400">Analytics</h2>
      <Tabs defaultValue="enrollment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="graduation">Graduation Rate</TabsTrigger>
          <TabsTrigger value="performance">Department Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="enrollment">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment Over Time</CardTitle>
              <CardDescription>Yearly student enrollment from 2018 to 2022</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graduation">
          <Card>
            <CardHeader>
              <CardTitle>Graduation Rate Trends</CardTitle>
              <CardDescription>Yearly graduation rates from 2018 to 2022</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graduationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Overall performance score by department</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

