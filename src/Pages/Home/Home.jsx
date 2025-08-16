import React from "react";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import {
  FiMail,
  FiPhone,
  FiClock,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiStar,
  FiUsers,
  FiHome,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import SliderSection from "./SliderSection";
import AboutBuildingSection from "./AboutBuildingSection";
import CouponsSection from "./CouponsSection";
import LocationSection from "./LocationSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light font-['Inter'] overflow-x-hidden">
      {/* Hero Section with Enhanced Responsive Design */}
      <section className="relative min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blurPurple via-glow to-transparent animate-moveGradient"></div>
          <div className="absolute top-20 left-10 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-blurPurple blur-sm animate-float"></div>
          <div className="absolute bottom-1/4 right-16 w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-primary-light/20 blur-sm animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary-light/40 blur-sm animate-pulse"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          <SliderSection />
        </div>
      </section>

      {/* About Section with Enhanced Glass Morphism */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <Slide triggerOnce direction="up" duration={600} delay={100}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden">
              <AboutBuildingSection />
            </div>
          </div>
        </Slide>
      </section>

      {/* Stats Section */}
      <Zoom triggerOnce duration={600} delay={150}>
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: FiHome,
                  value: "500+",
                  label: "Premium Apartments",
                  color: "from-primary-dark to-primary",
                },
                {
                  icon: FiUsers,
                  value: "2000+",
                  label: "Happy Residents",
                  color: "from-primary-light to-primary",
                },
                {
                  icon: FiStar,
                  value: "4.9/5",
                  label: "Satisfaction Rating",
                  color: "from-primary to-primary-dark",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-overlay backdrop-blur-lg rounded-xl sm:rounded-2xl border border-glow p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${stat.color} rounded-full mb-3 sm:mb-4`}
                  >
                    <stat.icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Zoom>

      {/* Coupons Section with Enhanced Floating Elements */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-dark/30 via-transparent to-primary-light/30">
        {/* Enhanced Floating decorative elements */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blurPurple blur-md animate-float"></div>
        <div className="absolute bottom-1/4 right-8 sm:right-16 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-primary-light/20 blur-md animate-float-delay"></div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary/25 blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary-light/30 blur-sm animate-float"></div>

        <Zoom triggerOnce duration={600} delay={200}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-xl overflow-hidden">
              <CouponsSection />
            </div>
          </div>
        </Zoom>
      </section>

      {/* Location Section with Enhanced Interactive Design */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-primary-dark/50 via-primary/30 to-transparent">
        <Fade triggerOnce duration={800} delay={300}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-xl overflow-hidden">
              <LocationSection />
            </div>
          </div>
        </Fade>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-light via-primary to-primary-dark">
        <div className="absolute inset-0 bg-overlay"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-glow rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blurPurple rounded-full blur-2xl animate-float"></div>

        <Fade triggerOnce duration={800} delay={400}>
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Ready to Experience
                <span className="block sm:inline"> Luxury Living?</span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              Schedule a private tour and get exclusive access to our premium
              amenities.
              <span className="block mt-2">
                Join thousands of satisfied residents today!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-md sm:max-w-none mx-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-ctaText font-bold text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <FiPhone className="text-lg group-hover:scale-110 transition-transform" />
                Contact Us
              </Link>
            </div>

          </div>
        </Fade>
      </section>
    </div>
  );
};

export default Home;
