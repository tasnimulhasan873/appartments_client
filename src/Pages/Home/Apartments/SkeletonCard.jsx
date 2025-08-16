// SkeletonCard.js
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <div className="bg-gray-200 dark:bg-gray-700 h-56 w-full animate-pulse"></div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-32 rounded animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-40 rounded animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-16 rounded animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-6 rounded-full mb-2 animate-pulse"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-3 w-12 rounded animate-pulse mb-1"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-8 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-200 dark:bg-gray-700 h-12 w-full rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;