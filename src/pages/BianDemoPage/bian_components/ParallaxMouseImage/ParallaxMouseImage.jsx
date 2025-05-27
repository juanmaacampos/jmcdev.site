import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '../../../../hooks/useMediaQuery';
import LazyImage from '../../../../components/LazyImage/LazyImage';
import styles from './ParallaxMouseImage.module.css';

const ParallaxMouseImage = ({ src, alt, className, draggable = false, strength = 20 }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Solo activar en desktop
    if (isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const translateX = x / strength;
      const translateY = y / strength;

      imageRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate3d(0, 0, 0, 0deg)`;
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transition = 'transform 0.3s ease-out';
        imageRef.current.style.transform = 'translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)';
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.style.transition = 'transform 0.1s ease-out';
          }
        }, 300);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, isMobile]);

  return (
    <div ref={containerRef} className={styles.parallaxContainer}>
      <LazyImage 
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
