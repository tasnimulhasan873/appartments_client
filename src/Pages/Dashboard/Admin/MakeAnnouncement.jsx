import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // ✅ secure Axios
import useAuth from "../../../hooks/UseAuth"; // ✅ get user context

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure(); // ✅ use secure instance
  const { user } = useAuth(); // ✅ get current user
  const [loading, setLoading] = useState(false);
  const [audienceType, setAudienceType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searching, setSearching] = useState(false);

  // Search members by name
  const searchMembers = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);
      // Update the API endpoint to match your backend structure
      const res = await axiosSecure.get(`/api/members/search?search=${query}`);

      // Handle the new response structure
      const results = res.data?.results || res.data || [];

      // Map the response to ensure consistent field names
      const mappedResults = results.map((member) => ({
        ...member,
        name: member.name || member.tenantName, // Use tenantName if name doesn't exist
        email: member.email || member.tenantEmail, // Use tenantEmail if email doesn't exist
      }));

      setSearchResults(mappedResults);
    } catch (error) {
      console.error("Error searching members:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchMembers(query);
  };

  // Handle member selection
  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setSearchQuery(member.name);
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const priority = e.target.priority.value;

    if (!title || !description) {
      return Swal.fire("Error", "Please fill out all fields.", "error");
    }

    if (audienceType === "specific" && !selectedMember) {
      return Swal.fire("Error", "Please select a specific member.", "error");
    }

    const announcement = {
      title,
      description,
      authorEmail: user?.email || "admin@example.com", // ✅ include admin email
      authorName: user?.displayName || "Admin", // ✅ include admin name
      createdAt: new Date().toISOString(), // ✅ better field name
      updatedAt: new Date().toISOString(), // ✅ track updates
      status: "active", // ✅ announcement status
      priority, // ✅ announcement priority from form
      targetAudience:
        audienceType === "all" ? "all_members" : "specific_member", // ✅ target audience from form
      searchTenantName:
        audienceType === "specific" && selectedMember
          ? selectedMember.tenantName || selectedMember.name
          : undefined,
      viewCount: 0, // ✅ track how many times viewed
      isArchived: false, // ✅ archive status
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post("/api/announcements", announcement); // ✅ secured POST
      if (res.data.insertedId || res.data.success) {
        const targetedCount = res.data.targetedMembers || 0;
        const successMessage =
          audienceType === "specific"
            ? `Announcement posted successfully! Targeted ${targetedCount} member(s).`
            : "Announcement posted successfully!";

        Swal.fire("Success", successMessage, "success");
        e.target.reset();
        setAudienceType("all");
        setSearchQuery("");
        setSelectedMember(null);
        setSearchResults([]);
      } else {
        Swal.fire("Error", res.data.error || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || "Failed to make announcement";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 sm:p-6 lg:p-8 font-inter">
      {/* Mobile menu spacing */}
      <div className="lg:hidden h-16"></div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-2">
              Make an Announcement
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Create and send announcements to your community members
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="relative">
              <label className="block text-gray-300 font-medium mb-3 text-sm">
                Announcement Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter a clear and descriptive title"
                className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 placeholder-gray-500 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
              <span className="absolute left-4 top-12 text-gray-500 text-lg">
                📝
              </span>
            </div>

            {/* Priority and Audience Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Priority Select */}
              <div className="relative">
                <label className="block text-gray-300 font-medium mb-3 text-sm">
                  Priority Level
                </label>
                <select
                  name="priority"
                  className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="normal">📋 Normal Priority</option>
                  <option value="high">⚡ High Priority</option>
                  <option value="urgent">🚨 Urgent</option>
                </select>
                <span className="absolute left-4 top-12 text-gray-500 text-lg">
                  ⚡
                </span>
              </div>

              {/* Target Audience Select */}
              <div className="relative">
                <label className="block text-gray-300 font-medium mb-3 text-sm">
                  Target Audience
                </label>
                <select
                  value={audienceType}
                  onChange={(e) => {
                    setAudienceType(e.target.value);
                    if (e.target.value === "all") {
                      setSearchQuery("");
                      setSelectedMember(null);
                      setSearchResults([]);
                    }
                  }}
                  className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="all">👥 All Members</option>
                  <option value="specific">👤 Specific Member</option>
                </select>
                <span className="absolute left-4 top-12 text-gray-500 text-lg">
                  👥
                </span>
              </div>
            </div>

            {/* Member Search - Only show when "Specific Member" is selected */}
            {audienceType === "specific" && (
              <div className="relative">
                <label className="block text-gray-300 font-medium mb-3 text-sm">
                  Search Member
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type member name to search..."
                  className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 placeholder-gray-500 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <span className="absolute left-4 top-12 text-gray-500 text-lg">
                  🔍
                </span>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {searchResults.map((member) => (
                      <div
                        key={member._id}
                        onClick={() => handleMemberSelect(member)}
                        className="px-4 py-4 hover:bg-gray-700/80 cursor-pointer border-b border-gray-700/50 last:border-b-0 transition-colors"
                      >
                        <div className="text-gray-200 font-medium text-sm">
                          {member.name}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          {member.email}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Loading indicator */}
                {searching && (
                  <div className="absolute right-4 top-12 text-gray-500">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                  </div>
                )}

                {/* Selected member display */}
                {selectedMember && (
                  <div className="mt-3 p-4 bg-gray-800/80 border border-gray-600 rounded-xl">
                    <div className="text-green-400 text-xs font-medium mb-1">
                      ✓ Selected Member:
                    </div>
                    <div className="text-gray-200 font-medium">
                      {selectedMember.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {selectedMember.email}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description Input */}
            <div className="relative">
              <label className="block text-gray-300 font-medium mb-3 text-sm">
                Announcement Content
              </label>
              <textarea
                name="description"
                rows="6"
                placeholder="Write your announcement content here. Be clear and concise..."
                className="w-full bg-gray-800/60 border border-gray-600 text-gray-200 placeholder-gray-500 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                required
              />
              <span className="absolute left-4 top-12 text-gray-500 text-lg">
                📢
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all transform text-sm sm:text-base ${
                  loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Posting Announcement...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">📤</span>
                    Post Announcement
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
