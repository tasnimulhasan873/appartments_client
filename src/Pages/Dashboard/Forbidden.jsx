import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaHome, FaEnvelope } from "react-icons/fa";

const Forbidden = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Inter']">
    <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl p-8 sm:p-12 lg:p-16 max-w-2xl w-full text-center">
      {/* Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
        <FaLock className="text-red-400 text-3xl sm:text-4xl" />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
        403
      </h1>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-light mb-4 sm:mb-6">
        Access Forbidden
      </h2>

      {/* Description */}
      <p className="text-white/80 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed">
        You don't have permission to access this page. Please check your account
        permissions or contact support.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <Link
          to="/"
          className="group flex items-center justify-center gap-3 bg-gradient-to-r from-primary-light to-primary hover:from-primary to-primary-dark text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaHome className="text-lg group-hover:scale-110 transition-transform" />
          Return Home
        </Link>

        <Link
          to="/contact"
          className="group flex items-center justify-center gap-3 bg-overlay border border-glow hover:border-primary-light text-primary-light hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaEnvelope className="text-lg group-hover:scale-110 transition-transform" />
          Contact Support
        </Link>
      </div>

      {/* Footer Message */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-glow/30">
        <p className="text-primary-light/80 text-sm sm:text-base">
          If you believe this is an error, please verify your account
          permissions or contact our support team.
        </p>
      </div>
    </div>
  </div>
);

export default Forbidden;
