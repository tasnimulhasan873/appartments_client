import React from "react";
import {
  FiCheck,
  FiMapPin,
  FiHome,
  FiShield,
  FiStar,
  FiWifi,
  FiDroplet,
  FiAward,
  FiUsers,
} from "react-icons/fi";

const AboutBuildingSection = () => {
  return (
    <section className="relative bg-primary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-card-bg to-primary"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-12 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-float-delay"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-float-delay-2"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-6 backdrop-blur-sm border border-secondary/20">
            <FiHome className="text-2xl sm:text-3xl text-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Premium Living Spaces
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience luxury apartment living designed for the modern lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Building Showcase */}
          <div className="relative">
            <div className="relative glass-dark rounded-3xl overflow-hidden shadow-2xl border border-secondary/20 group">
              <div className="aspect-[4/3] bg-gradient-to-br from-surface to-card-bg flex items-center justify-center">
                <div className="text-center">
                  <FiHome className="text-6xl text-secondary/50 mb-4 mx-auto" />
                  <p className="text-text-muted">Premium Building Image</p>
                </div>
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/95 to-transparent">
                <div className="flex items-center text-white">
                  <FiMapPin className="text-secondary mr-3 text-lg" />
                  <span className="font-semibold">Prime Downtown Location</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:to-secondary/10 transition-all duration-500"></div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -top-6 -right-6 glass-dark border border-secondary/30 text-white py-4 px-6 rounded-2xl shadow-xl z-10 backdrop-blur-md">
              <div className="flex items-center">
                <FiStar className="mr-3 text-secondary text-xl" />
                <div>
                  <div className="font-bold text-lg">4.9/5</div>
                  <div className="text-xs text-text-muted">Tenant Rating</div>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="absolute -bottom-4 -left-4 glass-dark border border-secondary/30 text-white py-3 px-5 rounded-xl shadow-lg backdrop-blur-md">
              <div className="flex items-center">
                <FiAward className="mr-2 text-secondary" />
                <span className="font-medium text-sm">Award Winning</span>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Main Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Designed for{" "}
                <span className="text-secondary">Modern Living</span>
              </h3>

              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Experience premium apartment living with state-of-the-art
                amenities, modern architecture, and unparalleled comfort in the
                heart of the city.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: FiHome,
                  text: "Spacious Layouts",
                  color: "text-secondary",
                },
                {
                  icon: FiShield,
                  text: "24/7 Security",
                  color: "text-secondary",
                },
                {
                  icon: FiWifi,
                  text: "High-Speed WiFi",
                  color: "text-secondary",
                },
                {
                  icon: FiDroplet,
                  text: "Utilities Included",
                  color: "text-secondary",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center glass-dark p-4 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary/20 transition-colors">
                    <feature.icon className={`${feature.color} text-lg`} />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Premium Amenities */}
            <div className="glass-dark p-6 rounded-2xl border border-secondary/10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <FiStar className="text-secondary mr-3" />
                Premium Amenities
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Rooftop Garden",
                  "Swimming Pool",
                  "Fitness Center",
                  "Business Lounge",
                  "Secure Parking",
                  "Pet-Friendly",
                  "Concierge Service",
                  "Smart Home Tech",
                  "Eco-Friendly",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center group">
                    <FiCheck className="text-secondary mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-text-secondary text-sm group-hover:text-white transition-colors">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center group">
                Schedule a Tour
                <FiHome className="ml-2 group-hover:scale-110 transition-transform" />
              </button>
              <button className="btn-outline flex items-center group">
                <FiUsers className="mr-2 group-hover:scale-110 transition-transform" />
                View Floor Plans
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4 border-t border-secondary/10">
              <div className="flex items-center">
                <FiUsers className="text-secondary mr-2" />
                <div>
                  <div className="font-bold text-white">500+</div>
                  <div className="text-xs text-text-muted">Happy Residents</div>
                </div>
              </div>
              <div className="flex items-center">
                <FiAward className="text-secondary mr-2" />
                <div>
                  <div className="font-bold text-white">15+</div>
                  <div className="text-xs text-text-muted">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuildingSection;
