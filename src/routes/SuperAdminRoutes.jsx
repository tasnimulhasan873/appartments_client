import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";

const SuperAdminRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, loading: roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allowed super admin routes
  const allowedSuperAdminRoutes = [
    "/dashboard/superAdminProfile",
    "/dashboard/all-users",
    "/dashboard/all-properties",
    "/dashboard/system-settings",
    "/dashboard/website-analytics",
  ];

  // Allow only if user is superAdmin and route is in allowed list
  if (
    role === "superAdmin" &&
    allowedSuperAdminRoutes.includes(location.pathname)
  ) {
    return children || <Outlet />;
  }

  // Block everyone else
  return <Navigate to="/forbidden" replace />;
};

export default SuperAdminRoutes;
