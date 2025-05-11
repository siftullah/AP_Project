import React from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";

export default function StudentLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>Student Dashboard | EduAssist</title>
      </Head>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">{children}</div>
    </div>
  );
}
