import React, { useRef, useEffect, useState } from "react";
import styles from "./Portafolio.module.css";

const PortafolioBackground = ({ sectionRef }) => {
  const glowRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Track mouse position for the glow effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!sectionRef?.current || ticking) return;
      
      const now = Date.now();
      // Throttle to max 20fps for better performance
      if (now - lastUpdateRef.current < 50) return;
      
      ticking = true;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        lastUpdateRef.current = now;
        ticking = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionRef]);

  // Update glow effect with CSS instead of GSAP
  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.backgroundImage = `radial-gradient(
        circle at ${mousePos.x}% ${mousePos.y}%,
        rgba(85, 211, 196, 0.25) 0%,
        rgba(85, 211, 196, 0.15) 20%,
        rgba(85, 211, 196, 0.05) 40%,
        transparent 60%
      )`;
    }
  }, [mousePos]);

  return (
    <div className={styles.backgroundElements}>
      <div className={styles.backgroundBase}></div>
      <div
        ref={glowRef}
        className={styles.glowEffect}
        style={{
          backgroundImage: `radial-gradient(
            circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(85, 211, 196, 0.25) 0%,
            rgba(85, 211, 196, 0.15) 20%,
            rgba(85, 211, 196, 0.05) 40%,
            transparent 60%
          )`
        }}
      ></div>
      <div className={styles.noiseTexture}></div>
    </div>
  );
};

export default PortafolioBackground;
