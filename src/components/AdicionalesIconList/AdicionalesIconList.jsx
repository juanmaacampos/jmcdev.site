import React, { useState, useRef, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { AnimatePresence, motion as motionDiv } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { MobileOnly, DesktopOnly } from '../ConditionalRender/ConditionalRender';
import styles from './AdicionalesIconList.module.css';
import {
  FaCamera, FaInstagram, FaTools, FaGlobeAmericas,
  FaChartBar, FaImages, FaMapMarkedAlt, FaAdjust, FaChevronRight
} from 'react-icons/fa';

const iconMap = {
  "FaCamera": FaCamera,
  "FaInstagram": FaInstagram,
  "FaTools": FaTools,
  "FaGlobeAmericas": FaGlobeAmericas,
  "FaChartBar": FaChartBar,
  "FaImages": FaImages,
  "FaMapMarkedAlt": FaMapMarkedAlt,
  "FaAdjust": FaAdjust
};

const AdicionalIcon = ({ adicional, isSelected, onSelect, motionActive }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();
  
  const handleMouseMove = (e) => {
    // Solo aplicar efectos 3D en desktop
    if (isMobile || !motionActive || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10 * -1;
    const rotateY = (x - centerX) / 10;
    
    requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
  };
  
  const handleMouseLeave = () => {
    if (isMobile || !motionActive || !cardRef.current) return;
    requestAnimationFrame(() => {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  };
  
  const IconComponent = iconMap[adicional.icon];
  const isDisabled = adicional.disabled;

  if (isMobile && isDisabled) return null;

  return (
    <div
      ref={cardRef}
      className={`${styles.iconCard} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
      onClick={e => {
        if (isDisabled) {
          e.stopPropagation();
          return;
        }
        onSelect(adicional.id);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isDisabled ? { pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" } : {}}
    >
      {IconComponent && <IconComponent className={styles.icon} />}
      <span className={styles.iconName}>{adicional.name}</span>
    </div>
  );
};

const AdicionalesIconList = ({ adicionales, selectedAdicionalId, onAdicionalSelect, motionActive }) => {
  const containerRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const controls = useAnimation();
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const isMobile = useIsMobile();
  
  const enabledAdicionales = adicionales.filter(a => !a.disabled);
  const [showSwipeHint, setShowSwipeHint] = useState(enabledAdicionales.length > 4);

  const handleMobileScroll = () => {
    if (showSwipeHint) setShowSwipeHint(false);
  };

  useEffect(() => {
    setShowSwipeHint(enabledAdicionales.length > 4);
  }, [enabledAdicionales.length]);

  // Desktop scroll effects
  useEffect(() => {
    if (isMobile || !containerRef.current || !iconsContainerRef.current) return;
    
    const calculateHeights = () => {
      const currentContainerHeight = containerRef.current.getBoundingClientRect().height;
      const currentContentHeight = iconsContainerRef.current.getBoundingClientRect().height;
      setContainerHeight(currentContainerHeight);
      setContentHeight(currentContentHeight);
    };
    
    calculateHeights();
    window.addEventListener('resize', calculateHeights, { passive: true });
    return () => window.removeEventListener('resize', calculateHeights);
  }, [isMobile, adicionales.length]);

  useEffect(() => {
    if (!isMobile) {
      controls.start({ y: 0 });
      if (iconsContainerRef.current) {
        iconsContainerRef.current.scrollTop = 0;
      }
    }
  }, [controls, isMobile, adicionales.length]);
  
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current || !iconsContainerRef.current) return;
    if (contentHeight <= containerHeight) {
      controls.start({ y: 0, transition: { duration: 0.1 } });
      return;
    }
    
    const { clientY } = e;
    const { top, height: currentContainerHeight } = containerRef.current.getBoundingClientRect();
    let normalizedY = (clientY - top) / currentContainerHeight;
    normalizedY = Math.max(0, Math.min(1, normalizedY));
    const maxScroll = contentHeight - currentContainerHeight;
    const targetY = -normalizedY * maxScroll;
    
    controls.start({
      y: targetY,
      transition: { type: "tween", ease: "linear", duration: 0.1 },
    });
  };

  if (!adicionales || adicionales.length === 0) {
    return <p>No hay adicionales disponibles</p>;
  }
  
  return (
    <div 
      ref={containerRef}
      className={styles.iconListContainer}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      <MobileOnly>
        <div
          className={styles.mobileIconsContainer}
          onScroll={handleMobileScroll}
          style={{ position: "relative" }}
        >
          {adicionales.map((adicional, index) => (
            <AdicionalIcon
              key={`adicional-icon-${adicional.id || `placeholder-${index}`}`}
              adicional={adicional}
              isSelected={selectedAdicionalId === adicional.id}
              onSelect={onAdicionalSelect}
              motionActive={false}
            />
          ))}
          {enabledAdicionales.length > 4 && (
            <AnimatePresence>
              {showSwipeHint && (
                <motionDiv.div
                  className={styles.swipeHintOverlay}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    right: 0,
                    left: "auto",
                    top: "50%",
                    transform: "translateY(-50%)",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    background: "#55D3C4",
                    color: "#222",
                    padding: "0.4em 1.1em 0.4em 1.2em",
                    borderRadius: "1.2em 0 0 1.2em",
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
                    fontWeight: 500,
                    fontSize: "1em",
                    zIndex: 2,
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                >
                  <span style={{ marginRight: 10, fontSize: "0.97em" }}>Desliza para ver más</span>
                  <FaChevronRight className={styles.swipeArrow} style={{ fontSize: "1.2em" }} />
                </motionDiv.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </MobileOnly>

      <DesktopOnly>
        <motion.div
          ref={iconsContainerRef}
          className={styles.desktopIconsContainer}
          animate={controls}
          initial={{ y: 0 }}
        >
          {adicionales.map((adicional, index) => (
            <AdicionalIcon
              key={`adicional-${adicional.id || `placeholder-${index}`}`}
              adicional={adicional}
              isSelected={selectedAdicionalId === adicional.id}
              onSelect={onAdicionalSelect}
              motionActive={motionActive}
            />
          ))}
        </motion.div>
      </DesktopOnly>
    </div>
  );
};

export default AdicionalesIconList;
