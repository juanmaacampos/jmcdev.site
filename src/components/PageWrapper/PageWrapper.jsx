import React, { useState, useEffect } from 'react';
import LoaderDiagonal from '../Loader/Loader';
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
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only initialize Lenis on non-touch devices or desktop
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // On small mobile touch devices, native momentum scrolling is 120Hz hardware-accelerated.
    // Overriding touch scroll with JS creates high TBT and forced reflows.
    if (isTouch && window.innerWidth <= 768) {
      return;
    }

    const lenis = new Lenis({
      wheelMultiplier: 0.8, 
      smoothWheel: true, 
      smoothTouch: false, // Leave touch scrolling native to prevent TBT / reflows
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
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
