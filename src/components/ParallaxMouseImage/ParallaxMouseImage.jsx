import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import styles from './ParallaxMouseImage.module.css';

function ParallaxMouseImage({ src, alt, className, draggable, mobileSrc, priority = false }) {
  const imageWrapperRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Solo activar parallax en desktop
    if (isMobile) return;

    const handleMouseMove = (event) => {
      if (imageWrapperRef.current) {
        const rect = imageWrapperRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / 20;
        const offsetY = (y - centerY) / 20;

        imageWrapperRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    const resetTransform = () => {
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = 'translate(0, 0)';
      }
    };

    if (imageWrapperRef.current) {
      imageWrapperRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
      imageWrapperRef.current.addEventListener('mouseleave', resetTransform);
    }

    return () => {
      if (imageWrapperRef.current) {
        imageWrapperRef.current.removeEventListener('mousemove', handleMouseMove);
        imageWrapperRef.current.removeEventListener('mouseleave', resetTransform);
      }
    };
  }, [isMobile]);

  const finalSrc = isMobile && mobileSrc ? mobileSrc : src;

  return (
    <div 
      ref={imageWrapperRef} 
      className={styles.parallaxContainer}
    >
      <img 
        src={finalSrc} 
        alt={alt} 
        className={`${className} loaded`}
        draggable={draggable}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
        width="480"
        height="480"
        style={{ transition: 'opacity 0.3s', opacity: 1 }}
      />
    </div>
  );
}

export default ParallaxMouseImage;
