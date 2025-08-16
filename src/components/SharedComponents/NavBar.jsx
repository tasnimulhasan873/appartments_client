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
  FiInfo,
  FiMail,
  FiSettings,
  FiCreditCard,
  FiUserCheck,
  FiHelpCircle,
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
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Logged out navigation items (3 routes)
  const publicNavItems = [
    { to: "/", icon: FiHome, label: "Home" },
    { to: "/apartments", icon: FiGrid, label: "Apartments" },
    { to: "/about", icon: FiInfo, label: "About" },
  ];

  // Logged in navigation items (5 routes - 3 public + 2 protected)
  const authenticatedNavItems = [
    { to: "/", icon: FiHome, label: "Home" },
    { to: "/apartments", icon: FiGrid, label: "Apartments" },
    { to: "/about", icon: FiInfo, label: "About" },
    { to: "/contact", icon: FiMail, label: "Contact" },
    { to: "/faq", icon: FiHelpCircle, label: "FAQ" },
  ];

  // Protected routes for dropdown
  const dashboardRoutes = [
    { to: "/dashboard", icon: FiSettings, label: "Dashboard" },
    
  ];

  const currentNavItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-primary/95 backdrop-blur-lg border-b border-secondary/20 shadow-xl z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-all duration-300 font-medium flex items-center gap-2 py-2 px-4 rounded-xl ${
                    isActive
                      ? "bg-secondary text-white shadow-lg scale-105"
                      : "text-white hover:bg-secondary/10 hover:text-secondary hover:scale-105"
                  }`
                }
              >
                <item.icon className="text-lg" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* User Authenticated */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-secondary/10 transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-secondary object-cover group-hover:border-white transition-colors"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-primary"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-white text-sm">
                      {user.displayName?.split(" ")[0] || "User"}
                    </p>
                    <p className="text-xs text-text-muted">Account</p>
                  </div>
                  <FiChevronDown
                    className={`text-white transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 glass-dark border border-secondary/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-6 py-4 border-b border-secondary/10 bg-secondary/5">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
                          />
                          <div>
                            <p className="font-bold text-white">
                              {user.displayName || "Anonymous User"}
                            </p>
                            <p className="text-sm text-text-muted truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Routes */}
                      <div className="py-2">
                        {dashboardRoutes.map((route) => (
                          <NavLink
                            key={route.to}
                            to={route.to}
                            onClick={() => setIsDropdownOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center space-x-3 px-6 py-3 transition-all duration-200 ${
                                isActive
                                  ? "bg-secondary/20 text-secondary border-r-2 border-secondary"
                                  : "text-white hover:bg-secondary/10 hover:text-secondary"
                              }`
                            }
                          >
                            <route.icon className="text-lg flex-shrink-0" />
                            <span className="font-medium">{route.label}</span>
                          </NavLink>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-secondary/10 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-6 py-3 text-white hover:bg-danger/10 hover:text-danger transition-all duration-200"
                        >
                          <FiLogOut className="text-lg" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* User Not Authenticated */
              <div className="flex items-center space-x-3">
                <Link
                  to="/register"
                  className="btn-outline hidden sm:flex items-center space-x-2"
                >
                  <FiUserCheck />
                  <span>Register</span>
                </Link>
                <Link
                  to="/login"
                  className="btn-primary flex items-center space-x-2"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-300"
            >
              {isMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-dark border-t border-secondary/20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-2 mb-6">
                {currentNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-secondary text-white"
                          : "text-white hover:bg-secondary/10 hover:text-secondary"
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </NavLink>
                ))}
              </div>

              {/* Mobile User Section */}
              {user ? (
                <div className="border-t border-secondary/10 pt-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-secondary/5">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
                    />
                    <div>
                      <p className="font-bold text-white">
                        {user.displayName || "Anonymous User"}
                      </p>
                      <p className="text-sm text-text-muted">{user.email}</p>
                    </div>
                  </div>

                  {/* Mobile Dashboard Routes */}
                  <div className="space-y-2 mb-4">
                    {dashboardRoutes.map((route) => (
                      <NavLink
                        key={route.to}
                        to={route.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block py-3 px-4 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-secondary/20 text-secondary"
                              : "text-white hover:bg-secondary/10 hover:text-secondary"
                          }`
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <route.icon className="text-lg" />
                          <span className="font-medium">{route.label}</span>
                        </div>
                      </NavLink>
                    ))}
                  </div>

                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 text-white hover:bg-danger/10 hover:text-danger rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <FiLogOut className="text-lg" />
                      <span className="font-medium">Sign Out</span>
                    </div>
                  </button>
                </div>
              ) : (
                /* Mobile Auth Buttons */
                <div className="border-t border-secondary/10 pt-4 space-y-3">
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-outline w-full justify-center"
                  >
                    <FiUserCheck className="mr-2" />
                    Create Account
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    <FiLogIn className="mr-2" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
