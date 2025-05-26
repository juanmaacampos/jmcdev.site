import React, { useRef } from 'react';
import './BianDemoPage.css';
import { LanguageProvider } from "../../context/LanguageContext";

// Import all section components
import HeaderHero from './websections/HeaderHero/HeaderHero';
import MobileNav from './websections/MobileNav/MobileNav';
import MenuSection from './websections/MenuSection/MenuSection';
import LocationSection from './websections/LocationSection/LocationSection';
import Contacto from './websections/Contacto/Contacto';
import Footer from './websections/Footer/Footer';

const BianDemoPage = () => {
  const menuRef = useRef(null);
  
  return (
    <LanguageProvider defaultLanguage="es" disableChanging={true}>
      <div className="sushi-app custom-scrollbar">
        <HeaderHero />
        <main>
          <MenuSection menuRef={menuRef} />
          <LocationSection />
          <Contacto />
        </main>
        <Footer />
        <MobileNav />
      </div>
    </LanguageProvider>
  );
};

export default BianDemoPage;
