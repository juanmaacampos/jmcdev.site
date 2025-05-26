import React, { useRef, useEffect, useState } from 'react';
import styles from './ParallaxMouseImage.module.css';

const ParallaxMouseImage = ({ src, alt, className, draggable = false, strength = 20 }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;

      // Calculate mouse position relative to container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Use weaker effect for smaller screens
      const actualStrength = window.innerWidth <= 1024 ? strength * 1.5 : strength;
      
      // Calculate translation amount based on strength
      const translateX = x / actualStrength;
      const translateY = y / actualStrength;

      // Apply translation through transform
      imageRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate3d(0, 0, 0, 0deg)`;
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        // Reset position with a smooth transition
        imageRef.current.style.transition = 'transform 0.3s ease-out';
        imageRef.current.style.transform = 'translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)';
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.style.transition = 'transform 0.1s ease-out';
          }
        }, 300);
      }
    };

    // Add mouse move event listener
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Clean up event listener
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, isMobile]);

  return (
    <div ref={containerRef} className={styles.parallaxContainer}>
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className={`${styles.parallaxImage} ${className || ''}`} 
        draggable={draggable}
        loading="eager"
      />
    </div>
  );
};

export default ParallaxMouseImage;
