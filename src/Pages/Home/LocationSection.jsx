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
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      name: "Shopping Mall",
      distance: "10 min drive",
      icon: FiMapPin,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      name: "Hospital",
      distance: "7 min drive",
      icon: FiMapPin,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      name: "Bus Stop",
      distance: "2 min walk",
      icon: FiTruck,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <section className="relative bg-primary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface/30 to-primary"></div>
      <div className="absolute top-32 right-16 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-float-delay"></div>
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-6 backdrop-blur-sm border border-secondary/20">
            <FiMapPin className="text-2xl sm:text-3xl text-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Perfect Location & Connectivity
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Strategically located with seamless access to all city amenities and
            transport hubs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Location Details */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="glass-dark rounded-3xl p-8 border border-secondary/10 hover:border-secondary/20 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-secondary/20 transition-colors">
                  <FiMapPin className="text-2xl text-secondary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Prime Address
                </h3>
              </div>

              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Strategically positioned in the heart of the city, offering
                unparalleled access to business districts, entertainment hubs,
                and essential services.
              </p>

              <div className="glass rounded-xl p-6 border border-secondary/5">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMapPin className="text-secondary mr-3 flex-shrink-0" />
                    <span className="text-white">
                      <strong>Address:</strong> House 23, Block C, Mirpur, Dhaka
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiNavigation className="text-secondary mr-3 flex-shrink-0" />
                    <span className="text-white">
                      <strong>Area:</strong> Premium Residential Zone
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-secondary mr-3 flex-shrink-0" />
                    <span className="text-white">
                      <strong>Accessibility:</strong> 24/7 All Transport
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="glass-dark rounded-3xl p-8 border border-secondary/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiNavigation className="text-secondary mr-3" />
                Nearby Conveniences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center glass p-4 rounded-xl hover:bg-secondary/5 transition-all duration-300 border border-secondary/5 group"
                  >
                    <div
                      className={`w-10 h-10 ${place.bgColor} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
                    >
                      <place.icon className={`text-lg ${place.color}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{place.name}</p>
                      <p className="text-text-muted text-sm">
                        {place.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div className="glass-dark rounded-3xl p-8 border border-secondary/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiTruck className="text-secondary mr-3" />
                Transportation Hub
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between glass p-4 rounded-xl border border-secondary/5 group hover:border-secondary/20 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/20 transition-colors">
                      <FiMove className="text-secondary" />
                    </div>
                    <span className="text-white font-medium">
                      Metro Station
                    </span>
                  </div>
                  <span className="text-secondary font-semibold">
                    5 min walk
                  </span>
                </div>
                <div className="flex items-center justify-between glass p-4 rounded-xl border border-secondary/5 group hover:border-secondary/20 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/20 transition-colors">
                      <FiTruck className="text-secondary" />
                    </div>
                    <span className="text-white font-medium">
                      Bus Routes: 2, 10, 60
                    </span>
                  </div>
                  <span className="text-secondary font-semibold">
                    2 min walk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="relative">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-secondary/20 group">
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
              <div className="absolute top-6 left-6 glass-dark backdrop-blur-md text-white p-4 rounded-xl z-[1000] border border-secondary/20">
                <div className="flex items-center">
                  <FiMapPin className="text-secondary mr-3" />
                  <div>
                    <div className="font-semibold">Our Location</div>
                    <div className="text-xs text-text-muted">
                      Premium Building
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:to-secondary/10 transition-all duration-500 rounded-3xl"></div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button className="btn-primary w-full flex items-center justify-center group">
                <FiNavigation className="mr-3 group-hover:scale-110 transition-transform" />
                Get Directions
              </button>
              <button className="btn-outline w-full flex items-center justify-center group">
                <FiMapPin className="mr-3 group-hover:scale-110 transition-transform" />
                View on Google Maps
              </button>
            </div>

            {/* Location Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="glass-dark p-4 rounded-xl border border-secondary/10 text-center">
                <div className="text-2xl font-bold text-secondary">5</div>
                <div className="text-sm text-text-muted">Min to Metro</div>
              </div>
              <div className="glass-dark p-4 rounded-xl border border-secondary/10 text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-text-muted">Transport</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
