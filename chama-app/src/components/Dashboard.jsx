import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader"; // Loading component
import { Line } from "react-chartjs-2"; // Chart.js example
import { Chart as ChartJS } from "chart.js/auto"; // Required for React Chart.js 2

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating data fetching with setTimeout
    setTimeout(() => {
      setData({
        savings: 1500,
        members: 5,
        progress: [12, 15, 22, 25, 30, 45], // Example progress over months
        monthlySavings: [100, 200, 300, 150, 500],
      });
      setLoading(false); // Turn off loading after data is fetched
    }, 2000); // Simulated 2 seconds delay
  }, []);

  // Chart data for savings progress
  const progressChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Progress Over Time",
        data: data ? data.progress : [], // Ensure data is available
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Group Dashboard</h1>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <div>
          {/* Skeleton loader placeholders */}
          <SkeletonLoader count={3} height={40} width="80%" />
          <SkeletonLoader count={2} height={200} width="100%" />
        </div>
      ) : (
        <div>
          <div className="stats">
            <h2>Total Savings: ${data.savings}</h2>
            <h3>Number of Members: {data.members}</h3>
          </div>

          {/* Savings progress chart */}
          <div className="analytics">
            <h3>Group Savings Progress</h3>
            <Line data={progressChartData} />
          </div>

          {/* Monthly savings breakdown */}
          <div className="monthly-savings">
            <h3>Monthly Savings</h3>
            <ul>
              {data.monthlySavings.map((saving, index) => (
                <li key={index}>
                  <strong>{`Month ${index + 1}:`}</strong> {saving} units saved
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
