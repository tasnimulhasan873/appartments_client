import React from "react";

// type: "fill" | "outline"
const Button = ({ type = "fill", children, className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-2 rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary text-base disabled:opacity-50 disabled:cursor-not-allowed";
  const fill =
    "bg-gradient-to-r from-primary-light to-primary text-white shadow-md hover:from-primary hover:to-primary-dark";
  const outline =
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white";
  return (
    <button
      className={`${base} ${type === "fill" ? fill : outline} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
