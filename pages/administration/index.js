import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, School, BookOpen, Building2, Users2, ShieldCheck, MessagesSquare, MessageCircle, MessageSquare } from 'lucide-react'

export default function DashboardPage({ stats, error }) {

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
    </div>
  )
}

export async function getServerSideProps({ req }) {
  try {
    const response = await fetch(`http://localhost:3000/api/administration/get-stats`, {
      headers: {
        // Forward the authentication cookie from the request
        Cookie: req.headers.cookie || "",
      },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch stats')
    }
    const stats = await response.json()

    return {
      props: {
        stats,
        error: null
      }
    }
  } catch (err) {
    console.error('Error fetching stats:', err)
    return {
      props: {
        stats: [],
        error: err instanceof Error ? err.message : 'An error occurred'
      }
    }
  }
}