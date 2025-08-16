import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/UseAuth";
import NeonLoader from "../../../NeonLoader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <NeonLoader />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-[60vh] font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-4 sm:mb-6">
          Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-xl sm:rounded-2xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-lg shadow-xl">
            <p className="text-gray-400 text-base sm:text-lg">No payment history found</p>
          </div>
        ) : (
          <div className="rounded-xl sm:rounded-2xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-lg shadow-xl overflow-hidden">
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4 p-4">
              {payments.map((payment, index) => (
                <div 
                  key={payment._id}
                  className="bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-700/30"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">#</p>
                      <p>{index + 1}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Month</p>
                      <p>{payment.month}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Amount</p>
                      <p>${payment.rent}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Date</p>
                      <p>{new Date(payment.paymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700/30">
                    <p className="text-gray-400 text-sm">Transaction ID</p>
                    <p className="text-purple-400 font-medium break-all">
                      {payment.transactionId}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <table className="hidden md:table w-full text-sm sm:text-base text-gray-300">
              <thead>
                <tr className="bg-gray-800/60 text-purple-300">
                  <th className="p-3 sm:p-4 font-medium text-left">#</th>
                  <th className="p-3 sm:p-4 font-medium text-left">Month</th>
                  <th className="p-3 sm:p-4 font-medium text-left">Amount</th>
                  <th className="p-3 sm:p-4 font-medium text-left">Transaction ID</th>
                  <th className="p-3 sm:p-4 font-medium text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="border-t border-gray-700/50 hover:bg-purple-900/20 transition-all duration-300"
                  >
                    <td className="p-3 sm:p-4">{index + 1}</td>
                    <td className="p-3 sm:p-4">{payment.month}</td>
                    <td className="p-3 sm:p-4">${payment.rent}</td>
                    <td className="p-3 sm:p-4 text-purple-400 font-medium break-all">
                      {payment.transactionId}
                    </td>
                    <td className="p-3 sm:p-4">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;