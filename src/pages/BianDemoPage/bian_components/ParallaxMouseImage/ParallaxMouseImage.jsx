import React, { useRef, useEffect } from 'react';
import styles from './ParallaxMouseImage.module.css';

const ParallaxMouseImage = ({ src, alt, className, draggable = false, strength = 20 }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;

      // Calculate mouse position relative to container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate translation amount based on strength
      const translateX = x / strength;
      const translateY = y / strength;

      // Apply translation through transform
      imageRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate3d(0, 0, 0, 0deg)`;
    };

    // Add mouse move event listener
    container.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);

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
