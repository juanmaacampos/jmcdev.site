import React from 'react';
import './LocationSection.css';
import { FaMapMarkerAlt, FaClock, FaPhone, FaUtensils, FaCarSide } from 'react-icons/fa';

const LocationSection = () => {
  return (
    <section className="location-section" id="location">
      <div className="location-background-design">
        <div className="location-pattern-left"></div>
        <div className="location-pattern-right"></div>
      </div>
      
      <div className="menu-title-wrapper">
        <h2 className="menu-title">Ubicación</h2>
        <p className="menu-description">Visitanos en nuestro local</p>
      </div>

      <div className="location-content">
        <div className="location-info">
          <div className="info-item">
            <span className="info-icon"><FaMapMarkerAlt /></span>
            <div>
              <h3>Dirección</h3>
              <p>Estrada 824, Campana<br />Buenos Aires, Argentina</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon"><FaClock /></span>
            <div>
              <h3>Horarios de Atención</h3>
              <p>18:00hs a 23:00hs</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon"><FaPhone /></span>
            <div>
              <h3>Contacto</h3>
              <p>Teléfono: (03489) 43 6924 - 42 2329<br />
                Nextel: 723*1153</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="info-icon"><FaUtensils /></span>
            <div>
              <h3>Servicios</h3>
              <p>Restaurante<br />Take Away</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="info-icon"><FaCarSide /></span>
            <div>
              <h3>Delivery</h3>
              <p>A toda la zona de Campana<br />Consulta por tu zona</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <div className="map-overlay">
            <div className="pulse-dot"></div>
            <span>Estamos aquí</span>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.3037591529166!2d-58.96415032345796!3d-34.09129694542951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb0b7097b49649%3A0x236597a9ca7932db!2sEstrada%20824%2C%20Campana%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1687896541234!5m2!1sen!2sar" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0"
            title="Bian Sushi Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
