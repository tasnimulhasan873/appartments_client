import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // ✅ Secure axios hook

const MemberAnnouncements = () => {
  const axiosSecure = useAxiosSecure(); // ✅ use secure axios
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const {
    data: announcements = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  // Filter announcements based on search and priority
  const filteredAnnouncements = announcements.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || item.message)
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || item.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-400 bg-red-900/20 border-red-700";
      case "high":
        return "text-orange-400 bg-orange-900/20 border-orange-700";
      default:
        return "text-blue-400 bg-blue-900/20 border-blue-700";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return "🚨";
      case "high":
        return "⚡";
      default:
        return "📋";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen font-sans w-full">
      {/* Mobile menu spacing */}
      <div className="lg:hidden h-16"></div>

      <div className="w-full">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-8">
          Member Announcements
        </h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 p-4 rounded-2xl w-full">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search announcements..."
                className="w-full bg-gray-800/60 border border-gray-700 text-gray-300 placeholder-gray-500 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <span className="absolute left-3 top-3 text-gray-500">🔍</span>
            </div>

            {/* Priority Filter */}
            <div className="relative lg:w-64">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 text-gray-300 pl-10 pr-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="all">All Priorities</option>
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <span className="absolute left-3 top-3 text-gray-500">⚡</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg text-purple-400"></span>
            <p className="text-gray-300 ml-3">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">
              Error loading announcements. Please try again.
            </p>
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {searchQuery || priorityFilter !== "all"
                ? "No announcements match your filters."
                : "No announcements available."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 w-full">
            {filteredAnnouncements.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 p-6 rounded-2xl shadow-xl text-gray-300 transition-all hover:shadow-2xl hover:border-gray-600/50 w-full"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-4">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 flex-1">
                    {item.title}
                  </h2>

                  {/* Priority Badge */}
                  {item.priority && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        item.priority
                      )} self-start lg:self-auto`}
                    >
                      {getPriorityIcon(item.priority)}{" "}
                      {item.priority?.charAt(0).toUpperCase() +
                        item.priority?.slice(1)}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.description || item.message}
                </p>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-2">
                  <div className="text-gray-500">
                    {item.authorName && (
                      <span className="mr-4">📝 By {item.authorName}</span>
                    )}
                    <span>📅 {formatDate(item.createdAt || item.date)}</span>
                  </div>

                  {item.viewCount !== undefined && (
                    <span className="text-gray-500">
                      👁️ {item.viewCount} views
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberAnnouncements;
