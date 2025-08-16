// src/hooks/useUserRole.js
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useUserRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // State to hold the user's role, loading state, and any error
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Wait for user to be fully authenticated
        if (user) {
          // Ensure user has a valid token
          await user.getIdToken();
        }

        console.log('Fetching role for user:', user.email);

        const response = await axiosSecure.get(
          `/users/role/${encodeURIComponent(user.email)}`
        );

        console.log('Role response:', response.data);
        setRole(response.data?.role || 'user');

      } catch (err) {
        console.error("Failed to fetch role", err);

        // Handle different error types
        if (err.response?.status === 404) {
          // User not found in database, set default role
          console.log('User not found in database, setting default role: user');
          setRole('user');
          setError(null); // Clear error for 404
        } else if (err.response?.status === 401) {
          // Unauthorized - token issue
          console.log('Unauthorized access, clearing role');
          setRole(null);
          setError('Authentication required');
        } else if (err.response?.status === 403) {
          // Forbidden - user exists but no permission
          console.log('Access forbidden, setting default role: user');
          setRole('user');
          setError(null);
        } else {
          // Other errors
          setRole('user'); // Set default role
          setError(err.response?.data?.error || err.message || "Error fetching role");
        }
      } finally {
        setLoading(false);
      }
    };

    // Add delay to ensure authentication is complete
    const timeoutId = setTimeout(fetchUserRole, 100);

    return () => clearTimeout(timeoutId);
  }, [user?.email, axiosSecure]);

  return { role, loading, error };
};

export default useUserRole;
