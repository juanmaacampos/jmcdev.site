import { useRef } from "react"; // useEffect, useState removed
// LoaderDiagonal import removed
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
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

// gsap, ScrollTrigger, Lenis imports removed
import VideoMaskEffect from "./components/VideoMaskEffect/VideoMaskEffect";
import PageWrapper from "./components/PageWrapper/PageWrapper"; // Import the new component
import AnimatedBackgroundSvg from "./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg"; // Import the new component
import logoAnimatedSvg from './assets/images/logoanimated.svg'; // Import the SVG

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
      svgPaths={[logoAnimatedSvg, logoAnimatedSvg, logoAnimatedSvg]} // Pass an array of SVGs
      startTriggerId="planes"
      endTriggerId="contacto"
      contentIsVisible={contentIsVisible}
    />
  </>
);

function App() {
  // loading, contentVisible state removed
  const videoSectionRef = useRef(null);
  const videoOverlayRef = useRef(null);

  // useEffect for loader removed
  // useEffect for Lenis removed

  return (
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
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
        </Routes>
      )}
    </PageWrapper>
  );
}

export default App;
