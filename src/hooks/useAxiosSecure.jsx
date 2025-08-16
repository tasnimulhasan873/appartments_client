import axios from "axios";
import UseAuth from "./UseAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `https://b11a12-server-side.vercel.app`,
  timeout: 10000,
});

const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor to add token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        console.log("Making request to:", config.baseURL + config.url);
        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token added to request headers");
          } catch (error) {
            console.error("Error getting token:", error);
          }
        } else {
          console.log("No user found, making request without token");
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        console.log("Response received:", response.status, response.data);
        return response;
      },
      async (error) => {
        console.error("Response error:", error.response?.status, error.message);
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Authentication error, logging out...");
          await logOut();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
