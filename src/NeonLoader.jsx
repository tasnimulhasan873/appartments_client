import React from "react";

const NeonLoader = ({ size = "default", overlay = true }) => {
  const sizeClasses = {
    small: "w-16 h-16",
    default: "w-32 h-32",
    large: "w-48 h-48",
  };

  const LoaderContent = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-light border-r-primary animate-spin-slow"></div>

      {/* Inner gradient circle */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-light to-primary-dark shadow-lg shadow-primary/30 animate-pulse-slow"></div>

      {/* Floating orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-light rounded-full animate-float"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full animate-float-delay"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-primary-dark rounded-full animate-float-delay-2"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary font-bold text-xs tracking-widest">
          LOADING...
        </span>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-overlay backdrop-blur-sm z-50">
        <LoaderContent />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <LoaderContent />
    </div>
  );
};

export default NeonLoader;
