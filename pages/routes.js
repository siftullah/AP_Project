import {
  BookOpen,
  MessageSquare,
  Megaphone,
  FileText,
  Bell,
  LayoutDashboard,
  Clock,
} from "lucide-react";

export const routes = [
  {
    path: "/student",
    title: "Classes",
    icon: BookOpen,
    showInSidebar: true,
    userType: "student",
  },
  {
    path: "/student/discussions",
    title: "Discussions",
    icon: MessageSquare,
    showInSidebar: true,
    userType: "student",
  },
  {
    path: "/student/announcements",
    title: "Announcements",
    icon: Megaphone,
    showInSidebar: true,
    userType: "student",
  },
  {
    path: "/student/announcements/:announcementId",
    title: "Announcements",
    userType: "student",
  },
  {
    path: "/student/forums",
    title: "Forums",
    icon: Bell,
    showInSidebar: true,
    userType: "student",
  },
  { path: "/student/classes/:classId", title: "Class", userType: "student" },
  {
    path: "/student/discussions/create",
    title: "Discussion",
    userType: "student",
  },
  {
    path: "/student/discussions/:discussionId",
    title: "Discussion",
    userType: "student",
  },
  { path: "/student/forums/create", title: "Forum", userType: "student" },
  {
    path: "/student/classes/:classId/create-post",
    title: "Class Post",
    userType: "student",
  },
  { path: "/student/profile", title: "Profile", userType: "student" },
  {
    path: "/faculty",
    title: "Dashboard",
    icon: LayoutDashboard,
    showInSidebar: true,
    userType: "faculty",
  },
  {
    path: "/faculty/classes",
    title: "Classes",
    icon: BookOpen,
    showInSidebar: true,
    userType: "faculty",
  },
  {
    path: "/faculty/classes/:classId",
    title: "Class Details",
    userType: "faculty",
  },
  {
    path: "/faculty/assignments",
    title: "Assignments",
    icon: FileText,
    showInSidebar: true,
    userType: "faculty",
  },
  {
    path: "/faculty/assignments/create",
    title: "Assignment",
    userType: "faculty",
  },
  {
    path: "/faculty/profile",
    title: "Profile",
    userType: "faculty",
  },
  {
    path: "/faculty/students",
    title: "Students",
    userType: "faculty",
  },
  {
    path: "/faculty/discussions",
    title: "Discussions",
    icon: MessageSquare,
    userType: "faculty",
    showInSidebar: true,
  },
  {
    path: "/faculty/discussions/create",
    title: "Discussion",
    userType: "faculty",
  },
  {
    path: "/faculty/discussions/:discussionId",
    title: "Discussion",
    userType: "faculty",
  },
  {
    path: "/faculty/announcements/:announcementId",
    title: "Announcements",
    userType: "faculty",
  },
  {
    path: "/faculty/forums",
    title: "Forums",
    icon: Bell,
    userType: "faculty",
    showInSidebar: true,
  },
  {
    path: "/faculty/forums/create",
    title: "Forum",
    userType: "faculty",
  },
  {
    path: "/faculty/announcements",
    title: "Announcements",
    icon: Megaphone,
    userType: "faculty",
    showInSidebar: true,
  },
  {
    path: "/student/forums/:forumId",
    title: "Forum",
    userType: "student",
  },
  {
    path: "/faculty/forums/:forumId",
    title: "Forum",
    userType: "faculty",
  },
  {
    path: "/student/assignments/:assignmentId",
    title: "Assignment",
    userType: "student",
  },
  {
    path: "/faculty/assignments/:assignmentId",
    title: "Assignment",
    userType: "faculty",
  },
  {
    path: "/student/reminders",
    title: "Reminders",
    icon: Clock,
    showInSidebar: true,
    userType: "student",
  },
  {
    path: "/faculty/reminders",
    title: "Reminders",
    icon: Clock,
    showInSidebar: true,
    userType: "faculty",
  },
  // Add more routes as needed
];

export const getPageTitle = (pathname) => {
  const dynamicRoute = routes.find(
    (route) =>
      route.path.includes(":") && pathname.startsWith(route.path.split(":")[0])
  );
  if (dynamicRoute) {
    return dynamicRoute.title;
  }
  const route = routes.find((r) => r.path === pathname);
  return route ? route.title : "Page Not Found";
};
