import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import styles from './VideoSection.module.css';
import { getVideoFormat } from '../../utils/browserDetection';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Import both video formats
import videoBgPathWebm from '../../assets/videos/parallax_servicio.webm';
import videoBgPathMp4 from '../../assets/videos/parallax_servicio.mp4';
import parallaxPoster from '../../assets/images/parallax_service.webp';

// Modified to accept an overlayRef prop
const VideoSection = forwardRef(({ overlayRef }, sectionRef) => {
  const innerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const isMobile = useIsMobile();
  const scrollHintText = isMobile ? 'Sigue deslizando' : 'Scroll para continuar';

  // Merge forwarded ref with internal ref
  const combinedRef = useCallback(node => {
    innerRef.current = node;
    if (typeof sectionRef === 'function') sectionRef(node);
    else if (sectionRef) sectionRef.current = node;
  }, [sectionRef]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Show when section fills viewport (entering), hide only when it's truly leaving
    const showObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.85 }
    );

    // Hide once the section starts to leave the viewport after the animation
    const hideObserver = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setVisible(false); },
      { threshold: 0.1 }
    );

    // Pre-load video when user scrolls within 800px of this section
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    showObserver.observe(el);
    hideObserver.observe(el);
    loadObserver.observe(el);

    return () => {
      showObserver.disconnect();
      hideObserver.disconnect();
      loadObserver.disconnect();
    };
  }, []);

  // Get the appropriate video format based on browser
  const videoSrc = getVideoFormat(videoBgPathWebm, videoBgPathMp4);
  const videoType = videoSrc.includes('.mp4') ? 'video/mp4' : 'video/webm';

  return (
    <section ref={combinedRef} className={styles.videoSectionContainer} id="video-section">
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        preload={loadVideo ? 'auto' : 'none'}
        poster={parallaxPoster}
        src={loadVideo ? videoSrc : undefined}
        type={videoType}
      />
      {/* Attach the passed overlayRef here */}
      <div
        ref={overlayRef}
        className={styles.videoOverlay}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* This overlay will be the target for the mask animation */}
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} ${visible ? styles.scrollIndicatorVisible : ''}`}>
        <span className={styles.scrollHintText}>{scrollHintText}</span>
        <span className={styles.scrollChevron} />
        <span className={styles.scrollChevron} />
      </div>
    </section>
  );
});

VideoSection.displayName = 'VideoSection';
export default VideoSection;
