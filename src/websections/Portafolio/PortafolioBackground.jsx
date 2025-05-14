import React, { useRef, useEffect, useState } from "react";
import styles from "./Portafolio.module.css";
import gsap from "gsap";

const PortafolioBackground = ({ sectionRef }) => {
  const glowRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Track mouse position for the glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef?.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sectionRef]);

  // Animation for the glow effect
  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        duration: 0.8,
        ease: "power2.out",
        backgroundImage: `radial-gradient(
          circle at ${mousePos.x}% ${mousePos.y}%,
          rgba(85, 211, 196, 0.25) 0%,
          rgba(85, 211, 196, 0.15) 20%,
          rgba(85, 211, 196, 0.05) 40%,
          transparent 60%
        )`
      });
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
