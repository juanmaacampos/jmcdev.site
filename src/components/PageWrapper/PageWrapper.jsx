import React, { useState, useEffect } from 'react';
import LoaderDiagonal from '../Loader/Loader'; // Adjusted path
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import './PageWrapper.css';

gsap.registerPlugin(ScrollTrigger);

// Module-level flag: persists across route changes (remounts) but resets on full page reload
let introHasPlayed = false;

function PageWrapper({ children }) {
  const [loading, setLoading] = useState(!introHasPlayed);
  const [contentVisible, setContentVisible] = useState(introHasPlayed);

  useEffect(() => {
    if (introHasPlayed) return;

    // Precargar contenido antes de ocultar loader
    setContentVisible(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      introHasPlayed = true;
      // Pequeño delay para asegurar que el contenido está renderizado
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          console.log("ScrollTrigger refreshed after content visible.");
        }, 150);
      });
    }, 1800); // Ligeramente antes del fadeOut del loader
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 0.4, 
      smoothWheel: true, 
      smoothTouch: true, // Enable for better touch feel
      // syncTouch: true, // Disabled as it caused issues
      touchMultiplier: 0.8, // Moderate value for slower touch scroll, adjust between 0.5-0.8
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    gsap.ticker.add(lenis.raf, lenis);
    gsap.ticker.lagSmoothing(0);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <LoaderDiagonal isVisible={loading} />
      <div className={`contenido ${contentVisible ? 'visible' : ''}`}>
        {children(contentVisible)}
      </div>
    </>
  );
}

export default PageWrapper;
