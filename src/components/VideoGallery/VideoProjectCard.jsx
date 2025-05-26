import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import styles from "./VideoGallery.module.css";

const VideoProjectCard = ({ project, onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  
  // Efecto parallax para cada tarjeta al hacer hover
  const y = useMotionValue(0);

  // Manejar la reproducción del video cuando el mouse está sobre la tarjeta
  useEffect(() => {
    if (project.type === 'video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(error => {
          console.log("Error reproduciendo video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, project.type]);

  const handleVideoLoaded = () => {
    setVideoReady(true);
  };

  const handleCardClick = (e) => {
    // If there's an event, prevent default behavior
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // Use the callback function for tracking and navigation
    if (onProjectClick && project) {
      // Pass the project name, URL, and event for controlled navigation
      onProjectClick(project.name, project.url, e);
    }
  };

  return (
    <motion.div
      className={styles.projectCard}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      style={{ y }}
      onClick={handleCardClick}
    >
      {/* Convert to div to completely avoid anchor tag default behavior */}
      <div
        style={{ 
          display: "block", 
          width: "100%", 
          height: "100%",
          cursor: "pointer"
        }}
      >
        <motion.div 
          className={styles.imageContainer}
          animate={{ 
            filter: isHovered && project.type === 'image' ? "blur(3px) brightness(0.7)" : "blur(0px) brightness(1)"
          }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          {project.type === 'image' ? (
            <motion.img 
              src={project.media} 
              alt={project.name} 
              className={styles.projectImage}
              animate={{ 
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <>
              {/* Miniatura de fondo, visible hasta que el video esté listo */}
              {!videoReady && (
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className={styles.projectImage}
                  style={{
                    position: "absolute",
                    top: 0, left: 0, width: "100%", height: "100%",
                    objectFit: "cover", zIndex: 1
                  }}
                  draggable={false}
                />
              )}
              <motion.video
                ref={videoRef}
                className={styles.projectVideo}
                src={project.media}
                poster={project.thumbnail}
                muted
                playsInline
                loop
                onLoadedData={handleVideoLoaded}
                animate={{
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  background: "transparent"
                }}
              />
            </>
          )}
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className={styles.projectOverlay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                {project.description && (
                  <p className={styles.projectDescription}>{project.description}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoProjectCard;
