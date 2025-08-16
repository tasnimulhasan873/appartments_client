import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoutes = ({ children }) => {
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

  // Allowed admin routes
  const allowedAdminRoutes = [
    "/dashboard/adminProfile",
    "/dashboard/manage-members",
    "/dashboard/make-announcement",
    "/dashboard/agreement-requests",
    "/dashboard/manage-coupons",
    "/dashboard/manage-properties",
    
  ];

  // Allow only if user is admin and route is in allowed list
  if (role === "admin" && allowedAdminRoutes.includes(location.pathname)) {
    return children || <Outlet />;
  }

  // Block everyone else
  return <Navigate to="/forbidden" replace />;
};

export default AdminRoutes;
