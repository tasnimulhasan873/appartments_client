
import React from "react";
import { FiUsers, FiHome, FiDollarSign, FiBarChart2 } from "react-icons/fi";
import { BarChart, PieChart } from "../components/Charts/Charts";

const Overview = () => {
  // Example stats (replace with real data from API)
  const stats = [
    { label: "Total Users", value: 1200, icon: <FiUsers /> },
    { label: "Total Apartments", value: 350, icon: <FiHome /> },
    { label: "Total Revenue", value: "৳2,500,000", icon: <FiDollarSign /> },
    { label: "Active Agreements", value: 180, icon: <FiBarChart2 /> },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-dark rounded-2xl p-6 flex items-center gap-4 shadow-lg"
          >
            <div className="text-3xl text-secondary">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts/Graphs Section */}
      <div className="glass-dark rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-primary">Statistics & Trends</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <BarChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [500000, 600000, 550000, 700000, 650000],
                    backgroundColor: "#6366f1",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
          <div className="flex-1 min-h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <PieChart
              data={{
                labels: ["Active", "Inactive"],
                datasets: [
                  {
                    label: "Agreements",
                    data: [180, 20],
                    backgroundColor: ["#10b981", "#a5b4fc"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
