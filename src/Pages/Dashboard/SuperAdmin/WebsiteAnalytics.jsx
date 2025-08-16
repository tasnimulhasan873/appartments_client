import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaEye,
  FaMousePointer,
  FaClock,
} from "react-icons/fa";

const WebsiteAnalytics = () => {
  // Mock data - replace with real analytics data
  const analyticsData = {
    totalVisitors: 15420,
    pageViews: 45230,
    bounceRate: 35.2,
    avgSessionTime: "4:32",
    conversionRate: 12.8,
    topPages: [
      { page: "/apartments", views: 8500, percentage: 18.8 },
      { page: "/", views: 7200, percentage: 15.9 },
      { page: "/login", views: 4800, percentage: 10.6 },
      { page: "/register", views: 3200, percentage: 7.1 },
    ],
    recentActivity: [
      {
        time: "2 min ago",
        action: "New user registration",
        user: "john@example.com",
      },
      {
        time: "5 min ago",
        action: "Apartment booking",
        user: "sarah@example.com",
      },
      {
        time: "8 min ago",
        action: "Payment completed",
        user: "mike@example.com",
      },
      { time: "12 min ago", action: "New inquiry", user: "anna@example.com" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <FaChartLine className="text-4xl text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">Website Analytics</h1>
            <p className="text-purple-100">
              Monitor website performance and user behavior
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Visitors</p>
              <p className="text-3xl font-bold">
                {analyticsData.totalVisitors.toLocaleString()}
              </p>
            </div>
            <FaUsers className="text-3xl text-blue-200" />
          </div>
          <div className="mt-2 text-sm text-blue-100">
            <span className="text-green-300">↑ 12.5%</span> vs last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Page Views</p>
              <p className="text-3xl font-bold">
                {analyticsData.pageViews.toLocaleString()}
              </p>
            </div>
            <FaEye className="text-3xl text-green-200" />
          </div>
          <div className="mt-2 text-sm text-green-100">
            <span className="text-green-300">↑ 8.3%</span> vs last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Bounce Rate</p>
              <p className="text-3xl font-bold">{analyticsData.bounceRate}%</p>
            </div>
            <FaMousePointer className="text-3xl text-purple-200" />
          </div>
          <div className="mt-2 text-sm text-purple-100">
            <span className="text-red-300">↓ 2.1%</span> vs last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Session</p>
              <p className="text-3xl font-bold">
                {analyticsData.avgSessionTime}
              </p>
            </div>
            <FaClock className="text-3xl text-orange-200" />
          </div>
          <div className="mt-2 text-sm text-orange-100">
            <span className="text-green-300">↑ 15.2%</span> vs last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Conversion</p>
              <p className="text-3xl font-bold">
                {analyticsData.conversionRate}%
              </p>
            </div>
            <FaChartLine className="text-3xl text-pink-200" />
          </div>
          <div className="mt-2 text-sm text-pink-100">
            <span className="text-green-300">↑ 3.7%</span> vs last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-gray-900/80 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Top Pages</h2>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{page.page}</p>
                    <p className="text-gray-400 text-sm">
                      {page.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-bold">
                    {page.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900/80 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.user}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Chart Placeholder */}
        <div className="bg-gray-900/80 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6">
            Traffic Overview
          </h2>
          <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <FaChartLine className="text-4xl mx-auto mb-4" />
              <p>Chart visualization would go here</p>
              <p className="text-sm">
                Integrate with Chart.js or similar library
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteAnalytics;
