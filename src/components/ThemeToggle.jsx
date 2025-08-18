import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <button
      aria-label="Toggle Dark/Light Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-xl focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
