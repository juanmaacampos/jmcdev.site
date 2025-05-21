import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="sushi-footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2 className="footer-title">BIAN SUSHI</h2>
          <p className="footer-tagline">Delivery Sushi & Wok</p>
        </div>

        <div className="footer-contact">
          <div className="footer-social">
            <a href="https://www.facebook.com/biansushi.wok" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/biansushi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
          <p className="footer-address">Estrada 824, Campana, Buenos Aires</p>
          <p className="footer-phone">(03489) 43 6924 - 42 2329</p>
          <p className="copyright">© {new Date().getFullYear()} Bian Sushi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
