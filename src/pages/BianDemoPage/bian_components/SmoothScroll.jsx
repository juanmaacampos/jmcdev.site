import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children, options = {} }) => {
  useEffect(() => {
    // Create a separate Lenis instance
    const lenis = new Lenis({
      wheelMultiplier: 0.4,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 0.8,
      ...options
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Clean up this instance when component unmounts
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options]);

  return <>{children}</>;
};

export default SmoothScroll;
