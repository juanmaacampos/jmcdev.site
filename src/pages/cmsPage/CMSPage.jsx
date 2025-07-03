import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Footer from '../../websections/footer/Footer';
import Navbar from '../../websections/Navbar/Navbar';
import Landing from './sections/Landing';
import './CMSPage.css';

const CMSPage = () => {
  return (
    <PageWrapper>
      {(contentVisible) => (
        <div className="cms-page">
          <Navbar />
          <main>
            <Landing />
          </main>
          <Footer />
          {/* Aquí se pueden agregar más secciones de la página CMS */}
        </div>
      )}
    </PageWrapper>
  );
};

export default CMSPage;
