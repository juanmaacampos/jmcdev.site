import React, { useRef } from 'react';
import './BianDemoPage.css';

// Import all section components
import HeaderHero from './websections/HeaderHero/HeaderHero';
import MobileNav from './websections/MobileNav/MobileNav';
import MenuSection from './websections/MenuSection/MenuSection';
import AboutSection from './websections/AboutSection/AboutSection';
import LocationSection from './websections/LocationSection/LocationSection';
import Footer from './websections/Footer/Footer';

const BianDemoPage = () => {
  const menuRef = useRef(null);
  
  return (
      <div className="sushi-app custom-scrollbar">
        <HeaderHero />
        <main>
          <MenuSection menuRef={menuRef} />
          <LocationSection />
                <AboutSection />
        </main>
        <Footer />
        <MobileNav />
      </div>
  );
};

export default BianDemoPage;
