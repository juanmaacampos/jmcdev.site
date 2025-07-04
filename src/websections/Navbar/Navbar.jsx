import React, { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { useLanguageTranslation } from '../../utils/languageUtils'; // Replace previous import
import { FaBriefcase, FaClipboardList, FaUser, FaEnvelope, FaCog, FaTags, FaQuestionCircle, FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = React.useRef(null);
  const hamburgerRef = React.useRef(null); // Add ref for the hamburger button

  const { currentLanguage, t } = useLanguageTranslation(); // Destructure t from useLanguageTranslation

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isScrollingDown = currentOffset > prevOffset;
      const scrollThreshold = 100; // Minimum scroll amount before hiding

      // Only change visibility after scrolling more than the threshold
      if (Math.abs(currentOffset - prevOffset) > 5) {
        setScrollDirection(isScrollingDown ? 'down' : 'up');
      }

      // Hide navbar when scrolling down past the threshold
      if (currentOffset > scrollThreshold) {
        setIsVisible(!isScrollingDown || isMenuOpen);
      } else {
        setIsVisible(true);
      }

      setPrevOffset(currentOffset);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevOffset, isMenuOpen]);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      // If the click is on the hamburger button, let toggleMenu handle it
      if (hamburgerRef.current && hamburgerRef.current.contains(event.target)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Dependencies are empty, which is fine here as refs and setIsMenuOpen are stable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Return only the BianDemoPage navbar when on that route
  const isBianRoute = typeof window !== 'undefined' && window.location.pathname === '/bian_demo';
  if (isBianRoute) return null;

  // Check if we're on the CMS page
  const isCMSRoute = typeof window !== 'undefined' && window.location.pathname === '/e-panel';

  // Function to scroll to a section, with fallback for CMS page sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section doesn't exist, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <div className="navbar-container">
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <ul className="navbar-links">
            {isCMSRoute ? (
              // CMS Page Navigation
              <>
                <li className="navbar-item">
                  <Button 
                    label="Inicio"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaHome className="nav-icon" />}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      closeMenu();
                    }}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label="Características"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaCog className="nav-icon" />}
                    onClick={() => {
                      scrollToSection('caracteristicas');
                      closeMenu();
                    }}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label="Planes"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaTags className="nav-icon" />}
                    onClick={() => {
                      scrollToSection('planes');
                      closeMenu();
                    }}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label="FAQ"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaQuestionCircle className="nav-icon" />}
                    onClick={() => {
                      scrollToSection('faq');
                      closeMenu();
                    }}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label="Contacto"
                    effect="primary"
                    size="small"
                    className="nav-button contact-button"
                    icon={<FaEnvelope className="nav-icon" />}
                    onClick={() => {
                      scrollToSection('contacto');
                      closeMenu();
                    }}
                  />
                </li>
              </>
            ) : (
              // Main Page Navigation
              <>
                <li className="navbar-item">
                  <Button 
                    label={t('navbar.services')}
                    scrollTarget="servicios"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaUser className="nav-icon" />}
                    onClick={closeMenu}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label={t('navbar.plans')}
                    scrollTarget="planes"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaClipboardList className="nav-icon" />}
                    onClick={closeMenu}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label={t('navbar.projects')}
                    scrollTarget="portafolio"
                    effect="neon"
                    size="small"
                    className="nav-button"
                    icon={<FaBriefcase className="nav-icon" />}
                    onClick={closeMenu}
                  />
                </li>
                <li className="navbar-item">
                  <Button 
                    label={t('navbar.contact')}
                    scrollTarget="contacto"
                    effect="primary"
                    size="small"
                    className="nav-button contact-button"
                    icon={<FaEnvelope className="nav-icon" />}
                    onClick={closeMenu}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
        
        {/* LanguageSelector moved here, after navbar-menu - Hidden on CMS page */}
        {!isCMSRoute && <LanguageSelector className="nav-language-selector" />}

        <button
          ref={hamburgerRef}
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
