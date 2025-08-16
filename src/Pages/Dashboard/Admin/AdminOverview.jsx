import React, { useEffect, useState } from "react";
import { FiUserCheck, FiHome, FiClipboard } from "react-icons/fi";
import { BarChart, PieChart } from "../../../components/Charts/Charts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import NeonLoader from "../../../NeonLoader";
import { Navigate } from "react-router-dom";

const iconMap = {
  "Managed Properties": <FiHome />,
  "Pending Requests": <FiClipboard />,
  "Active Members": <FiUserCheck />,
};

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [barChart, setBarChart] = useState(null);
  const [pieChart, setPieChart] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/admin/overview")
      .then((res) => {
        setStats(res.data.stats);
        setBarChart(res.data.barChart);
        setPieChart(res.data.pieChart);
        setRole(res.data.role); // Assuming the role is also fetched from the API
      })
      .catch(() => {
        setStats([]);
        setBarChart(null);
        setPieChart(null);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <NeonLoader size="default" overlay={false} />;
  if (role !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-dark rounded-2xl p-6 flex items-center gap-4 shadow-lg"
          >
            <div className="text-3xl text-secondary">{iconMap[stat.label]}</div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-dark rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Admin Charts
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            {barChart && (
              <BarChart
                data={barChart}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            )}
          </div>
          <div className="flex-1 min-h-[250px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            {pieChart && (
              <PieChart
                data={pieChart}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
