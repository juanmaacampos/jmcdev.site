import React, { useState, useEffect, useRef } from 'react';
import styles from './CoolTitle.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CoolTitle({ children, className, animation = 'none', hoverFonts = [], fontTransition = "0.5s", maskActive, scrollAnimate = false, animateScroll = false, contentVisible = true, as = "h1" }) {
  const [fontIndex, setFontIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const lastScroll = useRef(0);
  const titleRef = useRef(null);

  useEffect(() => {
    // Only activate scroll effect if hoverFonts contains multiple fonts
    if (hoverFonts.length <= 1) return;

    const handleScroll = () => {
      // Change font only if scrolled more than 40px from last change
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
  }, [hoverFonts.length, fontTransition]);

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
          markers: false, // Always hide ScrollTrigger markers, regardless of environment
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
    if (hoverFonts.length > 0) {
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), parseFloat(fontTransition) * 1000);
      setFontIndex((prev) => (prev + 1) % hoverFonts.length);
    }
  };

  const fontFamily = hoverFonts.length > 0 ? { fontFamily: hoverFonts[fontIndex] } : {};
  
  // Use the dynamic tag from the 'as' prop
  const Tag = as;

  return (
    <Tag
      ref={titleRef}
      className={`${styles.title} ${styles[animation]} ${className || ''} ${transitioning ? styles.fontTransitioning : ''} ${maskActive ? styles.maskActive : ''}`}
      data-text={children}
      style={{
        ...fontFamily,
        transition: `font-family ${fontTransition} cubic-bezier(0.4,0,0.2,1), color 0.2s, background 0.2s`,
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Tag>
  );
}

export default CoolTitle;
