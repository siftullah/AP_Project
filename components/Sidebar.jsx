"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { routes } from "@/pages/routes";
import { useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { signOut, user } = useClerk();
  const pathname = usePathname();

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      boxShadow: "10px 0 50px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      boxShadow: "none",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const navItemVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  const activeNavClass =
    "bg-blue-100 text-blue-800 border-l-4 border-blue-600 pl-3 font-semibold";

  const userName = user?.firstName || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen text-primary">
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="z-10 fixed inset-0 bg-black"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? "closed" : "open"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="z-20 fixed lg:relative flex flex-col bg-white border-r border-blue-100 w-72 min-h-screen"
      >
        <div className="flex justify-between items-center p-4 text-white">
          <Link href={`/${userType}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-blue-800/50 text-white"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <Link href="/student/profile" className="p-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-blue-200 w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/placeholder.svg"} />
              <AvatarFallback className="bg-blue-700 text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-blue-900">{userName}</p>
              <p className="text-blue-600 text-sm capitalize">{userType}</p>
            </div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
          <div className="mb-4 px-3">
            <p className="font-medium text-blue-400 text-xs uppercase tracking-wider">
              Main Menu
            </p>
          </div>
          {routes
            .filter(
              (route) =>
                route.showInSidebar &&
                (!route.userType || route.userType === userType)
            )
            .map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.path;

              return (
                <Link key={route.path} href={route.path}>
                  <motion.div whileHover="hover" variants={navItemVariants}>
                    <Button
                      variant="ghost"
                      className={`justify-start w-full mb-1 transition-all ${
                        isActive
                          ? activeNavClass
                          : "hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          className={`mr-3 w-5 h-5 ${
                            isActive ? "text-blue-700" : "text-blue-500"
                          }`}
                        />
                      )}
                      {route.title}
                    </Button>
                  </motion.div>
                </Link>
              );
            })}
        </nav>

        <div className="p-4 border-t border-blue-100">
          <Button
            variant="outline"
            className="justify-start hover:bg-blue-50 border-blue-200 hover:border-blue-300 w-full text-blue-700 hover:text-blue-800"
            onClick={() => signOut({ redirectUrl: "/sign-in" })}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Sidebar;
