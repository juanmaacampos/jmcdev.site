import { useRef, lazy, Suspense } from "react"; 
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./websections/Header/Header";
import Navbar from "./websections/Navbar/Navbar";
import Footer from "./websections/footer/Footer";
import Proceso from "./websections/Proceso/Proceso";
import Planes from "./websections/Planes/Planes";
import Inmobiliaria from "./websections/Inmobiliaria/Inmobiliaria";
import './App.css';
import Servicios from "./websections/Servicios/Servicios";
import Portafolio from "./websections/Portafolio/Portafolio";
import Contacto from "./websections/Contacto/Contacto";
import TopButton from "./components/TopButton/TopButton";

// Code-split sub-routes so they don't bloat the main homepage bundle
const EPanelRedirect = lazy(() => import("./pages/EPanelRedirect/EPanelRedirect"));
const KobeDemoRedirect = lazy(() => import("./pages/KobeDemoRedirect/KobeDemoRedirect"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

import VideoMaskEffect from "./components/VideoMaskEffect/VideoMaskEffect";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import AnimatedBackgroundSvg from "./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg";
import logoImage from './assets/images/logoanimated.svg';

const MainLayout = ({ contentIsVisible, videoSectionRef, videoOverlayRef }) => (
  <div className="main-layout">
    <Navbar />
    <Header />
    <Inmobiliaria />
    <Servicios id="servicios" />
    <VideoMaskEffect
      videoSectionRef={videoSectionRef}
      videoOverlayRef={videoOverlayRef}
      contentVisible={contentIsVisible}
    />
    <Proceso />
    <Portafolio />
    <Planes />
    <Contacto />
    <Footer />
    <TopButton />
    <AnimatedBackgroundSvg
      svgPaths={[logoImage, logoImage, logoImage]}
      startTriggerId="planes"
      endTriggerId="contacto"
      contentIsVisible={contentIsVisible}
    />
  </div>
);

function App() {
  const videoSectionRef = useRef(null);
  const videoOverlayRef = useRef(null);

  return (
    <LanguageProvider>
      <PageWrapper>
        {(contentIsVisible) => (
          <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#171717' }} />}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <MainLayout 
                    contentIsVisible={contentIsVisible} 
                    videoSectionRef={videoSectionRef} 
                    videoOverlayRef={videoOverlayRef} 
                  />
                } 
              />
              <Route path="e-panel" element={<EPanelRedirect />} />
              <Route path="kobe_demo" element={<KobeDemoRedirect />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
      </PageWrapper>
    </LanguageProvider>
  );
}

export default App;
