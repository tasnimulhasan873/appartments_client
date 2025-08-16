import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png'; // Adjust path if needed
import PropTypes from 'prop-types';

const Logo = ({ size = 44, withText = true, className = '' }) => {
  // Calculate responsive size based on the default
  const responsiveSize = `w-[${size}px] h-[${size}px] md:w-[${size * 1.1}px] md:h-[${size * 1.1}px]`;
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 group ${className}`}
      aria-label="BMS - Home"
    >
      <div className={`relative ${responsiveSize}`}>
        <img
          src={logoImg}
          alt=""
          width={size}
          height={size}
          className={`rounded-full shadow-lg border-2 border-purple-400/80 group-hover:border-purple-300 
                     transition-all duration-300 ease-in-out ${responsiveSize}`}
          style={{ 
            objectFit: 'cover',
            willChange: 'transform' // Performance optimization for animations
          }}
          loading="lazy" // Better performance
          decoding="async"
        />
        {/* Optional shimmer effect on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-purple-300 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      {withText && (
        <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 font-['Inter'] hover:from-purple-200 hover:to-pink-300 transition-colors duration-300">
          BMS
        </span>
      )}
    </Link>
  );
};

Logo.propTypes = {
  size: PropTypes.number,
  withText: PropTypes.bool,
  className: PropTypes.string,
};

export default Logo;