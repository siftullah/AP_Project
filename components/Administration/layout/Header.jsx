import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2, Menu } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export default function Header({ setShowSidebar }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user } = useUser()
  const { signOut } = useClerk()

  if (isLoggingOut) {
    return (
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <h1 className="text-xl font-semibold text-slate-900">Logging out</h1>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-300">
      <div className="h-16 flex justify-between items-center px-2 sm:px-6 lg:px-8">
        <Button
          variant="ghost" 
          size="icon"
          onClick={() => setShowSidebar(prev => !prev)}
          className="hover:bg-blue-50 bg-blue-50 rounded-full h-10 w-10 [&_svg]:size-6"
        >
          <Menu className="h-12! w-12! text-blue-400" />
        </Button>

        <div className="flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:text-slate-900 focus:outline-none">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={`/${user?.id}_profile.jpg`} 
                    alt={user?.firstName || "User"} 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {user?.firstName?.[0] || "A"}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-base text-slate-700">{user ? (user.firstName + ' ' + user.lastName) : "User"}</div>
                  <div className="text-sm text-slate-500">Administrator</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-white border border-slate-200 p-0 rounded-xl">
              <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={`/${user?.id}_profile.jpg`} 
                    alt={user?.firstName || "User"} 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {user?.firstName?.[0] || "A"}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-slate-900">
                    {user ? (user.firstName + ' ' + user.lastName) : "User"}
                  </span>
                  <span className="text-sm text-slate-500">Administrator</span>
                </div>
              </div>

              <div className="p-2">
                <DropdownMenuItem className="flex items-center p-2 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="bg-orange-500/10 rounded-lg p-2">
                      <User2 className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-medium">Profile</span>
                      <span className="text-sm text-slate-500">Your profile Setting</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>

              <div className="p-2 bg-slate-50 mt-1 rounded-b-xl">
                <DropdownMenuItem 
                  className="flex items-center p-2 rounded-lg cursor-pointer"
                  onClick={async () => {
                    setIsLoggingOut(true);
                    await signOut({ redirectUrl: '/' });
                  }}
                >
                  <div className="flex items-center gap-3 text-red-600">
                    <div className="bg-red-50 rounded-lg p-2">
                      <LogOut className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-base font-medium">Logout</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
