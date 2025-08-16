import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiLogIn,
  FiLogOut,
  FiHome,
  FiGrid,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import UseAuth from "../../hooks/UseAuth";
import Logo from "./logo";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all font-medium flex items-center gap-2 py-2 px-4 rounded-lg ${
              isActive
                ? "bg-[var(--color-secondary)] text-white shadow-md"
                : "text-white hover:bg-[var(--color-secondary)]/20 hover:text-[var(--color-secondary)]"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <FiHome className="text-lg" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartments"
          className={({ isActive }) =>
            `transition-all font-medium flex items-center gap-2 py-2 px-4 rounded-lg ${
              isActive
                ? "bg-[var(--color-secondary)] text-white shadow-md"
                : "text-white hover:bg-[var(--color-secondary)]/20 hover:text-[var(--color-secondary)]"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <FiGrid className="text-lg" /> Apartments
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-[var(--color-card-bg)]/95 backdrop-blur-lg border-b border-[var(--color-secondary)] shadow-lg sticky top-0 z-50 font-inter">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 items-center text-base">
          {navItems}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer rounded-full p-1 pr-3 hover:bg-[var(--color-secondary)]/20 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="relative">
                  <img
                    src={user.photoURL || "/avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-[var(--color-secondary)] object-cover transition-all"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-secondary)] rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium text-white hidden sm:block">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
                <FiChevronDown
                  className={`text-white transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-56 bg-[var(--color-card-bg)]/95 backdrop-blur-lg border border-[var(--color-secondary)] rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[var(--color-secondary)]/50">
                      <p className="font-semibold text-white truncate">
                        {user.displayName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-200 truncate">
                        {user.email}
                      </p>
                    </div>

                    <NavLink
                      to="/dashboard"
                      className="px-4 py-3 hover:bg-[var(--color-secondary)]/20 text-white hover:text-[var(--color-secondary)] flex items-center gap-2 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUser /> Dashboard
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-white hover:text-red-400 flex items-center gap-2 transition"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-[var(--color-secondary)] hover:bg-white hover:text-[var(--color-secondary)] text-white font-medium transition-all py-2 px-5 rounded-lg flex items-center gap-2 shadow-md border border-[var(--color-secondary)]"
            >
              <FiLogIn className="text-lg" /> Login
            </NavLink>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl p-2 rounded-lg bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/30 transition-all"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-card-bg)]/95 backdrop-blur-lg border-t border-[var(--color-secondary)]"
          >
            <ul className="px-4 py-3 space-y-2">
              {navItems}
              {user && (
                <>
                  <li className="px-3 pt-3 border-t border-[var(--color-secondary)]/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || "/avatar.png"}
                        alt="profile"
                        className="w-10 h-10 rounded-full border-2 border-[var(--color-secondary)] object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {user.displayName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-200">{user.email}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="block py-3 px-4 text-white hover:bg-[var(--color-secondary)]/20 hover:text-[var(--color-secondary)] rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <FiUser className="text-lg" /> Dashboard
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left py-3 px-4 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg flex items-center gap-3"
                    >
                      <FiLogOut className="text-lg" /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
