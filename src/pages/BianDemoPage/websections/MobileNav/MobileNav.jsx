import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../../../../hooks/useMediaQuery';
import './MobileNav.css';
import { 
  FaHome, 
  FaUtensils, 
  FaMapMarkerAlt, 
  FaPhone 
} from 'react-icons/fa';

const MobileNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();

  // Solo renderizar en mobile
  if (!isMobile) return null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`mobile-nav ${isVisible ? 'visible' : 'hidden'}`}>
      <button 
        className="nav-item" 
        onClick={() => scrollToSection('top')}
        aria-label="Inicio"
      >
        <FaHome />
        <span>Inicio</span>
      </button>
      
      <button 
        className="nav-item" 
        onClick={() => scrollToSection('menu')}
        aria-label="Menú"
      >
        <FaUtensils />
        <span>Menú</span>
      </button>
      
      <button 
        className="nav-item" 
        onClick={() => scrollToSection('location')}
        aria-label="Ubicación"
      >
        <FaMapMarkerAlt />
        <span>Ubicación</span>
      </button>
      
      <button 
        className="nav-item" 
        onClick={() => scrollToSection('contact')}
        aria-label="Contacto"
      >
        <FaPhone />
        <span>Contacto</span>
      </button>
    </nav>
  );
};

export default MobileNav;
