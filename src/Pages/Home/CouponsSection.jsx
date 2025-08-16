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
      <section className="relative bg-primary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-danger/20">
            <FiTag className="text-3xl text-danger" />
          </div>
          <h3 className="text-2xl font-bold text-danger mb-4">
            Unable to Load Coupons
          </h3>
          <p className="text-text-secondary mb-4 max-w-md mx-auto">
            We're having trouble connecting to our coupon service. Please check
            that your backend server is running.
          </p>
          <div className="glass-dark p-4 rounded-xl border border-danger/10 max-w-lg mx-auto mb-6">
            <p className="text-sm text-text-muted">
              Error Details: {error.message}
            </p>
          </div>
          <button className="btn-outline border-danger text-danger hover:bg-danger hover:text-white">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-primary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-card-bg/20 to-primary"></div>
      <div className="absolute top-24 left-12 w-32 h-32 bg-secondary/8 rounded-full blur-3xl animate-float-delay"></div>
      <div className="absolute bottom-40 right-16 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-6 backdrop-blur-sm border border-secondary/20">
            <FiGift className="text-2xl sm:text-3xl text-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Exclusive Deals & Offers
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-text-secondary text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Unlock amazing savings and exclusive benefits for your new home
          </p>
        </div>

        {coupons.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="glass-dark w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-secondary/10">
              <FiTag className="text-3xl sm:text-4xl text-secondary/50" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              No Active Coupons
            </h3>
            <p className="text-text-secondary text-lg mb-2">
              No active coupons available at the moment.
            </p>
            <p className="text-text-muted">
              Check back soon for exciting offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="relative glass-dark rounded-3xl shadow-xl overflow-hidden border border-secondary/10 group hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:-translate-y-2 hover:border-secondary/20"
              >
                {/* Discount Badge */}
                <div className="absolute -top-4 -right-4 z-20">
                  <div className="bg-gradient-to-r from-secondary to-white text-primary text-sm font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    {coupon.discount}% OFF
                  </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-secondary/10 rounded-full blur-lg animate-pulse-glow"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-white/10 rounded-full blur-md"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 group-hover:to-secondary/10 transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-xl mb-6 group-hover:bg-secondary/20 transition-colors border border-secondary/10">
                    <FiTag className="text-2xl text-secondary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300">
                    {coupon.code}
                  </h3>

                  <p className="text-text-secondary leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {coupon.description}
                  </p>

                  {/* Date */}
                  {coupon.createdAt && (
                    <div className="flex items-center text-sm text-text-muted mb-6 group-hover:text-text-secondary transition-colors">
                      <FiClock className="mr-2 text-secondary flex-shrink-0" />
                      Available since:{" "}
                      {new Date(coupon.createdAt).toLocaleDateString()}
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="btn-primary w-full group-hover:scale-105 transition-transform duration-300">
                    Use This Coupon
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-secondary/5 to-white/5 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {coupons.length > 0 && (
          <div className="text-center mt-16 sm:mt-20">
            <div className="glass-dark rounded-2xl p-8 border border-secondary/10 max-w-2xl mx-auto">
              <FiGift className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">
                Want More Exclusive Offers?
              </h3>
              <p className="text-text-secondary mb-6">
                Join our premium membership to unlock even more exclusive deals
                and benefits
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">View All Offers</button>
                <button className="btn-outline">Become a Member</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponsSection;
