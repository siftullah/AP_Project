import React from "react";
import ForumCard from "@/components/ForumCard";
import axios from "axios";

const Forums = ({ data }) => {
  return (
    <div className="px-4 sm:px-0 py-6">
      <div className="flex items-center mb-6">
        <h2 className="font-bold text-2xl">Current Forums</h2>
      </div>
      <ForumCard forums={data?.forums ?? []} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/faculty/forums",
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching forums:", error);
    return {
      props: {
        data: { forums: [] },
      },
    };
  }
}

export default Forums;
