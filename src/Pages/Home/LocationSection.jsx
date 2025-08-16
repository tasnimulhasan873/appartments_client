import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FiMapPin,
  FiNavigation,
  FiClock,
  FiTruck,
  FiMove,
} from "react-icons/fi";

// Fix marker icon issue for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationSection = () => {
  const position = [23.7805733, 90.2792399]; // Example: Dhaka

  const nearbyPlaces = [
    {
      name: "Metro Station",
      distance: "5 min walk",
      icon: FiMove,
      color: "text-blue-400",
    },
    {
      name: "Shopping Mall",
      distance: "10 min drive",
      icon: FiMapPin,
      color: "text-purple-400",
    },
    {
      name: "Hospital",
      distance: "7 min drive",
      icon: FiMapPin,
      color: "text-green-400",
    },
    {
      name: "Bus Stop",
      distance: "2 min walk",
      icon: FiTruck,
      color: "text-orange-400",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <FiMapPin className="text-2xl sm:text-3xl text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Perfect Location & Connectivity
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Strategically located with easy access to all city amenities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Location Details */}
          <div className="space-y-6 sm:space-y-8">
            {/* Address Card */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-4">
                  <FiMapPin className="text-xl sm:text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Prime Address
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4 text-gray-300">
                <p className="text-base sm:text-lg leading-relaxed">
                  Our building is strategically positioned in the heart of the
                  city, offering unparalleled access to business districts,
                  entertainment hubs, and essential services.
                </p>

                <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <FiMapPin className="text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        <strong className="text-white">Address:</strong> House
                        23, Block C, Mirpur, Dhaka
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiNavigation className="text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        <strong className="text-white">Area:</strong> Premium
                        Residential Zone
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        <strong className="text-white">Accessibility:</strong>{" "}
                        24/7 All Transport
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Nearby Conveniences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800/50 p-3 sm:p-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    <place.icon
                      className={`text-lg sm:text-xl ${place.color} mr-3 flex-shrink-0`}
                    />
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {place.name}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {place.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Transportation Options
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-800/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center">
                    <FiMove className="text-blue-400 mr-3 text-lg" />
                    <span className="text-white text-sm sm:text-base">
                      Metro Station
                    </span>
                  </div>
                  <span className="text-green-400 font-medium text-sm sm:text-base">
                    5 min walk
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-800/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center">
                    <FiTruck className="text-orange-400 mr-3 text-lg" />
                    <span className="text-white text-sm sm:text-base">
                      Bus Routes: 2, 10, 60
                    </span>
                  </div>
                  <span className="text-green-400 font-medium text-sm sm:text-base">
                    2 min walk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="relative">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
              <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={false}
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 0 }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <div className="text-center p-2">
                      <strong>Our Premium Building</strong>
                      <br />
                      House 23, Block C<br />
                      Mirpur, Dhaka
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* Map Overlay Info */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white p-3 sm:p-4 rounded-xl z-[1000]">
                <div className="flex items-center">
                  <FiMapPin className="text-purple-400 mr-2" />
                  <span className="font-medium text-sm sm:text-base">
                    Our Location
                  </span>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                <FiNavigation className="mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
