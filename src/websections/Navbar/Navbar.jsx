import React, { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { FaBriefcase, FaClipboardList, FaUser, FaEnvelope, FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);
  const menuRef = React.useRef(null); // Create a ref for the menu

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;

      if (prevOffset > currentOffset) {
        setScrollDirection('up');
      } else if (prevOffset < currentOffset) {
        setScrollDirection('down');
      }

      setPrevOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevOffset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Clicked outside the menu
        if (isMenuOpen) {
          // Check if the click was on the menu button itself
          const menuButton = document.querySelector('.menu-button');
          if (menuButton && !menuButton.contains(event.target)) {
            setIsMenuOpen(false);
          }
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsMenuOpen(false); // Close the mobile menu after a delay
    }, 100); // Adjust the delay (in milliseconds) as needed
  };

  const navbarClass = `navbar ${scrollDirection === 'down' ? 'hidden' : ''}`;

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
        <Logo onClick={scrollToTop} />

        {/* Regular navbar links - visible on desktop */}
        <div className="nav-links">
          <Button label="Servicios" effect="neon" size="small" icon={<FaUser />} scrollTarget="servicios" />
          <Button label="Planes" effect="neon" size="small" icon={<FaClipboardList />} scrollTarget="planes" />
          <Button label="Proyectos" effect="neon" size="small" icon={<FaBriefcase />} scrollTarget="portafolio" />
          <Button label="Contacto" effect="primary" size="small" icon={<FaEnvelope />} color='#663399' scrollTarget="contacto" />
        </div>

        {/* Mobile menu button */}
        <button className={`menu-button ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div ref={menuRef} className={`mobile-dropdown ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-items">
          <Button label="Servicios" effect="neon" size="small" icon={<FaUser />} scrollTarget="servicios" onClick={() => setIsMenuOpen(false)} />
          <Button label="Planes" effect="neon" size="small" icon={<FaClipboardList />} scrollTarget="planes" onClick={() => setIsMenuOpen(false)} />
          <Button label="Proyectos" effect="neon" size="small" icon={<FaBriefcase />} scrollTarget="portafolio" onClick={() => setIsMenuOpen(false)} />
          <Button label="Contacto" effect="primary" size="small" icon={<FaEnvelope />} color='#663399' scrollTarget="contacto" onClick={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
