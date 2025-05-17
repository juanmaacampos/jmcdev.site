import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "./VideoGallery.module.css";
import VideoProjectCard from "./VideoProjectCard";

// Hook para detectar si estamos en móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const TAP_THRESHOLD = 10; // px para diferenciar entre tap y swipe
const TAP_MOVE_THRESHOLD = 10; // Max pixels to move for it to be considered a tap


const VideoGallery = ({ projects, title, description, onProjectClick }) => {
  const isMobile = useIsMobile();

  // Hooks for Mobile version
  const [activeMobileCardId, setActiveMobileCardId] = useState(null);
  const mobileTouchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Hooks for Desktop version
  const galleryRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalContentWidth, setTotalContentWidth] = useState(0);
  const controls = useAnimation();
  const [showInstructionArrows, setShowInstructionArrows] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mobile: Effect for handling touch outside to close overlay
  useEffect(() => {
    if (!isMobile || activeMobileCardId === null) return;

    const handleTouchOutside = (e) => {
      if (!e.target.closest(`.${styles.mobileCard}`) && !e.target.closest(`.${styles.mobileCardOverlay}`)) {
        setActiveMobileCardId(null);
      }
    };

    document.addEventListener("mousedown", handleTouchOutside);
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("mousedown", handleTouchOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [isMobile, activeMobileCardId]);

  // Desktop: Effect for showing instruction arrows initially
  useEffect(() => {
    if (isMobile) return; // Only run for desktop

    setShowInstructionArrows(true);
    const timer = setTimeout(() => {
      setShowInstructionArrows(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isMobile]); // Rerun if isMobile changes, though logic inside prevents execution

  // Desktop: Effect for calculating dimensions
  useEffect(() => {
    if (isMobile || !galleryRef.current) return; // Only run for desktop

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


  const handleMobileCardTap = (project) => { // Changed to accept the whole project object
    if (activeMobileCardId === project.id) {
      if (onProjectClick) {
        onProjectClick(project.name); // Track click before opening URL
      }
      window.open(project.url, "_blank", "noopener,noreferrer");
      setActiveMobileCardId(null);
    } else {
      setActiveMobileCardId(project.id);
    }
  };

  // Desktop: Mouse move handler
  const handleMouseMove = (e) => {
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
  };

  // Desktop: Mouse enter handler
  const handleMouseEnter = () => {
    if (isMobile) return;
    setShowInstructionArrows(true);
    setTimeout(() => setShowInstructionArrows(false), 2500);
  };

  // Desktop: Mouse leave handler
  const handleMouseLeave = () => {
    if (isMobile) return;
    // No action needed, position is maintained
  };


  if (isMobile) {
    // console.log("Mobile projects data:", projects);
    return (
      <div className={styles.galleryContainer}>
        {title && <div className={styles.galleryTitle}>{title}</div>}
        {description && (
          <div className={styles.galleryDescription}>{description}</div>
        )}
        <div className={styles.mobileGalleryWrapper}>
          {projects.map((project) => {
            // console.log(`Project ID: ${project.id}, Thumbnail URL: ${project.thumbnail}`);
            return (
              <div
                key={project.id}
                className={styles.mobileCard}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  mobileTouchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
                }}
                onTouchEnd={(e) => {
                  const touch = e.changedTouches[0];
                  const startX = mobileTouchStartRef.current.x;
                  const startY = mobileTouchStartRef.current.y;
                  const startTime = mobileTouchStartRef.current.time;

                  const dx = Math.abs(touch.clientX - startX);
                  const dy = Math.abs(touch.clientY - startY);
                  const dt = Date.now() - startTime;

                  if (dx < TAP_MOVE_THRESHOLD && dy < TAP_MOVE_THRESHOLD && dt < 300) { // It's a tap
                    handleMobileCardTap(project); // Pass the whole project object
                    e.preventDefault(); // Prevent onClick if tap is handled by touch
                  }
                  // Reset for the next interaction
                  mobileTouchStartRef.current = { x: 0, y: 0, time: 0 }; 
                }}
                onClick={(e) => {
                  // This will primarily handle mouse clicks or taps not prevented by onTouchEnd.
                  // The tap differentiation (1st vs 2nd) is handled within handleMobileCardTap.
                  handleMobileCardTap(project); // Pass the whole project object
                }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className={styles.mobileCardImage}
                  draggable="false"
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
            );
          })}
        </div>
      </div>
    );
  }

  // DESKTOP VERSION JSX
  return (
    <div className={styles.galleryContainer}>
      {title && <div className={styles.galleryTitle}>{title}</div>}
      {description && (
        <div className={styles.galleryDescription}>{description}</div>
      )}
      <div
        className={styles.galleryWrapper}
        ref={galleryRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <motion.div
          className={styles.gallerySlider}
          animate={controls}
        >
          {projects.map((project, index) => (
            <VideoProjectCard
              key={project.id || index}
              project={project}
              index={index}
              onProjectClick={onProjectClick} // Pass the onProjectClick prop
            />
            /*
              NOTE: You'll need to modify your VideoProjectCard component.
              Inside VideoProjectCard.jsx, when the card/project is clicked to open project.url,
              you should call the onProjectClick prop like this:
              if (props.onProjectClick) {
                props.onProjectClick(props.project.name);
              }
              // ... then open the project.url ...
            */
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
    </div>
  );
};

export default VideoGallery;