import axios from "axios";
import { FacultyDashboard } from "./_components/FacultyDashboard";
import FacultyLayout from "@/components/layouts/FacultyLayout";

const Home = ({ dashboardData, error }) => {
  // Error handling UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md">
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
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  return <FacultyDashboard data={dashboardData} />;
};

// Server-side rendering to fetch dashboard data
export async function getServerSideProps(context) {
  const { req } = context;

  try {
    // Get the cookie from the request headers
    const cookies = req.headers.cookie;

    if (!cookies) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    // Fetch dashboard data using axios from the server
    const response = await axios.get(
      `http://localhost:3000/api/faculty/dashboard`,
      {
        headers: {
          // Forward the authentication cookie from the request
          Cookie: cookies,
        },
      }
    );

    return {
      props: {
        dashboardData: response.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching faculty dashboard data:", error);

    // Handle unauthorized errors by redirecting to sign-in
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
        dashboardData: null,
        error: error.response?.data?.error || "Failed to fetch dashboard data",
      },
    };
  }
}

Home.getLayout = (page) => <FacultyLayout>{page}</FacultyLayout>;

export default Home;
