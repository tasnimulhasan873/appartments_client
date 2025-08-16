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
    <div className="min-h-screen bg-primary overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-16 px-2 sm:px-4 md:px-8">
        {/* Modern animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-card-bg)] to-[var(--color-surface)] opacity-90"></div>
          <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-secondary animate-float animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-16 w-6 h-6 rounded-full bg-white/10 animate-float-delay blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-secondary/40 animate-float-delay-2"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          <SliderSection />
        </div>
      </section>

      {/* About Section with Enhanced Glass Morphism */}
      <section className="relative py-8 sm:py-12 lg:py-16 px-2 sm:px-4 md:px-8">
        <Slide triggerOnce direction="up" duration={600} delay={100}>
          <div className="max-w-7xl mx-auto">
            <div className="glass-dark rounded-3xl shadow-xl overflow-hidden animate-slideInUp">
              <AboutBuildingSection />
            </div>
          </div>
        </Slide>
      </section>

      {/* Stats Section */}
      <Zoom triggerOnce duration={600} delay={150}>
        <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: FiHome,
                  value: "500+",
                  label: "Premium Apartments",
                  gradient: "from-secondary to-blue-400",
                },
                {
                  icon: FiUsers,
                  value: "2000+",
                  label: "Happy Residents",
                  gradient: "from-secondary to-cyan-400",
                },
                {
                  icon: FiStar,
                  value: "4.9/5",
                  label: "Satisfaction Rating",
                  gradient: "from-secondary to-teal-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="card-bg rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 group animate-slideInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-full mb-4 group-hover:animate-pulse-glow`}
                  >
                    <stat.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Zoom>

      {/* Coupons Section with Enhanced Floating Elements */}
      <section className="relative py-8 sm:py-12 lg:py-16 px-2 sm:px-4 md:px-8 bg-[var(--color-primary)]/95">
        {/* Enhanced Floating decorative elements */}
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-secondary animate-float"></div>
        <div className="absolute bottom-1/4 right-16 w-6 h-6 rounded-full bg-white/10 animate-float-delay"></div>
        <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full bg-secondary/25 animate-pulse"></div>

        <Zoom triggerOnce duration={600} delay={200}>
          <div className="max-w-7xl mx-auto">
            <div className="glass-dark rounded-3xl shadow-xl overflow-hidden">
              <CouponsSection />
            </div>
          </div>
        </Zoom>
      </section>

      {/* Location Section with Enhanced Interactive Design */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 md:px-8 bg-[var(--color-primary)]/90">
        <Fade triggerOnce duration={800} delay={300}>
          <div className="max-w-7xl mx-auto">
            <div className="glass-dark rounded-3xl shadow-xl overflow-hidden">
              <LocationSection />
            </div>
          </div>
        </Fade>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-2 sm:px-4 md:px-8 bg-[var(--color-secondary)]/10">
        <div className="absolute inset-0 bg-[var(--color-secondary)]/10"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-secondary)]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>

        <Fade triggerOnce duration={800} delay={400}>
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow">
                Ready to Experience
                <span className="block sm:inline"> Luxury Living?</span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Schedule a private tour and get exclusive access to our premium
              amenities.
              <span className="block mt-2">
                Join thousands of satisfied residents today!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-md sm:max-w-none mx-auto">
              <Link
                to="/contact"
                className="btn-primary flex items-center gap-2 group"
              >
                <FiPhone className="text-lg group-hover:scale-110 transition-transform" />
                Contact Us
              </Link>
              <Link
                to="/apartments"
                className="btn-outline flex items-center gap-2"
              >
                <FiHome className="text-lg" />
                View Apartments
              </Link>
            </div>
          </div>
        </Fade>
      </section>
    </div>
  );
};

export default Home;
