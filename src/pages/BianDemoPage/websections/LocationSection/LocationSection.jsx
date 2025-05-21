import React from 'react';
import './LocationSection.css';
import { FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';

const LocationSection = () => {
  return (
    <section className="location-section" id="location">
      <div className="section-title-container">
        <h2 className="section-title">Find Us</h2>
        <p className="section-subtitle">Visit our restaurant</p>
      </div>

      <div className="location-content">
        <div className="location-info">
          <div className="info-item">
            <span className="info-icon"><FaMapMarkerAlt /></span>
            <div>
              <h3>Address</h3>
              <p>123 Sushi Street, Foodie District<br />New York, NY 10001</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon"><FaClock /></span>
            <div>
              <h3>Opening Hours</h3>
              <p>Monday - Thursday: 11:30 AM - 10:00 PM<br />
                Friday - Saturday: 11:30 AM - 11:00 PM<br />
                Sunday: 12:00 PM - 9:00 PM</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon"><FaPhone /></span>
            <div>
              <h3>Contact</h3>
              <p>Phone: (555) 123-4567<br />
                Email: info@sushifusion.com</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          {/* This would typically contain a map integration like Google Maps */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1596441237806!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0"
            title="Restaurant Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
