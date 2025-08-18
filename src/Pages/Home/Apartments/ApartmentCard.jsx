import React, { useState } from "react";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import useUserRole from "../../../hooks/useUserRole";

const ApartmentCard = ({ apartment, handleAgreement, userAgreements = [] }) => {
  const [imageError, setImageError] = useState(false);
  const { role } = useUserRole();

  // Check if user has an agreement for this apartment
  const hasAgreement = userAgreements.some(
    (agreement) =>
      agreement.apartmentId === apartment._id &&
      (agreement.status === "pending" || agreement.status === "accepted")
  );

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

  const getStatusBadge = () => {
    const agreement = userAgreements.find(
      (agreement) => agreement.apartmentId === apartment._id
    );

    if (agreement) {
      const statusColors = {
        pending: "bg-yellow-500 text-white",
        accepted: "bg-green-500 text-white",
        rejected: "bg-red-500 text-white",
      };

      return (
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[agreement.status] || "bg-gray-500 text-white"
          }`}
        >
          {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 w-full max-w-[350px] flex flex-col justify-between">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {apartment.images && apartment.images.length > 0 && !imageError ? (
          <img
            src={apartment.images[0]}
            alt={apartment.buildingName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <FiHome className="text-6xl text-gray-400 dark:text-gray-600" />
          </div>
        )}

        {/* Status Badge */}
        {getStatusBadge()}

        {/* Flat Type Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
          {getFlatTypeDisplay(apartment.flatType)}
        </div>

        {/* Available Badge */}
        {apartment.isAvailable && (
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <FiCheck className="text-xs" />
            Available
          </div>
        )}
        {/* See More Button moved to content section below */}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Building Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {apartment.buildingName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
          <FiMapPin className="text-sm" />
          <span className="text-sm">
            {apartment.area}, {apartment.city}
          </span>
        </div>

        {/* Apartment Details */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>
            Apt {apartment.apartmentNo} • Floor {apartment.floor}
          </span>
          {apartment.block && <span> • Block {apartment.block}</span>}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {apartment.bedrooms}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Beds</div>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {apartment.bathrooms}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Baths
            </div>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {apartment.sizeSqft}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Sqft</div>
          </div>
        </div>

        {/* Rent */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              ৳{apartment.rent?.toLocaleString()}
            </span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="font-medium">Owner:</span> {apartment.ownerName}
        </div>

        {/* See More Button */}

        <Link to={`/apartments/${apartment._id}`} className="block w-full mb-2">
          <Button
            type="fill"
            className="w-full rounded-2xl flex items-center justify-center gap-2 text-sm"
          >
            See More <FiArrowRight />
          </Button>
        </Link>

        {/* Agreement Button */}
        <Button
          type={role !== "admin" && hasAgreement ? "outline" : "fill"}
          onClick={() => handleAgreement(apartment)}
          disabled={role !== "admin" && hasAgreement}
          className="w-full rounded-2xl flex items-center justify-center gap-2 py-3 px-4"
        >
          <FiCalendar className="text-lg" />
          {hasAgreement ? "Agreement Submitted" : "Request Agreement"}
        </Button>
      </div>
    </div>
  );
};

export default ApartmentCard;
