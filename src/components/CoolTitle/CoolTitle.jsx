import React, { useState, useEffect, useRef } from 'react';
import styles from './CoolTitle.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Add contentVisible to props, default to true for standalone use
function CoolTitle({ children, className, animation = 'none', hoverFonts = [], fontTransition = "0.5s", maskActive, scrollAnimate = false, animateScroll = false, contentVisible = true }) {
  const [fontIndex, setFontIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;
  const lastScroll = useRef(0);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isMobile || hoverFonts.length === 0) return;

    const handleScroll = () => {
      // Cambia de fuente solo si se scrollea más de 40px desde el último cambio
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScroll.current) > 40) {
        setTransitioning(true);
        setTimeout(() => setTransitioning(false), parseFloat(fontTransition) * 1000);
        setFontIndex(prev => (prev + 1) % hoverFonts.length);
        lastScroll.current = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, hoverFonts.length, fontTransition]);

  useEffect(() => {
    let st; // To store ScrollTrigger instance
    // Removed refreshTimeoutId

    if (titleRef.current) {
      gsap.killTweensOf(titleRef.current); 
    }

    if (animateScroll) {
      if (contentVisible && titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 80 });

        st = ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 85%", 
          end: "bottom 15%", 
          markers: process.env.NODE_ENV === 'development', 
          onEnter: () => gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" }),
          onLeave: () => gsap.to(titleRef.current, { opacity: 0, y: -80, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
          onEnterBack: () => gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" }),
          onLeaveBack: () => gsap.to(titleRef.current, { opacity: 0, y: 80, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
        });

        // The explicit ScrollTrigger.refresh(true) is now handled by the parent Proceso component
        // after AOS has completed its updates.

      } else if (titleRef.current) { 
        gsap.set(titleRef.current, { opacity: 0, y: 80 });
      }
    } else if (titleRef.current) { 
      gsap.set(titleRef.current, { opacity: 1, y: 0, clearProps: "transform,opacity" });
    }

    return () => {
      // clearTimeout(refreshTimeoutId); // No longer needed
      if (st) {
        st.kill(); 
      }
    };
  }, [animateScroll, contentVisible, children, scrollAnimate]); 

  const handleMouseEnter = () => {
    if (!isMobile && hoverFonts.length > 0) {
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), parseFloat(fontTransition) * 1000);
      setFontIndex((prev) => (prev + 1) % hoverFonts.length);
    }
  };

  const fontFamily = hoverFonts.length > 0 ? { fontFamily: hoverFonts[fontIndex] } : {};

  return (
    <h1
      ref={titleRef}
      className={`${styles.title} ${styles[animation]} ${className || ''} ${transitioning ? styles.fontTransitioning : ''} ${maskActive ? styles.maskActive : ''}`}
      data-text={children}
      style={{
        ...fontFamily,
        transition: `font-family ${fontTransition} cubic-bezier(0.4,0,0.2,1), color 0.2s, background 0.2s`,
        color: maskActive ? 'green' : 'inherit'
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </h1>
  );
}

export default CoolTitle;
