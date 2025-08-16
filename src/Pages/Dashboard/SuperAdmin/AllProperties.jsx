import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaMobile,
  FaDesktop,
  FaTabletAlt,
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import NeonLoader from "../../../NeonLoader";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all properties (both available and occupied)
  const {
    data: propertiesData = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-properties", currentPage, itemsPerPage, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        includeAll: "true",
      });

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await axiosSecure.get(`/apartmentsData?${params}`);
      return response.data;
    },
  });

  // Extract properties and pagination from response
  const properties = propertiesData.apartments || [];
  const pagination = propertiesData.pagination || {};

  // Fetch property statistics
  const { data: stats = {} } = useQuery({
    queryKey: ["property-stats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/apartments/stats/overview");
      return response.data;
    },
  });

  // Filter properties based on status (client-side filtering)
  const filteredProperties = properties.filter((property) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && property.isAvailable) ||
      (filterStatus === "occupied" && !property.isAvailable);

    return matchesStatus;
  });

  // Handle delete property
  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axiosSecure.delete(`/apartments/${propertyId}`);
        toast.success("Property deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete property");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        <NeonLoader overlay={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-primary-light/30 max-w-md">
          <div className="text-red-400 text-4xl sm:text-5xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Error Loading Properties
          </h2>
          <p className="text-gray-300 mb-6">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-lg hover:from-primary hover:to-primary-dark transition-all duration-300 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-primary-light/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-gradient-to-r from-primary-light to-primary rounded-full">
                <FaBuilding className="text-2xl sm:text-3xl text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  All Properties
                </h1>
                <p className="text-white text-sm sm:text-base">
                  Manage all properties in the system
                </p>
              </div>
            </div>

            {/* Device indicators */}
            <div className="flex items-center gap-2 text-white/60">
              <FaMobile className="text-sm sm:hidden" />
              <FaTabletAlt className="text-sm hidden sm:block lg:hidden" />
              <FaDesktop className="text-sm hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-primary-light/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-primary-light/30 rounded-full w-fit mx-auto mb-2">
                <FaBuilding className="text-primary-light text-lg sm:text-xl" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                {stats.total || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-200">
                Total Properties
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-green-500/30 rounded-full w-fit mx-auto mb-2">
                <FaHome className="text-green-400 text-lg sm:text-xl" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 mb-1">
                {stats.available || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-200">Available</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-red-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-red-500/30 rounded-full w-fit mx-auto mb-2">
                <FaEye className="text-red-400 text-lg sm:text-xl" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-400 mb-1">
                {stats.occupied || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-200">Occupied</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="text-center">
              <div className="p-2 sm:p-3 bg-purple-500/30 rounded-full w-fit mx-auto mb-2">
                <FaDollarSign className="text-purple-400 text-lg sm:text-xl" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-1">
                ${stats.averageRent || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-200">Avg Rent</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 border border-primary-light/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/80 border border-gray-600 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-all duration-300 text-sm sm:text-base"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-700/80 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-all duration-300 text-sm sm:text-base"
            >
              <option value="all" className="bg-gray-700 text-white">
                All Properties
              </option>
              <option value="available" className="bg-gray-700 text-white">
                Available Only
              </option>
              <option value="occupied" className="bg-gray-700 text-white">
                Occupied Only
              </option>
            </select>
          </div>
        </div>

        {/* Mobile/Tablet Cards View */}
        <div className="block lg:hidden">
          <div className="space-y-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-primary-light/30 hover:border-primary-light/50 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-primary-light/40"
                        src={
                          property.images?.[0] || "/placeholder-property.jpg"
                        }
                        alt={property.title || "Property"}
                        onError={(e) => {
                          e.target.src = "/placeholder-property.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-white">
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                        {property.buildingName ||
                          property.title ||
                          `Apartment ${property.apartmentNo}`}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Apt #{property.apartmentNo}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            property.isAvailable
                              ? "bg-green-600/30 text-green-300 border border-green-500/50"
                              : "bg-red-600/30 text-red-300 border border-red-500/50"
                          }`}
                        >
                          {property.isAvailable ? "Available" : "Occupied"}
                        </span>
                        <span className="text-white font-bold text-sm">
                          ${property.rent || 0}/month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-gray-300 text-xs font-medium uppercase tracking-wide">
                        Owner
                      </label>
                      <div className="text-gray-100 text-sm mt-1">
                        <div className="font-medium">
                          {property.ownerName || "N/A"}
                        </div>
                        <div className="text-xs text-gray-300 break-all">
                          {property.ownerEmail || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300 text-xs font-medium uppercase tracking-wide">
                        Location
                      </label>
                      <div className="text-gray-100 text-sm mt-1">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-primary-light text-xs" />
                          <span>{property.city || "N/A"}</span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {property.area || `Floor ${property.floor || "N/A"}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                    <div className="text-xs text-gray-300">
                      Floor:{" "}
                      <span className="text-white font-medium">
                        {property.floor || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          console.log("View property:", property._id)
                        }
                        className="p-2 text-primary-light hover:text-white hover:bg-primary-light/20 rounded-lg transition-all duration-300 border border-primary-light/30 hover:border-primary-light/50"
                        title="View Property"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button
                        onClick={() =>
                          console.log("Edit property:", property._id)
                        }
                        className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition-all duration-300 border border-green-500/30 hover:border-green-500/50"
                        title="Edit Property"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                        title="Delete Property"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 text-center border border-primary-light/30 shadow-lg">
                <FaBuilding className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No properties found
                </h3>
                <p className="text-gray-300">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No properties have been added yet"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-light/30 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Rent
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Floor
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <tr
                        key={property._id}
                        className="hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <img
                                className="w-12 h-12 rounded-lg object-cover border-2 border-primary-light/40"
                                src={
                                  property.images?.[0] ||
                                  "/placeholder-property.jpg"
                                }
                                alt={property.title || "Property"}
                                onError={(e) => {
                                  e.target.src = "/placeholder-property.jpg";
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {property.buildingName ||
                                  property.title ||
                                  `Apartment ${property.apartmentNo}`}
                              </div>
                              <div className="text-gray-300 text-sm">
                                Apt #{property.apartmentNo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-100 text-sm">
                            <div className="font-medium">
                              {property.ownerName || "N/A"}
                            </div>
                            <div className="text-gray-300 text-xs break-all">
                              {property.ownerEmail || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-100 text-sm">
                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-primary-light text-xs" />
                              <span>{property.city || "N/A"}</span>
                            </div>
                            <div className="text-gray-300 text-xs">
                              {property.area ||
                                `Floor ${property.floor || "N/A"}`}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-primary-light font-bold">
                            ${property.rent || 0}
                            <span className="text-gray-300 text-sm font-normal">
                              /mo
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              property.isAvailable
                                ? "bg-green-600/30 text-green-300 border border-green-500/50"
                                : "bg-red-600/30 text-red-300 border border-red-500/50"
                            }`}
                          >
                            {property.isAvailable ? "Available" : "Occupied"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-100 text-sm font-medium">
                          {property.floor || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                console.log("View property:", property._id)
                              }
                              className="p-2 text-primary-light hover:text-white hover:bg-primary-light/20 rounded-lg transition-all duration-300 border border-primary-light/30 hover:border-primary-light/50"
                              title="View Property"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() =>
                                console.log("Edit property:", property._id)
                              }
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition-all duration-300 border border-green-500/30 hover:border-green-500/50"
                              title="Edit Property"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(property._id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                              title="Delete Property"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center">
                          <FaBuilding className="text-6xl text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-white mb-2">
                            No properties found
                          </h3>
                          <p className="text-gray-300">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "No properties have been added yet"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalCount > itemsPerPage && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl px-6 py-4 mt-6 border border-primary-light/30 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-200">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, pagination.totalCount)} of{" "}
                {pagination.totalCount} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-white bg-primary/30 rounded-lg border border-primary/50 font-medium">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mt-6 border border-primary-light/20">
            <div className="flex items-center justify-between text-gray-200 text-sm">
              <span>
                Showing{" "}
                <span className="font-medium text-white">
                  {filteredProperties.length}
                </span>{" "}
                properties
                {searchTerm && (
                  <span>
                    {" "}
                    matching "
                    <span className="text-primary-light font-medium">
                      {searchTerm}
                    </span>
                    "
                  </span>
                )}
                {filterStatus !== "all" && (
                  <span>
                    {" "}
                    with status "
                    <span className="text-primary-light font-medium capitalize">
                      {filterStatus}
                    </span>
                    "
                  </span>
                )}
              </span>
              {(searchTerm || filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="text-primary-light hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-primary-light/20 border border-primary-light/30 hover:border-primary-light/50 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
