import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Logo from "../components/SharedComponents/logo";
import { FiMenu, FiX } from "react-icons/fi";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut, user } = UseAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  return (
    <div className="min-h-screen bg-primary font-['Inter'] flex">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0 fixed left-0 top-0 h-full z-30">
        <DashboardSidebar onLogout={logOut} />
      </div>

      {/* YouTube-style Bottom Navigation for Mobile/Tablet */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleSidebarToggle}
          />

          {/* Bottom Sheet - Fixed and Responsive */}
          <div className="absolute bottom-0 left-0 right-0 z-50 bg-overlay backdrop-blur-lg border-t border-glow shadow-2xl rounded-t-3xl overflow-hidden">
            <div className="h-1 w-12 bg-white/30 rounded-full mx-auto mt-3 mb-2"></div>
            <div className="max-h-[75vh] min-h-[300px] overflow-y-auto scrollbar-hide">
              <DashboardSidebar
                onLogout={logOut}
                isBottomSheet={true}
                onNavigate={handleSidebarToggle}
              />
            </div>
          </div>
        </div>
      )}

      {/* Always visible bottom bar for mobile/tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 z-40 bg-overlay backdrop-blur-lg border-t border-glow shadow-xl">
        <div className="flex items-center justify-between h-full px-4">
          {/* Navigation Icons */}
          <div className="flex items-center gap-6 flex-1">
            <DashboardSidebar onLogout={logOut} isBottomNavigation={true} />
          </div>

          {/* User Profile/Logo on Right */}
          <div className="flex items-center gap-2">
            {/* Logo with home navigation - Consistent sizing */}
            <button
              onClick={() => navigate("/")}
              className="relative group p-2 rounded-full hover:bg-primary/20 transition-all"
            >
              <div className="text-xl text-primary-light">
                <Logo withText={false} size="sm" />
              </div>

              {/* Enhanced hover tooltip with user info */}
              <div className="absolute bottom-full mb-2 right-0 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-primary-light/30 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[60] pointer-events-none shadow-lg">
                <div className="text-center">
                  <div className="font-medium">
                    {user?.displayName || user?.email || "User"}
                  </div>
                  <div className="text-white/70 capitalize">
                    {role || "Guest"}
                  </div>
                  <div className="text-white/50 mt-1">Click to go home</div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </button>

            {/* Menu toggle button - Consistent sizing */}
            <button
              onClick={handleSidebarToggle}
              className="relative group flex items-center gap-2 p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U"}
                </span>
              </div>

              {/* Enhanced hover tooltip */}
              <div className="absolute bottom-full mb-2 right-0 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-primary-light/30 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[60] pointer-events-none shadow-lg">
                <div className="text-center">
                  <div className="font-medium">Open Menu</div>
                  <div className="text-white/70">Tap for navigation</div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative lg:ml-64 xl:ml-72 pb-16 lg:pb-0">
        {/* Content Area */}
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayouts;
