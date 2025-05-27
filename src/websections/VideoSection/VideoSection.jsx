import React, { forwardRef } from 'react';
import styles from './VideoSection.module.css';
import { getVideoFormat } from '../../utils/browserDetection';

// Import both video formats
import videoBgPathWebm from '../../assets/videos/parallax_servicio.webm';
import videoBgPathMp4 from '../../assets/videos/parallax_servicio.mp4';

// Modified to accept an overlayRef prop
const VideoSection = forwardRef(({ overlayRef }, sectionRef) => {
  // Get the appropriate video format based on browser
  const videoSrc = getVideoFormat(videoBgPathWebm, videoBgPathMp4);
  const videoType = videoSrc.includes('.mp4') ? 'video/mp4' : 'video/webm';

  return (
    <section ref={sectionRef} className={styles.videoSectionContainer} id="video-section">
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
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
    </section>
  );
});

VideoSection.displayName = 'VideoSection';
export default VideoSection;