import React from 'react';
import './ContactSection.css';
import { FaPhone, FaMobile, FaEnvelope } from 'react-icons/fa';
import BianButton from '../../bian_components/BianButton/BianButton';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contacto">
      <div className="section-title-container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">Estamos para servirte</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <FaPhone className="contact-icon" />
            <h3>Teléfono</h3>
            <p>(03489) 43 6924</p>
            <p>(03489) 42 2329</p>
          </div>
          
          <div className="contact-card">
            <FaMobile className="contact-icon" />
            <h3>Nextel</h3>
            <p>723*1153</p>
          </div>
          
          <div className="contact-card">
            <div className="delivery-badge">
              <span className="delivery-text">Delivery</span>
            </div>
            <h3>Hacé tu pedido</h3>
            <BianButton href="tel:+0348943692">Llamar ahora</BianButton>
          </div>
        </div>

        <div className="social-promo">
          <h3>Seguinos en redes</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/biansushi.wok" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaPhone className="social-icon" />
              <span>biansushi.wok</span>
            </a>
            <a href="https://www.instagram.com/biansushi" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaEnvelope className="social-icon" />
              <span>@biansushi</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
