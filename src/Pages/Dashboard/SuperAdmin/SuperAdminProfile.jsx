import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCrown,
  FaCheckCircle,
} from "react-icons/fa";

const SuperAdminProfile = () => {
  const { user } = UseAuth();

  const permissions = [
    "Full User Management",
    "Property Management",
    "System Configuration",
    "Analytics Access",
    "Database Control",
    "Security Settings",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <FaCrown className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Super Admin Profile
              </h1>
              <p className="text-amber-200 text-sm sm:text-base">
                Highest level system access and control
              </p>
            </div>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 p-6 sm:p-8 lg:p-10 text-center">
            <div className="relative inline-block">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="Super Admin Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-amber-400/50 shadow-2xl object-cover mx-auto"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <FaCrown className="text-white text-lg" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-4 mb-2">
              {user?.displayName || "Super Admin"}
            </h2>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30">
              <FaCrown className="text-amber-400 mr-2" />
              <span className="text-amber-200 font-semibold text-sm sm:text-base">
                Super Administrator
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Personal Information */}
              <div className="bg-primary/10 rounded-2xl p-6 border border-glow/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Personal Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-overlay/50 rounded-xl p-4">
                    <label className="block text-primary-light text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <p className="text-white font-semibold">
                      {user?.displayName || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-overlay/50 rounded-xl p-4">
                    <label className="block text-primary-light text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-primary-light text-sm" />
                      <p className="text-white font-semibold break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="bg-overlay/50 rounded-xl p-4">
                    <label className="block text-primary-light text-sm font-medium mb-1">
                      Role
                    </label>
                    <p className="text-white font-semibold">
                      Super Administrator
                    </p>
                  </div>

                  <div className="bg-overlay/50 rounded-xl p-4">
                    <label className="block text-primary-light text-sm font-medium mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-semibold text-sm">
                        Active & Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Permissions */}
              <div className="bg-primary/10 rounded-2xl p-6 border border-glow/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    System Permissions
                  </h3>
                </div>

                <div className="space-y-3">
                  {permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-overlay/50 rounded-lg hover:bg-overlay/70 transition-all"
                    >
                      <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                      <span className="text-white font-medium">
                        {permission}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Admin Stats */}
                <div className="mt-6 pt-6 border-t border-glow/30">
                  <h4 className="text-white font-semibold mb-3">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-overlay/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-primary-light">
                        100%
                      </div>
                      <div className="text-xs text-white/70">Access Level</div>
                    </div>
                    <div className="bg-overlay/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-400">∞</div>
                      <div className="text-xs text-white/70">Permissions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 lg:mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-red-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-bold mb-2">
                    Security Notice
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    As a Super Administrator, you have unrestricted access to
                    all system functions. Please use these privileges
                    responsibly and ensure account security at all times.
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

export default SuperAdminProfile;
