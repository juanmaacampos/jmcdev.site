import React, { useState, useEffect } from 'react';
import './MobileNav.css';
// Assuming you're using a library like react-icons
import { FaHome, FaUtensils, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';

const MobileNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav when scrolled past the hero section (using viewport height)
      const scrollThreshold = window.innerHeight * 0.7; // 70% of viewport height
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`mobile-nav ${isVisible ? 'visible' : 'hidden'}`}>
      <a href="#home" className="nav-item">
        <FaHome />
        <span>Home</span>
      </a>
      <a href="#menu" className="nav-item">
        <FaUtensils />
        <span>Menu</span>
      </a>
      <a href="#about" className="nav-item">
        <FaInfoCircle />
        <span>About</span>
      </a>
      <a href="#location" className="nav-item">
        <FaMapMarkerAlt />
        <span>Location</span>
      </a>
    </nav>
  );
};

export default MobileNav;
