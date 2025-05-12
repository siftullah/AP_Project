import React from "react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function StudentLayout({ children }) {
  return (
    <>
      <Head>
        <title>Faculty Dashboard | EduAssist</title>
      </Head>
      <Sidebar userType="faculty">{children}</Sidebar>
    </>
  );
}
