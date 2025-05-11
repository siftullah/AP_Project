import React from "react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/QueryProvider";

export default function StudentLayout({ children }) {
  return (
    <>
      <Head>
        <title>Student Dashboard | EduAssist</title>
      </Head>
      <Sidebar userType="student">
        <QueryProvider>{children}</QueryProvider>
      </Sidebar>
    </>
  );
}
