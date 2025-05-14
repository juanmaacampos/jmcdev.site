import React, { useState, useEffect, useRef } from "react";
import styles from "./ServicioCard.module.css";
import CoolTitle from "../CoolTitle/CoolTitle";
import { generateSchemaMarkup } from '../../utils/seo';

export default function ServicioCard({ icon, svg, titulo, descripcion, modalData, playInitialAnimation }) {
  const [flipped, setFlipped] = useState(false);
  const cardBackRef = useRef(null);
  const [isCardBackScrolled, setIsCardBackScrolled] = useState(false);

  const serviceSchema = generateSchemaMarkup('Service', {
    name: titulo,
    description: descripcion,
    provider: {
      "@type": "Organization",
      "name": "JMCdev"
    }
  });

  useEffect(() => {
    const cardBackEl = cardBackRef.current;
    if (!cardBackEl || !flipped) {
      // Reset scroll state if card is not flipped or ref is not available
      setIsCardBackScrolled(false);
      if (cardBackEl) cardBackEl.scrollTop = 0; // Reset scroll position when card is flipped back
      return;
    }

    const handleScroll = () => {
      if (cardBackEl.scrollTop > 10) { // Threshold of 10px
        setIsCardBackScrolled(true);
      } else {
        setIsCardBackScrolled(false);
      }
    };

    cardBackEl.addEventListener('scroll', handleScroll);
    // Initial check in case it's already scrolled (e.g. due to fast re-render)
    handleScroll(); 

    return () => {
      cardBackEl.removeEventListener('scroll', handleScroll);
    };
  }, [flipped]); // Re-run when 'flipped' state changes

  useEffect(() => {
    const cardBackEl = cardBackRef.current;
    if (!cardBackEl) {
      return;
    }

    // Logic for when card is flipped to front
    if (!flipped) {
      setIsCardBackScrolled(false);
      if (cardBackEl) cardBackEl.scrollTop = 0; // Reset scroll position
      return; // Exit effect, no further setup needed
    }

    // --- Logic for when card is flipped to back (flipped === true) ---

    // 1. Ensure card back starts at the top and scroll indicator is reset
    cardBackEl.scrollTop = 0;
    setIsCardBackScrolled(false);

    // 2. Scroll animation cue (down and then up)
    let scrollAnimationTimer;
    if (cardBackEl.scrollHeight > cardBackEl.clientHeight) {
      // Smooth scroll to bottom
      cardBackEl.scrollTo({ top: cardBackEl.scrollHeight, behavior: 'smooth' });
      
      scrollAnimationTimer = setTimeout(() => {
        // Check if card is still flipped and element exists before scrolling up
        if (cardBackRef.current && flipped) { 
          // Smooth scroll to top
          cardBackEl.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 800); // Delay before scrolling back to top (adjust as needed)
    }

    // 3. Setup scroll event listener to manage the visibility of the scroll arrow
    const handleScroll = () => {
      if (cardBackEl.scrollTop > 10) { // Threshold of 10px
        setIsCardBackScrolled(true);
      } else {
        setIsCardBackScrolled(false);
      }
    };

    cardBackEl.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check for scroll position

    // Cleanup function for this effect
    return () => {
      cardBackEl.removeEventListener('scroll', handleScroll);
      if (scrollAnimationTimer) {
        clearTimeout(scrollAnimationTimer);
      }
    };
  }, [flipped]); // Re-run when 'flipped' state changes

  // Effect for initial flip hint animation
  useEffect(() => {
    if (playInitialAnimation) {
      // Check !flipped to avoid interference if user already flipped it
      // or if the animation was somehow re-triggered while already flipped.
      if (!flipped) { 
        const flipDuration = 600; // ms, from CSS transition (0.6s)
        const pauseDuration = 800; // ms, how long to show the back (0.8s)

        // Set flipped to true to start the flip animation
        setFlipped(true);

        // Set a timer to unflip the card
        const unflipTimer = setTimeout(() => {
          setFlipped(false); // Start unflipping
        }, flipDuration + pauseDuration); // Total time before unflip starts: 0.6s + 0.8s = 1.4s

        // Cleanup function to clear the timer if the component unmounts
        // or if playInitialAnimation changes before the timer fires.
        return () => {
          clearTimeout(unflipTimer);
        };
      }
    }
  }, [playInitialAnimation]); // Only depends on the trigger prop.

  return (
    <article 
      className={`${styles.servicioCard} ${flipped ? styles.flipped : ""}`}
      tabIndex={0}
      role="button"
      style={{ 
        cursor: "pointer"
        // ...(isMobileRef.current && cardHeight ? { height: `${cardHeight}px` } : {}) // Temporarily remove
      }}
      onClick={() => {
        setFlipped(f => !f);
        if (!flipped && cardBackRef.current) { // If flipping to back
          cardBackRef.current.scrollTop = 0; // Reset scroll
          setIsCardBackScrolled(false); // Reset scrolled state
        }
      }}
      onBlur={() => {
        setFlipped(false); // Make the card flip back when it loses focus
      }}
      itemScope 
      itemType="https://schema.org/Service"
    >
      <script type="application/ld+json">{serviceSchema}</script>
      <div className={styles.cardInner}>
        {/* Frente */}
        <div className={styles.cardFront}>
          <div className={styles.iconSvgWrapper}>
            {/* Renderiza el SVG o el icono directamente */}
            {svg ? svg : icon}
          </div>
          <h3 className={styles.cardTitle}>{titulo}</h3>
          {/* <p className={styles.cardDescription} ref={descriptionRef}>{descripcion}</p> */} {/* Temporarily remove ref if not used elsewhere */}
          <p className={styles.cardDescription}>{descripcion}</p>
        </div>
        {/* Dorso */}
        <div 
          className={`${styles.cardBack} ${isCardBackScrolled ? styles.isScrolled : ''} card-scrollable-content`}
          ref={cardBackRef}
        >
          {/* No renderizar icono aquí */}
          {modalData?.image && (
            <img src={modalData.image.src} alt={modalData.image.alt} className={styles.coverImage} />
          )}
          <div className={styles.headerContent}>
            {modalData?.subtitle && <div className={styles.subtitle}>{modalData.subtitle}</div>}
            <CoolTitle
              className={styles.title}
              animation="slide"
              fontTransition="0.4s"
            >
              {modalData?.title}
            </CoolTitle>
            <p className={styles.description}>{modalData?.description}</p>
          </div>
          {modalData?.tabs && modalData.tabs.length > 0 && (
            <div className={styles.cardBackTabs}>
              {modalData.tabs.map((tab, i) => (
                <div key={i} className={styles.cardBackTab}>
                  {tab.icon && <span className={styles.cardBackTabIcon}>{tab.icon}</span>}
                  <span className={styles.cardBackTabLabel}>{tab.label}</span>
                  <div className={styles.cardBackTabContent}>{tab.content}</div>
                </div>
              ))}
            </div>
          )}
          <button
            className={styles.cardBackClose}
            onClick={e => { e.stopPropagation(); setFlipped(false); }}
          >
            Volver
          </button>
        </div>
      </div>
    </article>
  );
}