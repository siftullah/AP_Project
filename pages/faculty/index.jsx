;

import { useState, useEffect } from "react";
import axios from "axios";
import { FacultyDashboard } from "./_components/FacultyDashboard";

const FacultyPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/faculty/dashboard");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return <FacultyDashboard data={data} />;
};

export default FacultyPage;
