import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaCalendarCheck,
} from "react-icons/fa";
import NeonLoader from "../../NeonLoader";

const UserProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <NeonLoader size="default" overlay={false} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            User Profile
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-light/20 to-primary/20 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user?.photoURL || "https://i.ibb.co/7QZGsBD/avatar.png"}
                  alt="User Avatar"
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {user?.displayName || "User Name"}
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-primary-light mb-4">
                  <FaEnvelope className="text-sm sm:text-base" />
                  <span className="text-sm sm:text-base break-all">
                    {user?.email}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary-light/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    Active User
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-glow/30 hover:border-glow/60 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-lg flex items-center justify-center">
                      <FaCalendarCheck className="text-white text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-primary-light">
                      Agreement Date
                    </span>
                  </div>
                  <p className="text-white font-semibold pl-11">
                    {profile?.agreementDate || "Not Available"}
                  </p>
                </div>

                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-glow/30 hover:border-glow/60 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-white text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-primary-light">
                      Floor
                    </span>
                  </div>
                  <p className="text-white font-semibold pl-11">
                    {profile?.floor || "Not Assigned"}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-glow/30 hover:border-glow/60 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-dark to-primary-light rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-white text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-primary-light">
                      Block
                    </span>
                  </div>
                  <p className="text-white font-semibold pl-11">
                    {profile?.block || "Not Assigned"}
                  </p>
                </div>

                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-glow/30 hover:border-glow/60 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-primary-dark rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-white text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-primary-light">
                      Room Number
                    </span>
                  </div>
                  <p className="text-white font-semibold pl-11">
                    {profile?.apartmentNo || "Not Assigned"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
