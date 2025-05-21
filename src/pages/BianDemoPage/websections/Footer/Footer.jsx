import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="sushi-footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2 className="footer-title">SUSHI FUSION</h2>
          <p className="footer-tagline">Japanese Culinary Experience</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <div className="footer-social">
            <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#tripadvisor" aria-label="TripAdvisor"><FaTripadvisor /></a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Sushi Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
