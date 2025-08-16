import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaUsers,
  FaFileAlt,
  FaBullhorn,
  FaTicketAlt,
  FaMoneyCheckAlt,
  FaHistory,
  FaUserCircle,
  FaClipboardList,
  FaExclamationCircle,
  FaGift,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaKey,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import Logo from "../components/SharedComponents/logo";
import useUserRole from "../hooks/useUserRole";
import UseAuth from "../hooks/UseAuth";

const sidebarLinks = [
  // Super Admin links (highest level access)
  {
    to: "/dashboard/superadmin-overview",
    icon: <FaChartLine />,
    label: "Overview",
    roles: ["superAdmin"],
  },
  {
    to: "/dashboard/superAdminProfile",
    icon: <FaUser />,
    label: "Super Admin Profile",
    roles: ["superAdmin"],
  },
  {
    to: "/dashboard/all-users",
    icon: <FaUsers />,
    label: "All Users",
    roles: ["superAdmin"],
  },
  {
    to: "/dashboard/all-properties",
    icon: <FaBuilding />,
    label: "All Properties",
    roles: ["superAdmin"],
  },
  {
    to: "/dashboard/system-settings",
    icon: <FaCog />,
    label: "Full System Settings",
    roles: ["superAdmin"],
  },
  {
    to: "/dashboard/website-analytics",
    icon: <FaChartLine />,
    label: "Website Analytics",
    roles: ["superAdmin"],
  },

  // Admin links
  {
    to: "/dashboard/admin-overview",
    icon: <FaChartLine />,
    label: "Overview",
    roles: ["admin"],
  },
  {
    to: "/dashboard",
    icon: <FaHome />,
    label: "Dashboard Home",
    roles: ["admin"],
  },
  {
    to: "/dashboard/adminProfile",
    icon: <FaUser />,
    label: "Admin Profile",
    roles: ["admin"],
  },
  {
    to: "/dashboard/manage-members",
    icon: <FaUsers />,
    label: "Manage Members",
    roles: ["admin"],
  },
  {
    to: "/dashboard/manage-properties",
    icon: <FaBuilding />,
    label: "Manage Properties",
    roles: ["admin"],
  },
  {
    to: "/dashboard/make-announcement",
    icon: <FaBullhorn />,
    label: "Make Announcement",
    roles: ["admin"],
  },
  {
    to: "/dashboard/agreement-requests",
    icon: <FaKey />,
    label: "Agreement Requests",
    roles: ["admin"],
  },
  {
    to: "/dashboard/manage-coupons",
    icon: <FaGift />,
    label: "Manage Coupons",
    roles: ["admin"],
  },

  // User links
  {
    to: "/dashboard/user-overview",
    icon: <FaChartLine />,
    label: "Overview",
    roles: ["user"],
  },
  {
    to: "/dashboard/userProfile",
    icon: <FaUserCircle />,
    label: "User Profile",
    roles: ["user"],
  },
  {
    to: "/dashboard/userAnnouncement",
    icon: <FaClipboardList />,
    label: "Announcements",
    roles: ["user"],
  },
  {
    to: "/dashboard/favorites",
    icon: <FaExclamationCircle />,
    label: "Favorite Properties",
    roles: ["user"],
  },
  {
    to: "/dashboard/rental-history",
    icon: <FaHistory />,
    label: "Rental History",
    roles: ["user"],
  },

  // Member links
  {
    to: "/dashboard/member-overview",
    icon: <FaChartLine />,
    label: "Overview",
    roles: ["member"],
  },
  {
    to: "/dashboard/memberProfile",
    icon: <FaUser />,
    label: "Member Profile",
    roles: ["member"],
  },
  {
    to: "/dashboard/memberAnnouncement",
    icon: <FaClipboardList />,
    label: "Announcements",
    roles: ["member"],
  },
  {
    to: "/dashboard/makePayment",
    icon: <FaMoneyCheckAlt />,
    label: "Make Payment",
    roles: ["member"],
  },
  {
    to: "/dashboard/paymentHistory",
    icon: <FaHistory />,
    label: "Payment History",
    roles: ["member"],
  },
];

const DashboardSidebar = ({
  onLogout,
  isBottomSheet,
  isBottomNavigation,
  onNavigate,
}) => {
  const { role, loading } = useUserRole();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = UseAuth();

  const toggleCollapse = () => setCollapsed(!collapsed);

  if (loading) {
    return (
      <aside
        className={`bg-overlay backdrop-blur-lg border-r border-glow shadow-xl h-full flex flex-col p-6 ${
          isBottomSheet
            ? "w-full"
            : isBottomNavigation
            ? "flex-1 flex-row p-0"
            : collapsed
            ? "w-20 min-w-[80px]"
            : "w-64 min-w-[220px]"
        }`}
      >
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 rounded-lg w-10 h-10 animate-pulse"></div>
            <div className="h-4 bg-primary/20 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-primary/20 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        <div className="mt-8 h-12 bg-primary/20 rounded-lg animate-pulse"></div>
      </aside>
    );
  }

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(role)
  );

  // YouTube-style bottom navigation for mobile/tablet
  if (isBottomNavigation) {
    return (
      <div className="flex items-center justify-between w-full h-full px-2">
        {/* Navigation Icons with equal spacing */}
        <div className="flex items-center justify-between w-full max-w-sm">
          {filteredLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative group flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${
                  isActive
                    ? "text-primary-light"
                    : "text-white/70 hover:text-white"
                }`
              }
            >
              {() => (
                <>
                  <span className="text-xl mb-1">{link.icon}</span>

                  {/* Enhanced tooltip for small screens */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-primary-light/30 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[60] pointer-events-none shadow-lg">
                    <div className="text-center">
                      <div className="font-medium">{link.label}</div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                  </div>
                </>
              )}
            </NavLink>
          ))}

          {/* More button if there are more links */}
          {filteredLinks.length > 4 && (
            <button className="relative group flex flex-col items-center justify-center p-2 text-white/70 hover:text-white transition-all min-w-[60px]">
              <span className="text-xl mb-1">⋯</span>

              {/* Enhanced hover tooltip for More button */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-primary-light/30 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[60] pointer-events-none shadow-lg">
                <div className="text-center">
                  <div className="font-medium">More Options</div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Bottom sheet view for expanded navigation
  if (isBottomSheet) {
    return (
      <div className="w-full h-full flex flex-col p-4">
        {/* User Profile Header - No Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-light to-primary w-12 h-12 rounded-full flex items-center justify-center">
              <span className="font-bold text-white text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-white">
                {user?.displayName || user?.email || "User"}
              </h3>
              <p className="text-sm text-white/70 capitalize">{role}</p>
            </div>
          </div>
        </div>

        {/* All Navigation Links - Responsive Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6 w-full">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all aspect-square ${
                  isActive
                    ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-md"
                    : "text-white/90 hover:bg-primary/20 hover:text-white"
                }`
              }
            >
              {() => (
                <>
                  <span className="text-xl sm:text-2xl mb-1 sm:mb-2">
                    {link.icon}
                  </span>

                  {/* Always show label in bottom sheet */}
                  <span className="text-xs text-center leading-tight max-w-full truncate px-1">
                    {link.label.length > 10
                      ? link.label.split(" ")[0]
                      : link.label}
                  </span>

                  {/* Full label on hover for truncated text */}
                  {link.label.length > 10 && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-overlay border border-glow text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {link.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 font-medium transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    );
  }

  // Regular sidebar for desktop
  return (
    <aside
      className={`bg-overlay backdrop-blur-lg border-r border-glow shadow-xl h-full flex flex-col transition-all duration-300 ${
        collapsed ? "w-20 min-w-[80px]" : "w-64 min-w-[220px]"
      }`}
    >
      {/* Logo & User Profile */}
      <div className="p-4 border-b border-glow/50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full">
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="text-2xl text-primary-light">
                  <Logo withText={true} size="sm" />
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <div className="text-2xl text-primary-light">
                  <Logo withText={false} size="sm" />
                </div>
              </div>
            )}

            <button
              onClick={toggleCollapse}
              className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300"
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {!collapsed && user && (
            <div className="flex items-center gap-3 w-full mt-4 p-3 bg-primary/20 rounded-lg border border-glow/50">
              <div className="bg-gradient-to-br from-primary-light to-primary w-10 h-10 rounded-full flex items-center justify-center">
                <span className="font-bold text-white">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-white text-sm truncate max-w-[140px]">
                  {user.displayName || user.email || "User"}
                </h3>
                <p className="text-xs text-white/70 capitalize">{role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className={`flex-1 overflow-y-auto py-4 px-2 ${
          isBottomSheet ? "max-h-[400px]" : ""
        }`}
      >
        <ul
          className={`space-y-1 ${
            isBottomSheet ? "grid grid-cols-2 gap-2" : ""
          }`}
        >
          {filteredLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-md"
                      : "text-white/90 hover:bg-primary/20 hover:text-white"
                  } focus:outline-none focus:ring-2 focus:ring-primary-light ${
                    isBottomSheet ? "flex-col text-center text-sm" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-all ${
                        isActive ? "text-white" : "text-primary-light"
                      } ${isBottomSheet ? "text-lg" : ""}`}
                    >
                      {link.icon}
                    </span>
                    {!collapsed && (
                      <span className={isBottomSheet ? "text-xs mt-1" : ""}>
                        {link.label}
                      </span>
                    )}

                    {collapsed && !isBottomSheet && (
                      <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-primary-light/30 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-[60] whitespace-nowrap">
                        <div className="font-medium">{link.label}</div>
                        {/* Arrow */}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95"></div>
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div
        className={`${isBottomSheet ? "p-2" : "p-4"} border-t border-glow/50`}
      >
        <button
          onClick={onLogout}
          className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-primary/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
            collapsed || isBottomSheet ? "px-3" : ""
          } ${isBottomSheet ? "flex-col text-sm" : ""}`}
        >
          <FaSignOutAlt
            className={`${isBottomSheet ? "text-lg" : "text-xl"}`}
          />
          {!collapsed &&
            (isBottomSheet ? (
              <span className="text-xs mt-1">Logout</span>
            ) : (
              "Logout"
            ))}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
