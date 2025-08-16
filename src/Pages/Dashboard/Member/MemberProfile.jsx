import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import {
  FaUser,
  FaHome,
  FaCalendar,
  FaDollarSign,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import NeonLoader from "../../../NeonLoader";

const MemberProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: agreement = {}, isLoading } = useQuery({
    queryKey: ["agreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
              <FaUser className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Member Profile
              </h1>
              <p className="text-primary-light text-sm sm:text-base">
                Your membership details and apartment information
              </p>
            </div>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden mb-6 sm:mb-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-light/20 to-primary/20 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={user?.photoURL || "/default-user.png"}
                  alt="Member Avatar"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {user?.displayName || "Member Name"}
                </h2>
                <p className="text-primary-light text-sm sm:text-base mb-4">
                  {user?.email}
                </p>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary-light/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    Active Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="p-6 sm:p-8">
            {agreement?.status === "checked" ? (
              <div className="space-y-6">
                {/* Agreement Status */}
                <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <FaCheckCircle className="text-green-400 text-xl" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Agreement Active
                    </h3>
                    <p className="text-green-400 text-sm">
                      Your rental agreement is confirmed and active
                    </p>
                  </div>
                </div>

                {/* Agreement Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Agreement Date */}
                  <div className="bg-primary/10 rounded-xl p-5 border border-glow/30 hover:border-glow/60 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-primary rounded-lg flex items-center justify-center">
                        <FaCalendar className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-primary-light">
                        Agreement Date
                      </span>
                    </div>
                    <p className="text-white font-semibold pl-11">
                      {new Date(
                        agreement?.acceptedAt || agreement?.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Rent Amount */}
                  <div className="bg-primary/10 rounded-xl p-5 border border-glow/30 hover:border-glow/60 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <FaDollarSign className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-primary-light">
                        Monthly Rent
                      </span>
                    </div>
                    <p className="text-white font-semibold pl-11">
                      ৳{agreement.rent} BDT
                    </p>
                  </div>

                  {/* Floor */}
                  <div className="bg-primary/10 rounded-xl p-5 border border-glow/30 hover:border-glow/60 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                        <FaBuilding className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-primary-light">
                        Floor
                      </span>
                    </div>
                    <p className="text-white font-semibold pl-11">
                      {agreement.floor}
                    </p>
                  </div>

                  {/* Block */}
                  <div className="bg-primary/10 rounded-xl p-5 border border-glow/30 hover:border-glow/60 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-dark to-primary-light rounded-lg flex items-center justify-center">
                        <FaBuilding className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-primary-light">
                        Block
                      </span>
                    </div>
                    <p className="text-white font-semibold pl-11">
                      {agreement.block}
                    </p>
                  </div>

                  {/* Room Number */}
                  <div className="bg-primary/10 rounded-xl p-5 border border-glow/30 hover:border-glow/60 transition-all md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-primary-dark rounded-lg flex items-center justify-center">
                        <FaHome className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-primary-light">
                        Apartment Number
                      </span>
                    </div>
                    <p className="text-white font-semibold pl-11">
                      {agreement.apartmentNo}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-light/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-primary-light text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Active Agreement
                </h3>
                <p className="text-primary-light/80">
                  You don't have any accepted rental agreements yet. Please
                  contact the admin to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
