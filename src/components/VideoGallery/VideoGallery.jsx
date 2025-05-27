import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { MobileOnly, DesktopOnly } from '../ConditionalRender/ConditionalRender';
import LazyImage from '../LazyImage/LazyImage';
import VideoProjectCard from './VideoProjectCard';
import styles from './VideoGallery.module.css';

const VideoGallery = ({ projects, title, description, onProjectClick }) => {
  const isMobile = useIsMobile();
  
  // Always declare all state hooks at the top
  const [activeMobileCardId, setActiveMobileCardId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalContentWidth, setTotalContentWidth] = useState(0);
  const [showInstructionArrows, setShowInstructionArrows] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Always declare all ref hooks
  const mobileTouchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const galleryRef = useRef(null);
  
  // Always declare all animation hooks
  const controls = useAnimation();

  // Mobile effects
  useEffect(() => {
    if (!isMobile || activeMobileCardId === null) return;

    const handleTouchOutside = (e) => {
      if (!e.target.closest(`.${styles.mobileCard}`) && !e.target.closest(`.${styles.mobileCardOverlay}`)) {
        setActiveMobileCardId(null);
      }
    };

    document.addEventListener("touchstart", handleTouchOutside, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [isMobile, activeMobileCardId]);

  // Desktop instruction arrows effect
  useEffect(() => {
    if (isMobile) return;

    setShowInstructionArrows(true);
    const timer = setTimeout(() => {
      setShowInstructionArrows(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Desktop dimensions calculation effect
  useEffect(() => {
    if (isMobile || !galleryRef.current) return;

    const calculateDimensions = () => {
      const cardWidth = 640;
      const cardMargin = 25;
      const currentContainerWidth = galleryRef.current.clientWidth;
      const currentTotalWidth = (cardWidth + cardMargin * 2) * projects.length;

      setContainerWidth(currentContainerWidth);
      setTotalContentWidth(currentTotalWidth);

      const initialPosition = (currentContainerWidth - cardWidth) / 2;
      controls.set({ x: initialPosition });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [isMobile, controls, projects.length]);

  // Event handlers - using useCallback to prevent unnecessary re-renders
  const handleMobileCardTap = useCallback((project) => {
    if (activeMobileCardId === project.id) {
      if (onProjectClick) {
        onProjectClick(project.name);
      }
      window.open(project.url, "_blank", "noopener,noreferrer");
      setActiveMobileCardId(null);
    } else {
      setActiveMobileCardId(project.id);
    }
  }, [activeMobileCardId, onProjectClick]);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !galleryRef.current || containerWidth === 0) return;

    const { clientX } = e;
    const { left, width } = galleryRef.current.getBoundingClientRect();
    const relativeX = (clientX - left) / width;
    setMousePosition({ x: relativeX, y: 0 });

    if (!hasInteracted) {
      setHasInteracted(true);
      setShowInstructionArrows(true);
      setTimeout(() => setShowInstructionArrows(false), 3000);
    }

    const cardWidth = 640;
    const cardMargin = 25;
    const leftEdgeSpace = (containerWidth - cardWidth) / 2;
    const rightEdgeSpace = containerWidth - (cardWidth + leftEdgeSpace);
    const maxScrollRange = totalContentWidth - containerWidth + cardMargin * 2;
    const moveRange = maxScrollRange + leftEdgeSpace + rightEdgeSpace;
    const positionX = leftEdgeSpace - relativeX * moveRange;

    controls.start({
      x: positionX,
      transition: { type: "spring", stiffness: 80, damping: 20, mass: 0.5 },
    });
  }, [isMobile, containerWidth, totalContentWidth, hasInteracted, controls]);

  const handleMouseEnter = useCallback(() => {
    setShowInstructionArrows(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowInstructionArrows(false);
  }, []);

  return (
    <div className={styles.galleryContainer}>
      {title && <div className={styles.galleryTitle}>{title}</div>}
      {description && <div className={styles.galleryDescription}>{description}</div>}
      
      <MobileOnly>
        <div className={styles.mobileGalleryWrapper}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.mobileCard}
              onClick={(e) => {
                e.preventDefault();
                handleMobileCardTap(project);
              }}
            >
              <LazyImage
                src={project.thumbnail}
                alt={project.name}
                className={styles.mobileCardImage}
                loading="lazy"
              />
              <AnimatePresence>
                {activeMobileCardId === project.id && (
                  <motion.div
                    className={styles.mobileCardOverlay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.mobileCardOverlayContent}>
                      <h3 className={styles.mobileCardTitle}>{project.name}</h3>
                      <p className={styles.mobileCardDescription}>{project.description}</p>
                      <span className={styles.mobileCardHint}>Toca de nuevo para visitar</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </MobileOnly>

      <DesktopOnly>
        <div 
          ref={galleryRef}
          className={styles.galleryWrapper}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div className={styles.gallerySlider} animate={controls}>
            {projects.map((project, index) => (
              <VideoProjectCard
                key={project.id}
                project={project}
                onProjectClick={onProjectClick}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {showInstructionArrows && (
              <>
                <motion.div
                  className={styles.instructionArrow}
                  key="left-arrow"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <motion.div
                  className={`${styles.instructionArrow} ${styles.right}`}
                  key="right-arrow"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </DesktopOnly>
    </div>
  );
};

export default VideoGallery;