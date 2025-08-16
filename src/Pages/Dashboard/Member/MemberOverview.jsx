
import React from "react";
import { FiHome, FiCreditCard, FiAward } from "react-icons/fi";
import { BarChart, PieChart } from "../../../components/Charts/Charts";

const MemberOverview = () => {
  // Example member stats
  const stats = [
    { label: "My Apartments", value: 2, icon: <FiHome /> },
    { label: "Payments Made", value: 12, icon: <FiCreditCard /> },
    { label: "Coupons Used", value: 5, icon: <FiAward /> },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Member Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
      <div className="glass-dark rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Member Charts
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <BarChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    label: "Payments",
                    data: [2, 3, 1, 4, 2],
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
                labels: ["Used", "Unused"],
                datasets: [
                  {
                    label: "Coupons",
                    data: [5, 7],
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

export default MemberOverview;
