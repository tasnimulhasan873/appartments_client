import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/UseAxios";

const SliderSection = () => {
  const [bannerData, setBannerData] = useState({
    bannerImages: [],
    siteName: "",
    siteDescription: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axiosInstance.get("/bannerSlider");

        if (
          response.data.success &&
          response.data.data.bannerImages.length > 0
        ) {
          setBannerData(response.data.data);
          console.log("Banner data loaded from API:", response.data.data);
          console.log("Banner images:", response.data.data.bannerImages);
        } else {
          console.log("No banner images found in API response");
        }
      } catch (error) {
        console.log("API not available");
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, [axiosInstance]);

  // Auto-slide functionality
  useEffect(() => {
    if (bannerData.bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerData.bannerImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [bannerData.bannerImages.length]);

  // Get current banner image
  const getCurrentBanner = () => {
    if (bannerData.bannerImages.length > 0) {
      const currentBanner = bannerData.bannerImages[currentSlide];

      // Handle different banner formats from database
      const imageUrl = currentBanner.bannerImageUrl || currentBanner.url;
      const title = currentBanner.bannerTitle || bannerData.siteName;
      const subtitle =
        currentBanner.bannerSubtitle || bannerData.siteDescription;

      return {
        imageUrl,
        title,
        subtitle,
      };
    }
    return null;
  };

  const currentBanner = getCurrentBanner();

  // Debug logging
  console.log("Current slide:", currentSlide);
  console.log("Current banner:", currentBanner);
  console.log("Banner image URL:", currentBanner?.imageUrl);

  // Don't render if no banner data
  if (!currentBanner) {
    return (
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-xl">Loading banner data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
      {/* Background with Image */}
      <div className="relative w-full h-full">
        {/* Background Image */}
        <img
          src={currentBanner.imageUrl}
          alt="Luxury Apartment"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={(e) => {
            console.log("Image loaded successfully:", e.target.src);
          }}
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            e.target.style.display = "none";
            e.target.parentElement.classList.add(
              "bg-gradient-to-br",
              "from-primary-dark",
              "via-primary",
              "to-primary-light"
            );
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-glow rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-blurPurple rounded-full blur-md"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary-light/40 rounded-full blur-sm"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-5xl mx-auto py-8">
            <Fade triggerOnce duration={800} delay={100}>
              {/* Preview Images - Show other banner images if available */}

              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-dark/80 backdrop-blur-sm rounded-full border border-primary/30">
                  {bannerData.siteName}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                {currentBanner.title ? (
                  <>
                    {currentBanner.title.split(" ").slice(0, -1).join(" ")}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                      {currentBanner.title.split(" ").slice(-1)}
                    </span>
                  </>
                ) : (
                  <>
                    {bannerData.siteName.split(" ").slice(0, -1).join(" ")}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                      {bannerData.siteName.split(" ").slice(-1)}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed max-w-3xl mx-auto">
                {currentBanner.subtitle || bannerData.siteDescription}
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  "Premium Location",
                  "24/7 Security",
                  "High-Speed WiFi",
                  "Modern Design",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-glow backdrop-blur-sm rounded-lg border border-white/20"
                  >
                    <FiStar className="text-primary-light text-xs" />
                    <span className="text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center mb-8">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-primary-dark to-primary text-white font-bold rounded-full hover:from-primary hover:to-primary-light transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    500+
                  </div>
                  <div className="text-xs text-gray-300">Apartments</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    2000+
                  </div>
                  <div className="text-xs text-gray-300">Happy Residents</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    4.9/5
                  </div>
                  <div className="text-xs text-gray-300">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    24/7
                  </div>
                  <div className="text-xs text-gray-300">Support</div>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/* Slide Indicators */}
        {bannerData.bannerImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {bannerData.bannerImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderSection;
