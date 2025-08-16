import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleClick = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;

      // Save user to database
      await fetch(
        `${
          import.meta.env.VITE_API_URL ||
          "https://b11a12-server-side.vercel.app"
        }/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
          }),
        }
      );

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("❌ Social login error:", error.message);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="text-center mt-4">
      <p className="text-gray-500 mb-2">Or continue with</p>
      <button
        onClick={handleClick}
        className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mr-2"
        >
          <g>
            <path d="M0 0h512v512H0z" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
