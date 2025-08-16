import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaSave,
  FaGlobe,
  FaImage,
  FaUpload,
  FaTrash,
  FaSpinner,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/UseAxios";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "BMS - Building Management System",
    siteDescription: "Professional building management platform",
    maintenanceMode: false,
    registrationEnabled: true,
    bannerImages: [], // Array for multiple images
    bannerImageUrl: "",
    bannerTitle: "Welcome to Our Building Management System",
    bannerSubtitle: "Experience premium living with world-class amenities",
  });

  const [bannerPreview, setBannerPreview] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]); // For multiple image previews
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const axiosInstance = useAxios();
  const imgbb_api_key = "ec38464868721c33778fd355631a2d69";

  // Load settings from backend
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);

      // Load from backend database
      console.log("Loading settings from backend database...");
      const response = await axiosInstance.get("/system-settings");
      console.log("API Response:", response.data);

      if (response.data.success && response.data.data) {
        const loadedSettings = response.data.data;
        setSettings(loadedSettings);

        // Set main banner preview
        if (loadedSettings.bannerImageUrl) {
          setBannerPreview(loadedSettings.bannerImageUrl);
        }

        // Set multiple images preview
        if (
          loadedSettings.bannerImages &&
          Array.isArray(loadedSettings.bannerImages)
        ) {
          setMultipleImages(loadedSettings.bannerImages);
        }

        console.log("Settings loaded from database:", loadedSettings);
      }
    } catch (error) {
      console.error("Failed to load settings from database:", error);

      // Fallback to localStorage if backend fails
      console.log("Falling back to localStorage...");
      const savedSettings = localStorage.getItem("systemSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);

        if (parsedSettings.bannerImageUrl) {
          setBannerPreview(parsedSettings.bannerImageUrl);
        }

        if (
          parsedSettings.bannerImages &&
          Array.isArray(parsedSettings.bannerImages)
        ) {
          setMultipleImages(parsedSettings.bannerImages);
        }

        console.log(
          "Settings loaded from localStorage fallback:",
          parsedSettings
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Upload single banner image
  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateImage(file)) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadToImgBB(file);

      handleSettingChange("bannerImageUrl", imageUrl);
      setBannerPreview(imageUrl);

      Swal.fire("Success", "Banner image uploaded successfully!", "success");
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire(
        "Upload Failed",
        error.message || "Failed to upload image",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Upload multiple images
  const handleMultipleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    console.log(
      "Selected files:",
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );

    // Validate all files first
    for (let file of files) {
      if (!validateImage(file)) return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const uploadedImages = [];
      const failedUploads = [];

      // Upload files one by one to avoid overwhelming the API
      for (let i = 0; i < files.length; i++) {
        try {
          console.log(
            `Uploading file ${i + 1}/${files.length}: ${files[i].name}`
          );

          const imageUrl = await uploadToImgBB(files[i]);

          uploadedImages.push({
            id: Date.now() + i,
            url: imageUrl,
            name: files[i].name,
            uploadedAt: new Date().toISOString(),
          });

          // Update progress
          const progress = ((i + 1) / files.length) * 100;
          setUploadProgress(progress);

          // Add small delay to avoid hitting rate limits
          if (i < files.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Failed to upload ${files[i].name}:`, error);
          failedUploads.push(files[i].name);
        }
      }

      if (uploadedImages.length > 0) {
        // Add to existing images
        const newImages = [...multipleImages, ...uploadedImages];
        setMultipleImages(newImages);
        handleSettingChange("bannerImages", newImages);
      }

      // Show result message
      if (failedUploads.length === 0) {
        Swal.fire(
          "Success",
          `${uploadedImages.length} images uploaded successfully!`,
          "success"
        );
      } else if (uploadedImages.length > 0) {
        Swal.fire(
          "Partial Success",
          `${uploadedImages.length} images uploaded successfully. ${
            failedUploads.length
          } failed: ${failedUploads.join(", ")}`,
          "warning"
        );
      } else {
        Swal.fire(
          "Upload Failed",
          `All uploads failed. Please try again.`,
          "error"
        );
      }
    } catch (error) {
      console.error("Multiple upload failed:", error);
      Swal.fire(
        "Upload Failed",
        error.message || "Failed to upload images",
        "error"
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Helper function to validate image
  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      Swal.fire(
        "Invalid File",
        "Please select valid image files only.",
        "error"
      );
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire(
        "File Too Large",
        `${file.name} is larger than 5MB. Please select smaller images.`,
        "error"
      );
      return false;
    }

    return true;
  };

  // Helper function to upload to ImgBB
  const uploadToImgBB = async (file) => {
    try {
      // Validate file before upload
      if (!file || !file.type.startsWith("image/")) {
        throw new Error("Invalid file type. Please select an image file.");
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error(
          "File size too large. Please select an image smaller than 5MB."
        );
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", imgbb_api_key);

      console.log(
        "Uploading file:",
        file.name,
        "Size:",
        file.size,
        "Type:",
        file.type
      );

      const uploadRes = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      console.log("ImgBB response status:", uploadRes.status);

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("ImgBB error response:", errorText);
        throw new Error(
          `Image upload failed: ${uploadRes.status} ${uploadRes.statusText}`
        );
      }

      const uploadData = await uploadRes.json();
      console.log("ImgBB response data:", uploadData);

      if (!uploadData.success) {
        throw new Error(uploadData.error?.message || "Image upload failed");
      }

      return uploadData.data.display_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const removeBannerImage = () => {
    setBannerPreview(null);
    handleSettingChange("bannerImageUrl", "");
  };

  const removeMultipleImage = (imageId) => {
    const updatedImages = multipleImages.filter((img) => img.id !== imageId);
    setMultipleImages(updatedImages);
    handleSettingChange("bannerImages", updatedImages);
  };

  const handleSaveSettings = async () => {
    const result = await Swal.fire({
      title: "Save Settings?",
      text: "Are you sure you want to save these system settings?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);

        const settingsData = {
          siteName: settings.siteName,
          siteDescription: settings.siteDescription,
          maintenanceMode: settings.maintenanceMode,
          registrationEnabled: settings.registrationEnabled,
          bannerImages: multipleImages,
          bannerImageUrl: settings.bannerImageUrl,
          bannerTitle: settings.bannerTitle,
          bannerSubtitle: settings.bannerSubtitle,
        };

        console.log("Saving settings data to database:", settingsData);

        // Save to backend database
        const response = await axiosInstance.post(
          "/system-settings",
          settingsData
        );
        console.log("Database save response:", response.data);

        if (response.data.success) {
          // Also save to localStorage as backup
          localStorage.setItem(
            "systemSettings",
            JSON.stringify({
              ...settingsData,
              updatedAt: new Date().toISOString(),
            })
          );

          Swal.fire(
            "Saved!",
            "System settings have been saved to database successfully.",
            "success"
          );
        } else {
          throw new Error(response.data.message || "Failed to save settings");
        }
      } catch (error) {
        console.error("Database save failed:", error);

        // Save to localStorage as fallback
        const fallbackData = {
          siteName: settings.siteName,
          siteDescription: settings.siteDescription,
          maintenanceMode: settings.maintenanceMode,
          registrationEnabled: settings.registrationEnabled,
          bannerImages: multipleImages,
          bannerImageUrl: settings.bannerImageUrl,
          bannerTitle: settings.bannerTitle,
          bannerSubtitle: settings.bannerSubtitle,
          updatedAt: new Date().toISOString(),
        };

        localStorage.setItem("systemSettings", JSON.stringify(fallbackData));

        Swal.fire(
          "Partially Saved!",
          "Database connection failed, but settings saved locally. Please try again later.",
          "warning"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading && !settings.siteName) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <FaCog className="text-4xl text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">System Settings</h1>
            <p className="text-purple-100">
              Configure system-wide settings and upload multiple banner images
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-200 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Connected to Database
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-gray-900/80 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaGlobe className="text-purple-400" />
            General Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  handleSettingChange("siteName", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleSettingChange("siteDescription", e.target.value)
                }
                rows="3"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white">Maintenance Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleSettingChange("maintenanceMode", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white">User Registration</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.registrationEnabled}
                  onChange={(e) =>
                    handleSettingChange("registrationEnabled", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Banner Upload Section */}
        <div className="bg-gray-900/80 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaImage className="text-purple-400" />
            Banner Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Banner Title
              </label>
              <input
                type="text"
                value={settings.bannerTitle}
                onChange={(e) =>
                  handleSettingChange("bannerTitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Banner Subtitle
              </label>
              <input
                type="text"
                value={settings.bannerSubtitle}
                onChange={(e) =>
                  handleSettingChange("bannerSubtitle", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Main Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Main Banner Image
              </label>

              {bannerPreview && (
                <div className="relative mb-4">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeBannerImage}
                    disabled={isUploading}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-2 rounded-full transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-800 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg cursor-pointer hover:border-purple-500 hover:text-purple-400 transition-colors ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      {bannerPreview
                        ? "Change Main Banner"
                        : "Upload Main Banner"}
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Multiple Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Additional Banner Images
              </label>

              {/* Display uploaded images */}
              {multipleImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {multipleImages.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeMultipleImage(image.id)}
                        disabled={isUploading}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-1 rounded-full transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMultipleImageUpload}
                  disabled={isUploading}
                  multiple
                  className="hidden"
                  id="multiple-upload"
                />
                <label
                  htmlFor="multiple-upload"
                  className={`flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-800 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg cursor-pointer hover:border-purple-500 hover:text-purple-400 transition-colors ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Upload Multiple Images
                    </>
                  )}
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Select multiple images (Ctrl/Cmd + Click). Max 5MB per image.
                Supported: JPG, PNG, WebP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSaveSettings}
          disabled={isLoading || isUploading}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-lg transition-all flex items-center gap-2 mx-auto"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save All Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
