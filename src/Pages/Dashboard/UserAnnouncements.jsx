import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBullhorn, FaCalendar, FaClock } from "react-icons/fa";
import NeonLoader from "../../NeonLoader";

const UserAnnouncements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return <NeonLoader size="default" overlay={false} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Announcements
              </h1>
              <p className="text-primary-light text-sm sm:text-base">
                Stay updated with the latest news
              </p>
            </div>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></div>
        </div>

        {/* Content */}
        {announcements.length === 0 ? (
          <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-light/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBullhorn className="text-primary-light text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              No Announcements Yet
            </h3>
            <p className="text-primary-light/80">
              Check back later for important updates and news.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Announcement Header */}
                <div className="bg-gradient-to-r from-primary-light/10 to-primary/10 px-6 sm:px-8 py-4 sm:py-6 border-b border-glow/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-2 text-primary-light text-sm">
                      <FaCalendar className="text-xs" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Announcement Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-white/90 leading-relaxed text-sm sm:text-base lg:text-lg mb-4">
                    {item.message}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-glow/20">
                    <div className="flex items-center gap-2 text-primary-light/80 text-xs sm:text-sm">
                      <FaClock className="text-xs" />
                      <span>
                        Posted on {new Date(item.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm text-primary-light font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncements;
