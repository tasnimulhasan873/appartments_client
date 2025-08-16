import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDollarSign,
  FaMapMarkerAlt,
  FaBuilding,
  FaImages,
  FaCheck,
  FaTimes,
  FaUsers,
  FaUserTie,
  FaUpload,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Fetch user's apartments
  const {
    data: apartments = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user-apartments", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/apartments/owner/${user?.email}`);
        console.log("User apartments:", res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching apartments:", error);
        throw error;
      }
    },
    enabled: !!user?.email,
    retry: 3,
    retryDelay: 1000,
  });

  const handleDelete = async (apartmentId) => {
    try {
      const result = await Swal.fire({
        title: "Delete Apartment?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/apartments/${apartmentId}`);
        refetch();
        Swal.fire("Deleted!", "Apartment has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
      Swal.fire("Error!", "Failed to delete apartment.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
          <p className="text-gray-400">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-2">
            ⚠️ Error Loading Properties
          </div>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <FaHome className="text-3xl sm:text-4xl text-white" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Manage Properties
              </h1>
              <p className="text-purple-100 text-sm sm:text-base">
                Add and manage your apartment listings ({apartments.length}{" "}
                total)
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors self-start sm:self-auto"
          >
            <FaPlus />
            Add Apartment
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingProperty) && (
        <AddEditPropertyForm
          property={editingProperty}
          onClose={() => {
            setShowAddForm(false);
            setEditingProperty(null);
          }}
          onSuccess={() => {
            refetch();
            setShowAddForm(false);
            setEditingProperty(null);
          }}
          userEmail={user?.email}
          axiosSecure={axiosSecure}
        />
      )}

      {/* Properties Grid */}
      {apartments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <FaHome className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">No properties found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Your First Property
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <PropertyCard
              key={apartment._id}
              apartment={apartment}
              onEdit={() => setEditingProperty(apartment)}
              onDelete={() => handleDelete(apartment._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ apartment, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            !imageError && apartment.images?.[0]
              ? apartment.images[0]
              : "/default-apartment.jpg"
          }
          alt={apartment.buildingName}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              apartment.isAvailable
                ? "bg-green-600 text-green-100"
                : "bg-red-600 text-red-100"
            }`}
          >
            {apartment.isAvailable ? "Available" : "Unavailable"}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100">
            {apartment.flatType || "Family"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {apartment.buildingName}
            </h3>
            <div className="flex items-center text-gray-400 text-sm">
              <FaMapMarkerAlt className="mr-1" />
              {apartment.area}, {apartment.city}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-purple-400">
              ৳{apartment.rent?.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">per month</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-400" />
            {apartment.bedrooms} Bed
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-400" />
            {apartment.bathrooms} Bath
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-gray-400" />
            {apartment.sizeSqft} sqft
          </div>
        </div>

        {/* Apartment Details */}
        <div className="text-sm text-gray-300 mb-4">
          <div className="flex justify-between">
            <span>Apartment:</span>
            <span>{apartment.apartmentNo}</span>
          </div>
          <div className="flex justify-between">
            <span>Floor:</span>
            <span>{apartment.floor}</span>
          </div>
          <div className="flex justify-between">
            <span>Block:</span>
            <span>{apartment.block}</span>
          </div>
        </div>

        {/* Facilities */}
        {apartment.facilities && apartment.facilities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {apartment.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                >
                  {facility}
                </span>
              ))}
              {apartment.facilities.length > 3 && (
                <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                  +{apartment.facilities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Property Form Component
const AddEditPropertyForm = ({
  property,
  onClose,
  onSuccess,
  userEmail,
  axiosSecure,
}) => {
  const imgbb_api_key = "ec38464868721c33778fd355631a2d69"; // Your ImgBB API key

  const [formData, setFormData] = useState({
    ownerName: property?.ownerName || "",
    ownerEmail: userEmail || "",
    ownerPhone: property?.ownerPhone || "",
    apartmentNo: property?.apartmentNo || "",
    floor: property?.floor || "",
    block: property?.block || "",
    buildingName: property?.buildingName || "",
    area: property?.area || "",
    city: property?.city || "",
    addressLine: property?.addressLine || "",
    rent: property?.rent || "",
    isAvailable: property?.isAvailable ?? true,
    flatType: property?.flatType || "family",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    balconies: property?.balconies || "",
    sizeSqft: property?.sizeSqft || "",
    images: property?.images || [],
    facilities: property?.facilities?.join(", ") || "",
    description: property?.description || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(property?.images || []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...formData.images, ...previews]);
  };

  // Upload images to ImgBB
  const uploadImages = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("image", file);

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

        uploadedUrls.push(uploadData.data.display_url);
      } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${file.name}`);
      }
    }

    return uploadedUrls;
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImages = [...formData.images];

      // Upload new images if any
      if (selectedFiles.length > 0) {
        setUploadingImages(true);
        const uploadedUrls = await uploadImages(selectedFiles);
        finalImages = [...finalImages, ...uploadedUrls];
        setUploadingImages(false);
      }

      const submitData = {
        ...formData,
        rent: parseInt(formData.rent),
        floor: parseInt(formData.floor),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        balconies: parseInt(formData.balconies),
        sizeSqft: parseInt(formData.sizeSqft),
        images: finalImages,
        facilities: formData.facilities
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
        submitDate: new Date(),
      };

      if (property) {
        // Update existing property
        await axiosSecure.put(`/apartments/${property._id}`, submitData);
        Swal.fire("Success!", "Property updated successfully!", "success");
      } else {
        // Add new property
        await axiosSecure.post("/apartments", submitData);
        Swal.fire("Success!", "Property added successfully!", "success");
      }

      onSuccess();
    } catch (error) {
      console.error("Error submitting property:", error);
      Swal.fire(
        "Error!",
        error.message || "Failed to save property. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
      setUploadingImages(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Owner Information */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter your full name (e.g., Md. Tasnimul Hasan)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Owner Email</label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  placeholder="Email from your account (auto-filled)"
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-600 text-gray-400 rounded-lg cursor-not-allowed placeholder-gray-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Owner Phone *
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  placeholder="Enter your phone number (e.g., 01712345678)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Apartment No *
                </label>
                <input
                  type="text"
                  name="apartmentNo"
                  value={formData.apartmentNo}
                  onChange={handleChange}
                  placeholder="Enter apartment number (e.g., A3, B5, 201)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Floor *</label>
                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Enter floor number (e.g., 3, 5, 12)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Block</label>
                <input
                  type="text"
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  placeholder="Enter block name (e.g., A, B, C or leave empty)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Building Name *
                </label>
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  placeholder="Enter building name (e.g., Green View Tower)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter area name (e.g., Dhanmondi, Gulshan)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city name (e.g., Dhaka, Chittagong)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-300 mb-2">Address Line</label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Enter full address (e.g., House 23, Road 7A, Dhanmondi R/A)"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Rent & Availability */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Rent & Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Monthly Rent (৳) *
                </label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="Enter monthly rent (e.g., 15000, 25000)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Flat Type *</label>
                <select
                  name="flatType"
                  value={formData.flatType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="family">Family</option>
                  <option value="bachelorMale">Bachelor Male</option>
                  <option value="bachelorFemale">Bachelor Female</option>
                  <option value="familyOrBachelorMale">
                    Family or Bachelor Male
                  </option>
                  <option value="familyOrBachelorFemale">
                    Family or Bachelor Female
                  </option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  Available for Rent
                </label>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Room Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Number of bedrooms (e.g., 2, 3)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Number of bathrooms (e.g., 2, 3)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Balconies</label>
                <input
                  type="number"
                  name="balconies"
                  value={formData.balconies}
                  onChange={handleChange}
                  placeholder="Number of balconies (e.g., 1, 2)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Size (sqft) *
                </label>
                <input
                  type="number"
                  name="sizeSqft"
                  value={formData.sizeSqft}
                  onChange={handleChange}
                  placeholder="Total area in sqft (e.g., 950, 1200)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images & Facilities */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Images & Facilities
            </h3>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Property Images
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    📸 Select multiple high-quality images (living room,
                    bedrooms, kitchen, bathroom, balcony views)
                  </p>
                </div>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadingImages && (
                  <div className="flex items-center gap-2 mt-2 text-purple-400">
                    <FaUpload className="animate-pulse" />
                    <span>Uploading images...</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Facilities (Comma separated)
                </label>
                <input
                  type="text"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  placeholder="Enter facilities separated by commas (e.g., Lift, Generator, 24/7 Guard, Parking, Gas Line, CCTV)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your property in detail... (e.g., South-facing apartment with natural light throughout the day. Suitable for small families. Close to schools, hospitals, and shopping centers. Peaceful neighborhood with easy transport access.)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              disabled={isSubmitting || uploadingImages}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploadingImages}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImages
                ? "Uploading Images..."
                : isSubmitting
                ? "Saving..."
                : property
                ? "Update Property"
                : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProperties;
