import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts'
import { Users, GraduationCap, School, BookOpen, Building2, Users2, ShieldCheck, MessagesSquare, MessageCircle, MessageSquare, Loader2 } from 'lucide-react'
import AdministrationLayout from '@/components/layouts/AdminLayout'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        <p className="text-sm font-medium text-[#7C3AED]">Posts: {payload[0].value}</p>
        <p className="text-sm font-medium text-[#60A5FA]">Comments: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {

  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activityData] = useState([
    { date: '24 Apr', posts: 55, comments: 32 },
    { date: '25 Apr', posts: 73, comments: 41 },
    { date: '26 Apr', posts: 48, comments: 29 },
    { date: '27 Apr', posts: 92, comments: 56 },
    { date: '28 Apr', posts: 85, comments: 45 },
    { date: '29 Apr', posts: 32, comments: 18 },
    { date: '30 Apr', posts: 95, comments: 52 },
    { date: '1 May', posts: 42, comments: 28 },
    { date: '2 May', posts: 68, comments: 37 },
    { date: '3 May', posts: 27, comments: 15 },
    { date: '4 May', posts: 105, comments: 63 },
    { date: '5 May', posts: 45, comments: 25 },
    { date: '6 May', posts: 15, comments: 8 }
  ])

  const [threadData] = useState([
    { name: '30 Apr', classroom: 28, forum: 15 },
    { name: '1 May', classroom: 45, forum: 25 },
    { name: '2 May', classroom: 35, forum: 20 },
    { name: '3 May', classroom: 50, forum: 25 },
    { name: '4 May', classroom: 32, forum: 12 },
    { name: '5 May', classroom: 55, forum: 20 },
    { name: '6 May', classroom: 23, forum: 15 },
  ])

  const iconMap = {
    'Users': Users,
    'GraduationCap': GraduationCap,
    'BookOpen': BookOpen,
    'School': School,
    'Building2': Building2,
    'Users2': Users2,
    'ShieldCheck': ShieldCheck,
    'MessagesSquare': MessagesSquare,
    'MessageCircle': MessageCircle,
    'MessageSquare': MessageSquare
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/administration/get-stats')
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center relative mt-40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-pacifico text-sky-400 text-4xl">Welcome Back !</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = iconMap[item.icon]
          return (
            <Card key={index} className="shadow-sm border-[#fefefe] rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-gray-700 font-poppins">
                  {item.name}
                </CardTitle>
                <Icon className={`h-12 w-12 ${item.color} ${item.bgColor} p-3 rounded-xl`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="col-span-4 shadow-sm border-[#fefefe] rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-gray-600 font-poppins">Posts Activity Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={activityData}
                barGap={2}
                barSize={12}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="posts" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="comments" fill="#60A5FA" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm border-[#fefefe] rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-gray-600 font-poppins">Classroom Threads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threadData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="classroom" 
                    stroke="#FF8B3E"
                    strokeWidth={2}
                    dot={{ fill: "#FF8B3E" }}
                    fill="#FFF5EB"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-[#fefefe] rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-gray-600 font-poppins">Forum Threads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threadData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="forum" 
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={{ fill: "#60A5FA" }}
                    fill="#EFF6FF"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

DashboardPage.getLayout = (page) => <AdministrationLayout>{page}</AdministrationLayout>;