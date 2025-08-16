import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const MemberRoutes = ({ children }) => {
  const { role, loading } = useUserRole();

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (role !== "member") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default MemberRoutes;
