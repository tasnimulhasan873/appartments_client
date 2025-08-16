// src/pages/Dashboard/Apartments/AgreementModal.jsx
import React, { useState } from "react";
import {
  FiX,
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiUser,
  FiMail,
  FiCalendar,
  FiCheck,
  FiAlertCircle,
  FiSquare,
  FiDroplet,
} from "react-icons/fi";

const AgreementModal = ({
  isOpen,
  onClose,
  apartment,
  user,
  onConfirm,
  isSubmitting = false,
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (agreed && !isSubmitting) {
      onConfirm();
    }
  };

  const getFlatTypeDisplay = (flatType) => {
    switch (flatType) {
      case "family":
        return "Family";
      case "bachelorMale":
        return "Bachelor Male";
      case "bachelorFemale":
        return "Bachelor Female";
      case "familyOrBachelorMale":
        return "Family/Bachelor Male";
      case "familyOrBachelorFemale":
        return "Family/Bachelor Female";
      default:
        return "Family";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200/20 dark:border-gray-700/50 transform transition-all duration-300 scale-100">
        {/* Enhanced Header with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-4">
          <div className="absolute inset-0 bg-black/10"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300 z-10"
            disabled={isSubmitting}
          >
            <FiX className="text-xl" />
          </button>

          <div className="relative flex items-center gap-6">
            <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30">
              <FiHome className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Rental Agreement Request
              </h2>
              <p className="text-white/90 text-lg">
                Please review all details before submitting your request
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
          {/* Tenant Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <FiUser className="text-white text-lg" />
              </div>
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiUser className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full Name
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  {user.displayName || user.name || "Not provided"}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FiMail className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email Address
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-xl">
                <FiHome className="text-white text-lg" />
              </div>
              Property Details
            </h3>

            {/* Property Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FiHome className="text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Building Name
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  {apartment.buildingName}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiHome className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Apartment Details
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  {apartment.apartmentNo}, Floor {apartment.floor}
                  {apartment.block && `, Block ${apartment.block}`}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FiMapPin className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  {apartment.area}, {apartment.city}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FiDollarSign className="text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Monthly Rent
                  </span>
                </div>
                <p className="font-bold text-green-600 dark:text-green-400 text-2xl">
                  ৳{apartment.rent?.toLocaleString()}/month
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Property Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FiHome className="text-white text-lg" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {apartment.bedrooms}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Bedrooms
                  </p>
                </div>

                <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <FiDroplet className="text-white text-lg" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {apartment.bathrooms}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Bathrooms
                  </p>
                </div>

                <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <FiSquare className="text-white text-lg" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {apartment.sizeSqft}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Sqft
                  </p>
                </div>

                <div className="text-center bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200/50 dark:border-pink-700/50">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-pink-600 rounded-lg">
                      <FiHome className="text-white text-lg" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {apartment.balconies || 0}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Balconies
                  </p>
                </div>

                <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-700/50">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-orange-600 rounded-lg">
                      <FiUser className="text-white text-lg" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {getFlatTypeDisplay(apartment.flatType)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Type
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Property Owner Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-xl">
                <FiUser className="text-white text-lg" />
              </div>
              Property Owner
            </h3>

            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <FiUser className="text-orange-600 dark:text-orange-400 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xl">
                    {apartment.ownerName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {apartment.ownerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-amber-600 rounded-xl">
                <FiAlertCircle className="text-white text-lg" />
              </div>
              Important Information
            </h3>

            <div className="space-y-4">
              {[
                "This is a rental agreement request, not a confirmed booking.",
                "The property owner will review your request and respond accordingly.",
                "You will be notified of the owner's decision via email.",
                "Final rental terms may be subject to negotiation.",
                "Please ensure all your contact information is accurate.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-full mt-0.5">
                    <FiCheck className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <div
                  className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                    agreed
                      ? "bg-blue-600 border-blue-600 shadow-lg"
                      : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400"
                  }`}
                >
                  {agreed && (
                    <FiCheck className="text-white text-sm absolute top-0.5 left-0.5" />
                  )}
                </div>
              </div>
              <div>
                <span className="text-gray-900 dark:text-white font-medium text-lg leading-relaxed">
                  I agree to the terms and conditions
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  I confirm that all information provided is accurate and
                  understand that this is a request, not a confirmed booking.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-semibold text-base"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!agreed || isSubmitting}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 min-w-0 ${
                agreed && !isSubmitting
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-base sm:text-lg flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    Submit Request
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementModal;
