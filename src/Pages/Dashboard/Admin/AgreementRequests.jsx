import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import NeonLoader from "../../../NeonLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiUser,
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiMail,
  FiCheck,
  FiX,
  FiClock,
  FiLayers,
  FiSquare,
  FiDroplet,
} from "react-icons/fi";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreementsCollection?status=pending");
      return res.data;
    },
  });

  const handleDecision = async (userEmail, agreementId, isAccept) => {
    try {
      // Step 1: Update agreement status
      await axiosSecure.patch(`/agreementsCollection/${agreementId}`, {
        status: isAccept ? "accepted" : "rejected",
      });

      // Step 2: If accepted, promote user to member
      if (isAccept) {
        await axiosSecure.patch(`/users/${userEmail}`, {
          role: "member",
        });
      }

      Swal.fire({
        icon: "success",
        title: isAccept ? "Agreement Accepted" : "Agreement Rejected",
        text: isAccept
          ? "User has been promoted to member."
          : "Agreement has been rejected.",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["agreementRequests"]);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (isLoading) return <NeonLoader />;

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-2">
            Agreement Requests
          </h1>
          <p className="text-gray-400 text-lg">
            Manage rental agreement requests from tenants
          </p>
        </div>
        <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2">
            <FiClock className="text-purple-400" />
            <span className="text-purple-300 font-medium">
              {requests.length} Pending
            </span>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="space-y-6">
        {requests.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-12 max-w-md mx-auto">
              <FiClock className="text-6xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Pending Requests
              </h3>
              <p className="text-gray-500">
                All agreement requests have been processed.
              </p>
            </div>
          </div>
        ) : (
          requests.map((req, index) => (
            <div
              key={req._id}
              className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-purple-500/30"
            >
              {/* Request Header */}
              <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600/30 backdrop-blur-sm rounded-2xl p-3">
                      <FiHome className="text-2xl text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {req.buildingName}
                      </h2>
                      <p className="text-gray-400">
                        Request #{index + 1} • Apartment {req.apartmentNo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-xl text-sm font-medium border border-amber-500/30">
                      <FiClock className="inline mr-2" />
                      Pending Review
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Tenant Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-600/30 rounded-xl p-2">
                          <FiUser className="text-lg text-purple-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-300">
                          Tenant Information
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-800/40 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <FiUser className="text-purple-400" />
                            <span className="text-sm text-gray-400 font-medium">
                              Full Name
                            </span>
                          </div>
                          <p className="text-white font-semibold text-lg">
                            {req.tenantName}
                          </p>
                        </div>

                        <div className="bg-gray-800/40 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <FiMail className="text-purple-400" />
                            <span className="text-sm text-gray-400 font-medium">
                              Email Address
                            </span>
                          </div>
                          <p className="text-white font-semibold break-all">
                            {req.tenantEmail}
                          </p>
                        </div>

                        <div className="bg-gray-800/40 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <FiCalendar className="text-purple-400" />
                            <span className="text-sm text-gray-400 font-medium">
                              Request Date
                            </span>
                          </div>
                          <p className="text-white font-semibold">
                            {new Date(req.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-2xl p-6 border border-green-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-600/30 rounded-xl p-2">
                          <FiHome className="text-lg text-green-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-300">
                          Property Details
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800/40 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FiHome className="text-green-400 text-sm" />
                              <span className="text-xs text-gray-400 font-medium">
                                Building
                              </span>
                            </div>
                            <p className="text-white font-semibold">
                              {req.buildingName}
                            </p>
                          </div>

                          <div className="bg-gray-800/40 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FiHome className="text-green-400 text-sm" />
                              <span className="text-xs text-gray-400 font-medium">
                                Apartment
                              </span>
                            </div>
                            <p className="text-white font-semibold">
                              {req.apartmentNo}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800/40 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FiLayers className="text-green-400 text-sm" />
                              <span className="text-xs text-gray-400 font-medium">
                                Floor
                              </span>
                            </div>
                            <p className="text-white font-semibold">
                              {req.floor}
                            </p>
                          </div>

                          {req.block && (
                            <div className="bg-gray-800/40 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FiLayers className="text-green-400 text-sm" />
                                <span className="text-xs text-gray-400 font-medium">
                                  Block
                                </span>
                              </div>
                              <p className="text-white font-semibold">
                                {req.block}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-800/40 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FiMapPin className="text-green-400 text-sm" />
                            <span className="text-xs text-gray-400 font-medium">
                              Location
                            </span>
                          </div>
                          <p className="text-white font-semibold">
                            {req.area}, {req.city}
                          </p>
                        </div>

                        <div className="bg-gray-800/40 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FiDollarSign className="text-green-400 text-sm" />
                            <span className="text-xs text-gray-400 font-medium">
                              Monthly Rent
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-green-400">
                            ৳{req.rent?.toLocaleString()}
                            <span className="text-sm text-gray-400 font-normal">
                              /month
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700/50">
                  <button
                    onClick={() =>
                      handleDecision(req.tenantEmail, req._id, true)
                    }
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    <FiCheck className="text-xl" />
                    Accept & Promote to Member
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(req.tenantEmail, req._id, false)
                    }
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    <FiX className="text-xl" />
                    Reject Request
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgreementRequests;
