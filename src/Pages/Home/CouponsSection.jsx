import { useQuery } from "@tanstack/react-query";
import { FiTag, FiClock, FiGift } from "react-icons/fi";
import useAxios from "../../hooks/UseAxios";
import NeonLoader from "../../NeonLoader";

const CouponsSection = () => {
  const axiosSecure = useAxios();

  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupon");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="py-12">
        <NeonLoader />
      </div>
    );

  // Show error state if API call fails
  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTag className="text-2xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            Unable to load coupons
          </h3>
          <p className="text-gray-400 mb-4">
            Please make sure your backend server is running on the correct port.
          </p>
          <p className="text-sm text-gray-500">Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <FiGift className="text-2xl sm:text-3xl text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Exclusive Deals & Offers
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Don't miss out on these amazing savings opportunities for your new
            home
          </p>
        </div>

        {coupons.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTag className="text-2xl sm:text-3xl text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg sm:text-xl">
              No active coupons available at the moment.
            </p>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Check back soon for exciting offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Discount Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform duration-300">
                    {coupon.discount}% OFF
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-purple-500/20 rounded-full blur-md"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-pink-500/20 rounded-full blur-md"></div>

                <div className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl mb-4 sm:mb-6">
                    <FiTag className="text-xl sm:text-2xl text-purple-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:from-purple-200 group-hover:to-pink-300 transition-all duration-300">
                    {coupon.code}
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {coupon.description}
                  </p>

                  {/* Date */}
                  {coupon.createdAt && (
                    <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-4">
                      <FiClock className="mr-2 text-purple-400" />
                      Available since:{" "}
                      {new Date(coupon.createdAt).toLocaleDateString()}
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                    Use This Coupon
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-2xl sm:rounded-3xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {coupons.length > 0 && (
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              More exclusive offers available for registered members
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-purple-500 text-purple-300 font-semibold rounded-full hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200 transition-all duration-300 text-sm sm:text-base">
              View All Offers
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponsSection;
