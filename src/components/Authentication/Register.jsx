import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import UseAuth from "../../hooks/UseAuth";
import SocialLogin from "./SocialLogin/SocialLogin";
import useAxios from "../../hooks/UseAxios";

const Register = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = UseAuth();
  const navigate = useNavigate();
  const imgbb_api_key = "ec38464868721c33778fd355631a2d69";

  const axiosInstance = useAxios(); // Not used for now

  const onSubmit = async (data) => {
    try {
      // 1. Upload image
      const imageFile = data.photo?.[0];
      if (!imageFile) {
        toast.error("Please select a profile photo.");
        return;
      }
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        throw new Error("Image upload failed (network)");
      }

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = uploadData.data.display_url;

      // 2. Create user
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // 3. Update Firebase profile
      await updateProfile(user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // 4. Sync to backend (commented for now)

      await axiosInstance.post("/users", {
        email: user.email,
        name: data.name,
        photoURL: imageUrl,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md glass-dark rounded-3xl shadow-xl p-6 sm:p-8 animate-slideInUp">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
          Create Account
        </h2>
        <p className="text-center text-muted mb-8">Join our community today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...formRegister("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-surface border border-border text-primary rounded-xl placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            {errors.name && (
              <p className="text-danger text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...formRegister("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-surface border border-border text-primary rounded-xl placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              {...formRegister("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-surface border border-border text-primary rounded-xl placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            {errors.password && (
              <p className="text-danger text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...formRegister("photo", {
                required: "Profile photo is required",
              })}
              className="w-full px-4 py-3 bg-surface border border-border text-primary rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-white file:cursor-pointer hover:file:bg-opacity-80 transition-all"
            />
            {errors.photo && (
              <p className="text-danger text-xs mt-1">{errors.photo.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <SocialLogin />
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-muted mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary hover:text-white font-medium transition-all"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
