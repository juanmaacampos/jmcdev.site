import React, { useState, useRef, useEffect } from 'react';
import styles from './AdicionalesIconList.module.css';
import { useAnimation, motion } from 'framer-motion'; // Import motion from framer-motion
import { AnimatePresence, motion as motionDiv } from 'framer-motion';
import {
  FaCamera, FaInstagram, FaTools, FaGlobeAmericas,
  FaChartBar, FaImages, FaMapMarkedAlt, FaAdjust, FaEllipsisH, FaChevronRight
} from 'react-icons/fa';

// Mapa de iconos para renderizar el correcto según el string en ADICIONALES_DATA
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

const AdicionalIcon = ({ adicional, isSelected, onSelect, motionActive, isMobile }) => {
  const cardRef = useRef(null);
  
  // Solo activar efecto 3D en desktop
  const isPCView = window.matchMedia('(min-width: 993px)').matches;
  
  const handleMouseMove = (e) => {
    if (!isPCView || !motionActive || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calcular rotación basada en la posición del mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10 * -1;
    const rotateY = (x - centerX) / 10;
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };
  
  const handleMouseLeave = () => {
    if (!isPCView || !motionActive || !cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  };
  
  // Obtener el componente de icono adecuado
  const IconComponent = iconMap[adicional.icon];

  const isDisabled = adicional.disabled;

  // En móviles, no renderizar si está disabled
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
  
  // Verificar si estamos en vista móvil
  const isMobile = window.matchMedia('(max-width: 992px)').matches;
  
  // Filtra los adicionales no deshabilitados para contar cuántos se muestran en móvil
  const enabledAdicionales = adicionales.filter(a => !a.disabled);

  // Estado para mostrar/ocultar el hint
  const [showSwipeHint, setShowSwipeHint] = useState(enabledAdicionales.length > 4);

  // Oculta el hint al hacer scroll horizontal en móvil
  const handleMobileScroll = () => {
    if (showSwipeHint) setShowSwipeHint(false);
  };

  // Si el número de adicionales cambia, vuelve a mostrar el hint si corresponde
  useEffect(() => {
    setShowSwipeHint(enabledAdicionales.length > 4);
  }, [enabledAdicionales.length]);

  // Effect for calculating container and content heights
  useEffect(() => {
    if (isMobile || !containerRef.current || !iconsContainerRef.current) return;
    
    const calculateHeights = () => {
      const currentContainerHeight = containerRef.current.clientHeight;
      const currentContentHeight = iconsContainerRef.current.scrollHeight;
      
      setContainerHeight(currentContainerHeight);
      setContentHeight(currentContentHeight);
    };
    
    // Debounce or use a ResizeObserver for better performance if needed,
    // but for now, direct calculation on mount and resize.
    calculateHeights(); 
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeights);
    // Also recalculate if the number of adicionales changes, as this affects contentHeight
    return () => window.removeEventListener('resize', calculateHeights);
  }, [isMobile, adicionales, adicionales.length]); // Added 'adicionales' to dependencies

  // Ensure the content starts at the top when first rendered or when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      controls.start({ y: 0 });
      // Scroll to top visually as well (in case of manual scroll)
      if (iconsContainerRef.current) {
        iconsContainerRef.current.scrollTop = 0;
      }
    }
  }, [controls, isMobile, adicionales.length]);
  
  // Handle mouse movement for vertical scrolling (only on desktop)
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current || !iconsContainerRef.current) return;
    if (contentHeight <= containerHeight) {
      controls.start({ y: 0, transition: { duration: 0.1 } });
      return;
    }
    const { clientY } = e;
    const { top, height: currentContainerHeight } = containerRef.current.getBoundingClientRect();
    // Usa todo el alto real del contenedor, sin padding virtual
    let normalizedY = (clientY - top) / currentContainerHeight;
    normalizedY = Math.max(0, Math.min(1, normalizedY));
    const maxScroll = contentHeight - currentContainerHeight;
    const targetY = -normalizedY * maxScroll;
    controls.start({
      y: targetY,
      transition: { type: "tween", ease: "linear", duration: 0.1 },
    });
  };
  
  const handleMouseLeaveContainer = () => {
    // Optional: Reset to a specific position or stop animation when mouse leaves.
    // For now, it will just stop updating. If content fits, it's already at y:0.
    // If content is scrollable, it will remain at its last position.
    // To reset to top:
    // if (!isMobile && contentHeight > containerHeight) {
    //   controls.start({ y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } });
    // }
  };

  if (!adicionales || adicionales.length === 0) {
    return <p>No hay adicionales disponibles</p>;
  }
  
  return (
    <div 
      ref={containerRef}
      className={styles.iconListContainer}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeaveContainer : undefined} // Added mouse leave handler
    >
      {isMobile ? (
        <>
          <div
            className={styles.mobileIconsContainer}
            onScroll={handleMobileScroll}
            style={{ position: "relative" }}
          >
            {adicionales.map(adicional => (
              <AdicionalIcon
                key={adicional.id}
                adicional={adicional}
                isSelected={selectedAdicionalId === adicional.id}
                onSelect={onAdicionalSelect}
                motionActive={false} // No 3D effects on mobile
                isMobile={true}
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
                      background: "var(--color-bg-secondary, #55D3C4",
                      color: "var(--color-text, #222)",
                      padding: "0.4em 1.1em 0.4em 1.2em",
                      borderRadius: "1.2em 0 0 1.2em",
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
                      fontWeight: 500,
                      fontSize: "1em",
                      letterSpacing: "0.01em",
                      border: "1px solid var(--color-border,rgb(255, 255, 255))",
                      zIndex: 2,
                      pointerEvents: "none", // para que no tape el scroll
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
        </>
      ) : (
        // Desktop: Mouse-controlled vertical scroll with animated motion
        <motion.div
          ref={iconsContainerRef}
          className={styles.desktopIconsContainer}
          animate={controls}
          initial={{ y: 0 }} // Ensure it starts at y:0
        >
          {adicionales.map(adicional => (
            <AdicionalIcon
              key={adicional.id}
              adicional={adicional}
              isSelected={selectedAdicionalId === adicional.id}
              onSelect={onAdicionalSelect}
              motionActive={motionActive}
              isMobile={false}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdicionalesIconList;
