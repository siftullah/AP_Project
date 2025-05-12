import axios from "axios";
import { FacultyDashboard } from "./_components/FacultyDashboard";

const FacultyPage = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return <FacultyDashboard data={data} />;
};

export async function getServerSideProps(context) {
  const { req } = context;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/faculty/dashboard",
      {
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}

export default FacultyPage;
