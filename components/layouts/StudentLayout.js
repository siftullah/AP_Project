import React from "react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function StudentLayout({ children }) {
  return (
    <>
      <Head>
        <title>Student Dashboard | EduAssist</title>
      </Head>
      <Sidebar userType="student">{children}</Sidebar>
    </>
  );
}
