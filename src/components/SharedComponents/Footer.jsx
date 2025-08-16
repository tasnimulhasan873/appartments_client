import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-glow rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blurPurple rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary-light/30 rounded-full blur-sm animate-float-delay"></div>
      </div>

      <div className="relative p-8 sm:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + About */}
          <div className="flex flex-col items-center md:items-start lg:col-span-2">
            <Link
              to="/"
              className="text-4xl font-bold text-white font-['Inter'] hover:text-primary-light transition-all duration-300 mb-4"
            >
              BMS
            </Link>
            <p className="text-lg text-white/80 font-['Inter'] text-center md:text-left max-w-md leading-relaxed mb-6">
              A smart solution to manage single building apartments efficiently.
              Secure, responsive, and role-based platform for modern living.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-white/70">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary-light flex-shrink-0" />
                <span className="text-sm">
                  123 Building Street, City, State 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary-light flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary-light flex-shrink-0" />
                <span className="text-sm">info@bms.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white font-['Inter'] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4 text-base font-['Inter'] text-center md:text-left">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-primary-light font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-white/80 hover:text-primary-light font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-primary-light font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white/80 hover:text-primary-light font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white/80 hover:text-primary-light font-medium transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white font-['Inter'] mb-6">
              Connect With Us
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="bg-overlay backdrop-blur-sm hover:bg-glow text-primary-light hover:text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl border border-glow"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-overlay backdrop-blur-sm hover:bg-glow text-primary-light hover:text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl border border-glow"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-overlay backdrop-blur-sm hover:bg-glow text-primary-light hover:text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl border border-glow"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-overlay backdrop-blur-sm hover:bg-glow text-primary-light hover:text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl border border-glow"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full max-w-sm">
              <h4 className="text-sm font-semibold text-white/90 mb-3">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-4 py-2 bg-overlay backdrop-blur-sm border border-glow rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-light transition-colors text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-primary-light to-primary text-white rounded-r-lg hover:from-primary hover:to-primary-dark transition-all duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-glow text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70 font-['Inter']">
              © {new Date().getFullYear()} BMS - Building Management System. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/70">
              <Link
                to="/privacy"
                className="hover:text-primary-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-light transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
