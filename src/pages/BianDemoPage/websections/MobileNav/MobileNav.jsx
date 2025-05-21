import React, { useState, useEffect } from 'react';
import './MobileNav.css';
// Assuming you're using a library like react-icons
import { FaHome, FaUtensils, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const MobileNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav when scrolled past the hero section (using viewport height)
      const scrollThreshold = window.innerHeight * 0.7; // 70% of viewport height
      
      // Check if user has scrolled to the footer
      const footer = document.querySelector('footer');
      const isAtFooter = footer && 
        window.scrollY + window.innerHeight >= footer.offsetTop;
      
      // Show nav only if scrolled past threshold AND not at the footer
      if (window.scrollY > scrollThreshold && !isAtFooter) {
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
      <a href="#" className="nav-item">
        <FaHome />
        <span>Inicio</span>
      </a>
      <a href="#menu" className="nav-item">
        <FaUtensils />
        <span>Menú</span>
      </a>
      <a href="#location" className="nav-item">
        <FaMapMarkerAlt />
        <span>Ubicación</span>
      </a>
      <a href="#contacto" className="nav-item">
        <FaPhone />
        <span>Contacto</span>
      </a>
    </nav>
  );
};

export default MobileNav;
