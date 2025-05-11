import { useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/Administration/layout/Sidebar"
import Header  from "@/components/Administration/layout/Header"
import { Toaster } from "@/components/ui/toaster"

// import "../../styles/globals.css";

export default function AdministrationLayout({ children }) 
{
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Head>
        <title>EduAssist | Administration</title>
        <meta name="description" content="EduAssist Administration Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen bg-slate-50">
        { showSidebar && (<Sidebar />)}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setShowSidebar={setShowSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  )
}
