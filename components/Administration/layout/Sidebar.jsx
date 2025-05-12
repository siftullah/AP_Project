import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { cn } from "@/lib/utils"
import { Home, BookOpen, Users, UserCog, MessageSquare, School, Layers, FileSpreadsheet, LogOut } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"

const sidebarSections = [
  {
    title: null,
    items: [
      { icon: Home, label: "Dashboard", href: "/administration" },
    ]
  },
  {
    title: "User Management",
    items: [
      { icon: UserCog, label: "Roles", href: "/administration/roles" },
      { icon: Users, label: "Administrators", href: "/administration/administrators" },
      { icon: Users, label: "Faculty", href: "/administration/faculty" },
      { icon: Users, label: "Students", href: "/administration/students" },
    ]
  },
  {
    title: "Academic Structure", 
    items: [
      { icon: School, label: "Departments", href: "/administration/departments" },
      { icon: Layers, label: "Batches", href: "/administration/batches" },
      { icon: BookOpen, label: "Courses", href: "/administration/courses" },
      { icon: School, label: "Classrooms", href: "/administration/classrooms" },
    ]
  },
  {
    title: "Discussions",
    items: [
      { icon: Users, label: "Groups", href: "/administration/groups" },
      { icon: MessageSquare, label: "Forums", href: "/administration/forums" },
    ]
  }
]

function SidebarItem({ item, pathname }) {
  const Icon = item.icon
  const isActive = pathname === item.href
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative",
        isActive 
          ? "text-blue-700 bg-blue-50 shadow-sm" 
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r" />
      )}
      <Icon className={cn(
        "h-5 w-5 flex-shrink-0",
        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
      )} />
      {item.label}
    </Link>
  )
}

function SidebarSection({ title, items, pathname }) {
  return (
    <div className="mb-5">
      {title && (
        <div className="px-3 mb-1.5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h2>
        </div>
      )}
      <div className="space-y-0.5">
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
    </div>
  )
}

function LogoutButton() {
  const { signOut } = useClerk()
  return (
    <div className="px-3 pt-2">
      <Button 
        variant="outline" 
        className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        onClick={() => signOut({ redirectUrl: '/' })}
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">Logout</span>
      </Button>
    </div>
  )
}

export default function Sidebar() {
  const router = useRouter()
  const pathname = router.pathname
  return (
    <div className="bg-white w-64 min-h-screen py-5 flex flex-col">
      <div className="px-6 mb-5">
        <div className="flex items-center w-full">
          <div className="relative w-full h-10">
            <Image
              src="/fyp-logo.png"
              alt="EduAssist Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3">
        {sidebarSections.map((section, index) => (
          <SidebarSection
            key={section.title || index}
            title={section.title}
            items={section.items}
            pathname={pathname}
          />
        ))}
      </nav>
      <LogoutButton />
    </div>
  )
}