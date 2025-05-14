import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ForumCard from "@/components/ForumCard";
import Loader from "./_components/Loader";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Forums = ({ forumsData, error }) => {
  const router = useRouter();

  if (!forumsData && !error) {
    return <Loader />;
  }

  
  if (error) {
    return (
      <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto w-16 h-16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-7a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 text-xl">{error}</h3>
          <Button
            onClick={() => router.push("/student")}
            className="bg-blue-600 hover:bg-blue-700 mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const forums = forumsData.forums || [];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center gap-2 mb-4 font-bold text-gray-900 text-3xl"
          >
            <MessageCircle className="w-8 h-8 text-gray-700" />
            Current Forums
          </motion.h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ForumCard forums={forums} />
        </motion.div>
      </motion.div>
    </div>
  );
};


export async function getServerSideProps(context) {
  const { req } = context;

  try {
    
    const cookies = req.headers.cookie;

    if (!cookies) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    
    const response = await axios.get(
      `http://localhost:3000/api/student/forums`,
      {
        headers: {
          
          Cookie: cookies,
        },
      }
    );

    return {
      props: {
        forumsData: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching forums:", error);

    
    if (error.response?.status === 401) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    return {
      props: {
        forumsData: null,
        error: error.response?.data?.error || "Failed to fetch forums",
      },
    };
  }
}

export default Forums;
