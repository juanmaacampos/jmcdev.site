import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-title-container">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">Our story and philosophy</p>
      </div>
      <div className="about-content">
        <p>
          Founded in 2010, Sushi Fusion has been dedicated to bringing authentic Japanese 
          flavors with a modern twist to our customers. Our chef, Master Takeshi, trained 
          for over 15 years in Tokyo before bringing his expertise to our restaurant.
        </p>
        <p>
          We are committed to sourcing the freshest ingredients daily, ensuring that every 
          dish not only tastes exceptional but also maintains traditional quality. Our rice 
          is imported directly from Japan, and our fish is selected each morning from 
          trusted local suppliers.
        </p>
        <p>
          At Sushi Fusion, we believe that dining is an experience that engages all senses. 
          From the moment you enter our doors, we strive to create a serene atmosphere that 
          complements the artistry on your plate.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
