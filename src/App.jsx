import { useRef, useState, useEffect } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // Add this import
import Header from "./websections/Header/Header";
import Navbar from "./websections/Navbar/Navbar";
import Footer from "./websections/footer/Footer";
import Proceso from "./websections/Proceso/Proceso"
import Planes from "./websections/Planes/Planes" // Corrected import path
import './App.css';
// import Svg from "./components/Svg/Svg"; // Not used in this simplified version
import Servicios from "./websections/Servicios/Servicios";
// import VideoSection from "./websections/VideoSection/VideoSection"; // No longer directly used here
import Portafolio from "./websections/Portafolio/Portafolio";
import Testimonios from "./websections/Testimonios/Testimonios";
import Contacto from "./websections/Contacto/Contacto";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"; // Import NotFoundPage
import TopButton from "./components/TopButton/TopButton"; // Import TopButton component
import BianDemoPage from "./pages/BianDemoPage/BianDemoPage"; // Import the new BianDemoPage component

// gsap, ScrollTrigger, Lenis imports removed
import VideoMaskEffect from "./components/VideoMaskEffect/VideoMaskEffect";
import PageWrapper from "./components/PageWrapper/PageWrapper"; // Import the new component
import AnimatedBackgroundSvg from "./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg"; // Import the new component
import logoImage from './assets/images/logoanimated.svg'; // Updated logo path

// gsap.registerPlugin(ScrollTrigger); // Moved to PageWrapper

// Define a MainLayout component to hold the common structure
const MainLayout = ({ contentIsVisible, videoSectionRef, videoOverlayRef }) => (
  <>
    <Navbar />
    <Header />
    <Servicios id="servicios" />
    <VideoMaskEffect
      videoSectionRef={videoSectionRef}
      videoOverlayRef={videoOverlayRef}
      contentVisible={contentIsVisible}
    />
    <Proceso />
    <Portafolio />
    <Planes />
    <Testimonios />
    <Contacto />
    <Footer />
    <TopButton /> {/* Add TopButton component here */}
    <AnimatedBackgroundSvg
      svgPaths={[logoImage, logoImage, logoImage]} // Updated logo references
      startTriggerId="planes"
      endTriggerId="contacto"
      contentIsVisible={contentIsVisible}
    />
  </>
);

function App() {
  const videoSectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const location = useLocation(); // Get current location
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoImage);

  // Check if we're on the BianDemoPage route
  const isBianDemoRoute = location.pathname === '/bian_demo';

  // If it's the BianDemoPage route, render it directly without PageWrapper
  if (isBianDemoRoute) {
    return <BianDemoPage />;
  }

  // Otherwise, use the PageWrapper for other routes
  useEffect(() => {
    // Crear una nueva imagen y cargarla en segundo plano
    const img = new Image();
    const newLogoSrc = './assets/images/logo.svg';
    
    img.onload = () => {
      setLogoSrc(newLogoSrc);
      setLogoLoaded(true);
    };
    
    img.src = newLogoSrc;
    
    // Opcional: Usar Intersection Observer para cargar solo cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = newLogoSrc;
        }
      });
    }, {rootMargin: "200px"});
    
    const headerElement = document.getElementById('site-header');
    if (headerElement) {
      observer.observe(headerElement);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageProvider> {/* Wrap everything in LanguageProvider */}
      <PageWrapper>
        {(contentIsVisible) => (
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </PageWrapper>
    </LanguageProvider>
  );
}

export default App;
