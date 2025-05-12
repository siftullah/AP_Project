import React, { useState, useEffect } from "react";
import ForumCard from "@/components/ForumCard";
import axios from "axios";

const Forums = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get("/api/faculty/forums");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching forums:", error);
        setIsLoading(false);
      }
    };

    fetchForums();
  }, []);

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
