"use client";

import React from "react";
import ForumCard from "@/components/ForumCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ForumList } from "@/app/types/forum";

const fetchForums = async (): Promise<ForumList> => {
  const { data } = await axios.get("/api/faculty/forums");
  return data;
};

const Forums = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["forums"],
    queryFn: fetchForums,
  });

  if (isLoading) {
    return <div className="px-4 sm:px-0 py-6">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-0 py-6">
      <div className="flex items-center mb-6">
        <h2 className="font-bold text-2xl">Current Forums</h2>
      </div>
      <ForumCard forums={data?.forums ?? []} />
    </div>
  );
};

export default Forums;
