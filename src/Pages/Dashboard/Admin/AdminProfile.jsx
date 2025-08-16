import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaHome,
  FaUsers,
  FaDoorClosed,
  FaChartLine,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import NeonLoader from "../../../NeonLoader";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAdminStats = async () => {
    try {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      throw err;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
  });

  if (isLoading) {
    return <NeonLoader size="default" overlay={false} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <div className="bg-overlay backdrop-blur-lg rounded-2xl border border-glow shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Error Loading Data
          </h3>
          <p className="text-primary-light">
            Unable to load admin statistics. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const admin = data?.admin || {};
  const stats = data?.stats || {};

  const {
    totalRooms = 0,
    availableRooms = 0,
    agreementRooms = 0,
    totalUsers = 0,
    totalMembers = 0,
  } = stats;

  const percentAvailable = totalRooms
    ? ((availableRooms / totalRooms) * 100).toFixed(1)
    : 0;
  const percentAgreement = totalRooms
    ? ((agreementRooms / totalRooms) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
              <FaUser className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Admin Profile
              </h1>
              <p className="text-primary-light text-sm sm:text-base">
                Dashboard overview and statistics
              </p>
            </div>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></div>
        </div>

        {/* Admin Info Card */}
        <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative">
              <img
                src={admin.image || "https://i.ibb.co/1Ys6V1QZ/admin.webp"}
                alt="Admin Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                {admin.name || "Admin User"}
              </h2>
              <p className="text-primary-light text-sm sm:text-base mb-4">
                {admin.email || "admin@example.com"}
              </p>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary-light/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs sm:text-sm text-white font-medium">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            icon={<FaHome />}
            title="Total Rooms"
            value={totalRooms}
            gradient="from-primary-light to-primary"
            description="All apartment units"
          />
          <StatCard
            icon={<FaDoorClosed />}
            title="Available Rooms"
            value={`${percentAvailable}%`}
            gradient="from-green-400 to-green-600"
            description="Ready for occupancy"
          />
          <StatCard
            icon={<FaDoorClosed />}
            title="Occupied Rooms"
            value={`${percentAgreement}%`}
            gradient="from-orange-400 to-red-500"
            description="Under agreement"
          />
          <StatCard
            icon={<FaUsers />}
            title="Total Users"
            value={totalUsers}
            gradient="from-blue-400 to-blue-600"
            description="Registered users"
          />
          <StatCard
            icon={<FaUser />}
            title="Active Members"
            value={totalMembers}
            gradient="from-purple-400 to-primary-dark"
            description="Current members"
          />
          <StatCard
            icon={<FaChartLine />}
            title="Occupancy Rate"
            value={`${
              totalRooms ? ((agreementRooms / totalRooms) * 100).toFixed(0) : 0
            }%`}
            gradient="from-primary to-primary-dark"
            description="Overall occupancy"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, gradient, description }) => (
  <div className="bg-overlay backdrop-blur-lg rounded-2xl border border-glow shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:scale-105">
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white text-xl">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-primary-light text-sm mb-1">{title}</h3>
        <p className="text-white text-2xl font-bold mb-1">{value}</p>
        <p className="text-white/70 text-xs">{description}</p>
      </div>
    </div>
  </div>
);

export default AdminProfile;
