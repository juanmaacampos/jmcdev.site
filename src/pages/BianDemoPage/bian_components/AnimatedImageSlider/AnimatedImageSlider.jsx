import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../../../../hooks/useMediaQuery';
import LazyImage from '../../../../components/LazyImage/LazyImage';
import styles from './AnimatedImageSlider.module.css';

const AnimatedImageSlider = ({
  images = [],
  interval = 2500,
  animationType = 'parallax',
  staticAnimationType = null,
  width = '100%',
  height = 'auto',
  className = '',
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef();
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const isMobile = useIsMobile();

  const entranceAnimationDuration = 700;

  useEffect(() => {
    if (!images.length) return;
    setAnimating(true);
    const entranceTimer = setTimeout(() => {
      setAnimating(false);
    }, entranceAnimationDuration);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(timeoutRef.current);
    };
  }, [current, interval, images.length, entranceAnimationDuration]);

  // Solo activar parallax en desktop
  useEffect(() => {
    if (isMobile) return;
    
    const parallaxTargetNode = imageWrapperRef.current;
    const eventListenerNode = containerRef.current;

    if (animationType !== 'parallax' || !parallaxTargetNode || !eventListenerNode) {
      if (parallaxTargetNode) {
        parallaxTargetNode.style.transform = '';
      }
      return;
    }

    const handleMove = (e) => {
      if (!parallaxTargetNode) return;
      const rect = eventListenerNode.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 18;
      const y = (e.clientY - rect.top - rect.height / 2) / 18;
      parallaxTargetNode.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
    };

    const reset = () => {
      if (parallaxTargetNode) {
        parallaxTargetNode.style.transform = '';
      }
    };

    eventListenerNode.addEventListener('mousemove', handleMove, { passive: true });
    eventListenerNode.addEventListener('mouseleave', reset);

    return () => {
      eventListenerNode.removeEventListener('mousemove', handleMove);
      eventListenerNode.removeEventListener('mouseleave', reset);
      if (parallaxTargetNode) {
        parallaxTargetNode.style.transform = '';
      }
    };
  }, [animationType, current, isMobile]);

  if (!images.length) return null;

  const currentImage = images[current];

  const containerStyle = {
    position: 'relative',
    width: width,
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    overflow: 'visible',
  };

  const imageWrapperStyle = {
    transition: 'transform 0.1s ease-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyle = {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    margin: '0 auto',
    background: 'transparent',
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 0 20px rgba(233, 76, 42, 0.35))',
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 0.3s, transform 0.3s',
  };

  const staticAnimClass = staticAnimationType && styles[staticAnimationType] && !animating
    ? styles[staticAnimationType]
    : '';

  const entranceAnimClass = animating && styles[animationType]
    ? styles[animationType] + ' ' + styles.active
    : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.sliderContainer} ${className}`}
      style={containerStyle}
      {...props}
    >
      <div
        ref={imageWrapperRef}
        className={styles.imageWrapper}
        style={imageWrapperStyle}
      >
        <LazyImage
          src={currentImage.src}
          alt={currentImage.alt || ''}
          className={`${styles.sliderImage} ${entranceAnimClass} ${staticAnimClass}`}
          style={imageStyle}
          loading="eager"
          // Precargar solo la primera imagen
          {...(current === 0 ? { fetchPriority: "high" } : {})}
        />
      </div>
    </div>
  );
};

export default AnimatedImageSlider;
