import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const ErrorPage = ({
  title = "Something went wrong!",
  message = "The page you are looking for doesn't exist or you don't have access.",
  code = 404,
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-light/10 to-primary-dark/10 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex flex-col items-center gap-6 max-w-lg w-full p-8 rounded-3xl glass-dark shadow-2xl border border-glow">
        <div className="flex flex-col items-center gap-2">
          <FiAlertTriangle className="text-5xl text-yellow-400 animate-bounce" />
          <span className="text-6xl font-extrabold text-primary-light dark:text-primary">
            {code}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          {message}
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-light to-primary text-white font-semibold shadow-md hover:from-primary hover:to-primary-dark transition-all text-lg"
        >
          <FiHome className="text-xl" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
