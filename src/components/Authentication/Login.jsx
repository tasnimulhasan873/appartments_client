import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import UseAuth from "../../hooks/UseAuth";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUser, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signUser(email, password);
      console.log("Logged in user:", result.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "This email is already registered with Google. Please use Google login instead."
        );
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md glass-dark rounded-3xl shadow-xl p-6 sm:p-8 animate-slideInUp">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-muted mb-8">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-secondary mb-2">
              Email Address
            </label>
            <FaEnvelope className="absolute left-3 top-11 text-muted" />
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border text-primary rounded-xl placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-secondary mb-2">
              Password
            </label>
            <FaLock className="absolute left-3 top-11 text-muted" />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border text-primary rounded-xl placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            {errors.password && (
              <p className="text-danger text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-secondary hover:text-white transition-all cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn-primary w-full ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <SocialLogin />
        </div>

        {/* Register Link */}
        <p className="text-sm text-center text-muted mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-secondary hover:text-white font-medium transition-all"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
