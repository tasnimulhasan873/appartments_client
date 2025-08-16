import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApartmentCard from "./ApartmentCard";
import AgreementModal from "./AgreementModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import {
  FiSearch,
  FiFilter,
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiGrid,
  FiList,
} from "react-icons/fi";

const Apartments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [flatTypeFilter, setFlatTypeFilter] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingAgreement, setIsSubmittingAgreement] = useState(false);

  // Fetch apartments with improved error handling
  const {
    data: apartmentsData = { apartments: [], pagination: {} },
    isLoading: apartmentsLoading,
    refetch: refetchApartments,
    error: apartmentsError,
  } = useQuery({
    queryKey: [
      "apartments",
      searchTerm,
      cityFilter,
      areaFilter,
      flatTypeFilter,
      minRent,
      maxRent,
      bedroomsFilter,
      sortBy,
      currentPage,
    ],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();

        // Add filters
        if (searchTerm) params.append("search", searchTerm);
        if (cityFilter) params.append("city", cityFilter);
        if (areaFilter) params.append("area", areaFilter);
        if (flatTypeFilter) params.append("flatType", flatTypeFilter);
        if (minRent) params.append("minRent", minRent);
        if (maxRent) params.append("maxRent", maxRent);
        if (bedroomsFilter) params.append("bedrooms", bedroomsFilter);

        // Add sorting
        params.append("sortBy", sortBy);

        // Add pagination
        params.append("page", currentPage.toString());
        params.append("limit", "12");

        const url = `/apartments?${params.toString()}`;
        console.log("Making API call to:", url);

        const res = await axiosSecure.get(url);

        console.log("API Response received:");
        console.log("- Total apartments:", res.data.apartments?.length || 0);

        // Handle different response formats
        if (res.data.apartments) {
          return res.data; // Paginated format
        } else if (Array.isArray(res.data)) {
          return { apartments: res.data, pagination: {} }; // Simple array format
        } else {
          return { apartments: [], pagination: {} };
        }
      } catch (error) {
        console.error("Error fetching apartments:", error);

        // Return empty data instead of throwing
        if (error.response?.status === 404) {
          return { apartments: [], pagination: {} };
        }

        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch user agreements with improved error handling
  const {
    data: userAgreements = [],
    isLoading: agreementsLoading,
    refetch: refetchAgreements,
  } = useQuery({
    queryKey: ["user-agreements", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];

      try {
        const res = await axiosSecure.get(
          `/agreementsCollection/user/${user.email}`
        );
        return Array.isArray(res.data) ? res.data : [];
      } catch (error) {
        console.error("Error fetching user agreements:", error);
        // Return empty array instead of throwing
        return [];
      }
    },
    enabled: !!user?.email,
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleAgreement = (apartment) => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to start an agreement.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // Check if user already has an agreement for this apartment
    const existingAgreement = userAgreements.find(
      (agreement) => agreement.apartmentId === apartment._id
    );

    if (existingAgreement) {
      Swal.fire({
        title: "Agreement Already Exists",
        text: `You already have a ${existingAgreement.status} agreement for this apartment.`,
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    // Open the modal instead of using SweetAlert
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedApartment(null);
    setIsSubmittingAgreement(false);
  };

  // ...existing code...

  const handleAgreementConfirm = async () => {
    if (!selectedApartment || !user) return;

    setIsSubmittingAgreement(true);

    try {
      const agreementData = {
        apartmentId: selectedApartment._id,
        tenantEmail: user.email,
        tenantName: user.displayName || user.name || "Unknown User",
        ownerEmail: selectedApartment.ownerEmail,
        ownerName: selectedApartment.ownerName,
        // Flatten apartment details for easier database queries
        buildingName: selectedApartment.buildingName,
        apartmentNo: selectedApartment.apartmentNo,
        floor: selectedApartment.floor,
        block: selectedApartment.block || "",
        area: selectedApartment.area,
        city: selectedApartment.city,
        rent: selectedApartment.rent,
        sizeSqft: selectedApartment.sizeSqft,
        bedrooms: selectedApartment.bedrooms,
        bathrooms: selectedApartment.bathrooms,
        flatType: selectedApartment.flatType,
        balconies: selectedApartment.balconies || 0,
        status: "pending",
        requestDate: new Date(),
        createdAt: new Date(),
      };

      // Post to agreementsCollection endpoint
      await axiosSecure.post("/agreementsCollection", agreementData);

      // Close modal first
      handleModalClose();

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Your rental agreement request has been submitted successfully. The owner will be notified and will respond soon.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 5000,
        timerProgressBar: true,
      });

      // Refresh both apartments and agreements data
      refetchApartments();
      refetchAgreements();
    } catch (error) {
      console.error("Error submitting agreement:", error);
      setIsSubmittingAgreement(false);

      let errorMessage =
        "Failed to submit agreement request. Please try again.";

      if (error.response?.status === 409) {
        errorMessage = "You already have an agreement for this apartment.";
      } else if (error.response?.status === 404) {
        errorMessage = "Apartment not found. It may have been removed.";
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Get unique cities and areas for filters
  const cities = [
    ...new Set(
      apartmentsData.apartments?.map((apt) => apt.city).filter(Boolean)
    ),
  ];
  const areas = [
    ...new Set(
      apartmentsData.apartments?.map((apt) => apt.area).filter(Boolean)
    ),
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setCityFilter("");
    setAreaFilter("");
    setFlatTypeFilter("");
    setMinRent("");
    setMaxRent("");
    setBedroomsFilter("");
    setSortBy("latest");
    setCurrentPage(1);
  };

  const isLoading = apartmentsLoading || agreementsLoading;

  if (apartmentsError) {
    return (
      <div className="min-h-screen bg-primary">
        <div className="flex justify-center items-center h-64">
          <div className="text-center bg-overlay backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-glow">
            <div className="text-red-400 text-xl mb-2">
              ⚠️ Error Loading Apartments
            </div>
            <p className="text-white/80 mb-4">
              {apartmentsError.message || "Something went wrong"}
            </p>
            <button
              onClick={() => refetchApartments()}
              className="px-6 py-3 bg-gradient-to-r from-primary-light to-primary text-white rounded-lg hover:from-primary hover:to-primary-dark transition-all duration-300 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary font-['Inter'] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blurPurple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delay"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-glow/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header with Enhanced Styling */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-light to-primary rounded-full mb-6">
            <FiHome className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Perfect Apartment
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Discover amazing rental properties in your preferred location with
            our advanced search
          </p>
        </div>

        {/* Enhanced Filters with Glass Effect */}
        <div className="bg-overlay backdrop-blur-lg rounded-3xl shadow-2xl border border-glow p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-primary-light to-primary rounded-lg">
              <FiFilter className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-white">Search & Filter</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-primary-light transition-colors" />
              <input
                type="text"
                placeholder="Search buildings, areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* City Filter */}
            <div className="relative group">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-primary-light transition-colors" />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white backdrop-blur-sm transition-all duration-300"
              >
                <option value="" className="bg-primary text-white">
                  All Cities
                </option>
                {cities.map((city) => (
                  <option
                    key={city}
                    value={city}
                    className="bg-primary text-white"
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Filter */}
            <div className="relative group">
              <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-primary-light transition-colors" />
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white backdrop-blur-sm transition-all duration-300"
              >
                <option value="" className="bg-primary text-white">
                  All Areas
                </option>
                {areas.map((area) => (
                  <option
                    key={area}
                    value={area}
                    className="bg-primary text-white"
                  >
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Flat Type Filter */}
            <select
              value={flatTypeFilter}
              onChange={(e) => setFlatTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white backdrop-blur-sm transition-all duration-300"
            >
              <option value="" className="bg-primary text-white">
                All Types
              </option>
              <option value="family" className="bg-primary text-white">
                Family
              </option>
              <option value="bachelorMale" className="bg-primary text-white">
                Bachelor Male
              </option>
              <option value="bachelorFemale" className="bg-primary text-white">
                Bachelor Female
              </option>
              <option
                value="familyOrBachelorMale"
                className="bg-primary text-white"
              >
                Family or Bachelor Male
              </option>
              <option
                value="familyOrBachelorFemale"
                className="bg-primary text-white"
              >
                Family or Bachelor Female
              </option>
            </select>
          </div>

          {/* Second Row Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {/* Min Rent */}
            <div className="relative group">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-primary-light transition-colors" />
              <input
                type="number"
                placeholder="Min Rent (৳)"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Max Rent */}
            <div className="relative group">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-primary-light transition-colors" />
              <input
                type="number"
                placeholder="Max Rent (৳)"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Bedrooms */}
            <select
              value={bedroomsFilter}
              onChange={(e) => setBedroomsFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white backdrop-blur-sm transition-all duration-300"
            >
              <option value="" className="bg-primary text-white">
                Any Bedrooms
              </option>
              <option value="1" className="bg-primary text-white">
                1 Bedroom
              </option>
              <option value="2" className="bg-primary text-white">
                2 Bedrooms
              </option>
              <option value="3" className="bg-primary text-white">
                3 Bedrooms
              </option>
              <option value="4" className="bg-primary text-white">
                4+ Bedrooms
              </option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-glow rounded-xl focus:ring-2 focus:ring-primary-light focus:border-primary-light text-white backdrop-blur-sm transition-all duration-300"
            >
              <option value="latest" className="bg-primary text-white">
                Latest First
              </option>
              <option value="oldest" className="bg-primary text-white">
                Oldest First
              </option>
              <option value="rent_low" className="bg-primary text-white">
                Rent: Low to High
              </option>
              <option value="rent_high" className="bg-primary text-white">
                Rent: High to Low
              </option>
              <option value="size_large" className="bg-primary text-white">
                Size: Large to Small
              </option>
              <option value="size_small" className="bg-primary text-white">
                Size: Small to Large
              </option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-primary/60 to-primary-dark/60 text-white rounded-xl hover:from-primary-dark hover:to-primary-dark transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Enhanced Results Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="bg-overlay backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg border border-glow">
            <div className="text-white font-medium">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-light"></div>
                  Loading apartments...
                </span>
              ) : (
                <span>
                  Showing {apartmentsData.apartments?.length || 0} apartments
                  {apartmentsData.pagination?.totalApartments &&
                    ` of ${apartmentsData.pagination.totalApartments} total`}
                </span>
              )}
            </div>
          </div>

          {/* Enhanced View Mode Toggle */}
          <div className="flex items-center gap-2 bg-overlay backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-glow">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-lg"
                  : "text-white/70 hover:bg-primary/20 hover:text-white"
              }`}
              title="Grid View"
            >
              <FiGrid className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-lg"
                  : "text-white/70 hover:bg-primary/20 hover:text-white"
              }`}
              title="List View"
            >
              <FiList className="text-lg" />
            </button>
          </div>
        </div>

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="bg-overlay backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-glow">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-light/30 border-t-primary-light"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-primary-light/40 opacity-20"></div>
                </div>
                <p className="text-white text-lg font-medium">
                  Loading amazing apartments...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Apartments Grid with enhanced styling */}
        {!isLoading && apartmentsData.apartments?.length > 0 && (
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {apartmentsData.apartments.map((apartment) => (
              <div
                key={apartment._id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <ApartmentCard
                  apartment={apartment}
                  handleAgreement={handleAgreement}
                  userAgreements={userAgreements}
                />
              </div>
            ))}
          </div>
        )}

        {/* Enhanced No Results */}
        {!isLoading && apartmentsData.apartments?.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-overlay backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-glow max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-light to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHome className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No apartments found
              </h3>
              <p className="text-white/80 mb-6">
                Try adjusting your search criteria or clear filters to see more
                results.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-gradient-to-r from-primary-light to-primary text-white rounded-xl hover:from-primary hover:to-primary-dark transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Pagination */}
        {apartmentsData.pagination?.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="bg-overlay backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-glow">
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gradient-to-r from-primary/60 to-primary-dark/60 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary-dark hover:to-primary-dark transition-all duration-300 font-medium"
                >
                  Previous
                </button>

                <span className="px-6 py-2 text-white font-medium">
                  Page {apartmentsData.pagination.currentPage || currentPage} of{" "}
                  {apartmentsData.pagination.totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= apartmentsData.pagination.totalPages}
                  className="px-4 py-2 bg-gradient-to-r from-primary-light to-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary hover:to-primary-dark transition-all duration-300 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agreement Modal */}
      <AgreementModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        apartment={selectedApartment}
        user={user}
        onConfirm={handleAgreementConfirm}
        isSubmitting={isSubmittingAgreement}
      />
    </div>
  );
};

export default Apartments;
