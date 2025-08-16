import React from 'react';
import { FiCheck, FiMapPin, FiHome, FiShield, FiStar, FiWifi, FiDroplet } from 'react-icons/fi';

const AboutBuildingSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-indigo-900/30 via-purple-900/20 to-pink-800/30 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 w-12 h-12 rounded-full bg-purple-500/10 blur-xl"></div>
      <div className="absolute bottom-20 right-8 w-16 h-16 rounded-full bg-pink-500/10 blur-xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Building Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center text-white">
                  <FiMapPin className="text-pink-400 mr-2" />
                  <span className="font-medium">Prime Downtown Location</span>
                </div>
              </div>
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-5 rounded-lg shadow-lg z-10">
              <div className="flex items-center">
                <FiStar className="mr-2 text-yellow-300" />
                <span className="font-bold">4.9/5 Tenant Rating</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Living Spaces Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Modern Tenants</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>
            </div>
            
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Discover luxury apartment rentals in the heart of the city, featuring modern designs and premium amenities. 
              Our buildings combine architectural elegance with smart living solutions for the perfect rental experience.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: FiHome, text: 'Spacious Layouts' },
                { icon: FiShield, text: '24/7 Security' },
                { icon: FiWifi, text: 'High-Speed Internet' },
                { icon: FiDroplet, text: 'Water & Power Backup' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-gray-900/60 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                  <feature.icon className="text-purple-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-200">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Amenities List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Premium Amenities:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Rooftop Garden', 'Swimming Pool', 'Fitness Center', 
                  'Community Lounge', 'Secure Parking', 'Pet-Friendly'
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheck className="text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
                Schedule a Tour <FiHome className="ml-2" />
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-purple-500 text-purple-300 font-medium rounded-lg hover:bg-purple-500/10 transition-colors">
                View Floor Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuildingSection;