import React, { useState, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { useLanguageTranslation } from '../../utils/languageUtils';
import { FaBriefcase, FaClipboardList, FaEnvelope, FaCog } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = React.useRef(null);
  const hamburgerRef = React.useRef(null);

  const { currentLanguage, t } = useLanguageTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isScrollingDown = currentOffset > prevOffset;
      const scrollThreshold = 100;

      if (Math.abs(currentOffset - prevOffset) > 5) {
        setScrollDirection(isScrollingDown ? 'down' : 'up');
      }

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
    const handleClickOutside = (event) => {
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
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <div className="navbar-container">
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <ul className="navbar-links">
            <li className="navbar-item">
              <Button 
                label="Inmobiliaria"
                scrollTarget="inmobiliaria"
                effect="neon"
                size="small"
                className="nav-button"
                icon={<FaCog className="nav-icon" />}
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
          </ul>
        </div>
        
        <LanguageSelector className="nav-language-selector" />

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
