import React from "react";
import Head from "next/head";

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin area.</p>
      </div>
    </>
  );
}
