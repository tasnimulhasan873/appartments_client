import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaSearch,
  FaUserShield,
  FaUser,
  FaUserTie,
  FaTrash,
  FaCrown,
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaMobile,
  FaDesktop,
  FaTabletAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import NeonLoader from "../../../NeonLoader";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const {
    data: users = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        console.log("Users fetched:", res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  const handleRoleChange = async (userId, newRole) => {
    if (!userId) {
      Swal.fire("Error!", "Invalid user ID.", "error");
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Change User Role?",
        text: `Are you sure you want to change this user's role to ${newRole}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
        refetch();
        Swal.fire("Success!", "User role has been updated.", "success");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update user role.",
        "error"
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      Swal.fire("Error!", "Invalid user ID.", "error");
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Delete User?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/users/${userId}`);
        refetch();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    } catch {
      console.error("Error deleting user");
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "superAdmin":
        return <FaCrown className="text-purple-500" />;
      case "admin":
        return <FaUserShield className="text-blue-500" />;
      case "member":
        return <FaUserTie className="text-green-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "superAdmin":
        return "bg-purple-600 text-purple-100";
      case "admin":
        return "bg-blue-600 text-blue-100";
      case "member":
        return "bg-green-600 text-green-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        <NeonLoader overlay={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-primary-light/30 max-w-md">
          <div className="text-red-400 text-4xl sm:text-5xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Error Loading Users
          </h2>
          <p className="text-gray-300 mb-6">
            {error.response?.data?.message ||
              error.message ||
              "Failed to load users"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-lg hover:from-primary hover:to-primary-dark transition-all duration-300 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-primary-light/30 max-w-md">
          <FaUsers className="text-6xl text-primary-light mx-auto mb-4 opacity-50" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            No Users Found
          </h2>
          <p className="text-gray-300">No users have been registered yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-primary-light/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-gradient-to-r from-primary-light to-primary rounded-full">
                <FaUsers className="text-2xl sm:text-3xl text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  All Users
                </h1>
                <p className="text-primary-light text-sm sm:text-base">
                  Manage all system users ({users.length} total)
                </p>
              </div>
            </div>

            {/* Device indicators */}
            <div className="flex items-center gap-2 text-white/60">
              <FaMobile className="text-sm sm:hidden" />
              <FaTabletAlt className="text-sm hidden sm:block lg:hidden" />
              <FaDesktop className="text-sm hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-primary-light/20 to-primary/20 backdrop-blur-sm border border-primary-light/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-light mb-1">
                {users.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                Total Users
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1">
                {users.filter((u) => u.role === "admin").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Admins</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 mb-1">
                {users.filter((u) => u.role === "member").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Members</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-1">
                {users.filter((u) => u.role === "user" || !u.role).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Regular</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 border border-primary-light/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-all duration-300 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 bg-gray-800/80 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-all duration-300 text-sm sm:text-base"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Mobile/Tablet Cards View */}
        <div className="block lg:hidden">
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-primary-light/20 hover:border-primary-light/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.name || "User"}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-primary-light/30"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg">
                        {user.name || "Unknown User"}
                      </h3>
                      <p className="text-gray-400 text-sm break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(
                        user.role
                      )}`}
                    >
                      {user.role || "user"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium">
                      Joined Date
                    </label>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                      <FaCalendarAlt className="text-gray-500" />
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium">
                      Status
                    </label>
                    <div className="text-green-400 text-sm mt-1 font-medium">
                      Active
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <select
                    className="px-3 py-2 bg-gray-700/80 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300 flex-1 mr-3"
                    value={user.role || "user"}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="superAdmin">Super Admin</option>
                  </select>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-300"
                    title="Delete User"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-light/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={user.photoURL || "/default-avatar.png"}
                              alt={user.name || "User"}
                              className="w-10 h-10 rounded-full object-cover border-2 border-primary-light/30"
                              onError={(e) => {
                                e.target.src = "/default-avatar.png";
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-gray-800 rounded-full"></div>
                          </div>
                          <div>
                            <span className="text-white font-medium block">
                              {user.name || "Unknown User"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        <span className="break-all">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeClass(
                              user.role
                            )}`}
                          >
                            {user.role || "user"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            className="px-3 py-1 bg-gray-700/80 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300"
                            value={user.role || "user"}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                          >
                            <option value="user">User</option>
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all duration-300"
                            title="Delete User"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {(searchTerm || roleFilter !== "all") && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mt-6 border border-primary-light/10">
            <div className="flex items-center justify-between text-gray-300 text-sm">
              <span>
                Showing {filteredUsers.length} of {users.length} users
                {searchTerm && ` for "${searchTerm}"`}
                {roleFilter !== "all" && ` with role "${roleFilter}"`}
              </span>
              {(searchTerm || roleFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setRoleFilter("all");
                  }}
                  className="text-primary-light hover:text-primary transition-colors px-3 py-1 rounded-lg hover:bg-primary-light/10"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (searchTerm || roleFilter !== "all") && (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 text-center border border-primary-light/20 mt-6">
            <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-lg hover:from-primary hover:to-primary-dark transition-all duration-300 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
