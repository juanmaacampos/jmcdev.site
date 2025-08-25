import React from 'react';
import Footer from '../../websections/footer/Footer';
import Navbar from '../../websections/Navbar/Navbar';
import Landing from './sections/Landing';
import './CMSPage.css';

const CMSPage = () => {
  return (
    <div className="cms-page">
      <Navbar />
      <main>
        <Landing />
      </main>
      <Footer />
      {/* Aquí se pueden agregar más secciones de la página CMS */}
    </div>
  );
};

export default CMSPage;
