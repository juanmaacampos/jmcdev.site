import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import styles from './TopButton.module.css';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dynamicBottom, setDynamicBottom] = useState(20); // Default bottom position in px

  // Configuration constants for button positioning
  const DEFAULT_BOTTOM_MARGIN = 20; // Default margin from viewport bottom (px)
  const SPACE_ABOVE_FOOTER = 15;    // Desired space above footer (px)
  const SCROLL_THRESHOLD_FOR_VISIBILITY = 300; // Pixels to scroll before button appears

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.pageYOffset > SCROLL_THRESHOLD_FOR_VISIBILITY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Adjust position based on footer
      const footer = document.querySelector('footer'); // Adjust this selector if your footer has a specific class or ID

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate the desired bottom position for the button relative to the footer
        // This is how far from the viewport bottom the button should be to stay above the footer
        const desiredBottomRelativeToFooter = (viewportHeight - footerRect.top) + SPACE_ABOVE_FOOTER;

        // Check if the footer is encroaching on the button's default space
        // The threshold is when the footer's top is higher than where the button would comfortably sit by default, plus desired spacing.
        if (footerRect.top < viewportHeight - DEFAULT_BOTTOM_MARGIN + SPACE_ABOVE_FOOTER) {
          // Footer is encroaching or above.
          // The new bottom position should be at least the default margin.
          setDynamicBottom(Math.max(DEFAULT_BOTTOM_MARGIN, desiredBottomRelativeToFooter));
        } else {
          // Footer is not encroaching, use default bottom margin.
          setDynamicBottom(DEFAULT_BOTTOM_MARGIN);
        }
      } else {
        // No footer found, use default bottom margin.
        setDynamicBottom(DEFAULT_BOTTOM_MARGIN);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check for visibility and position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array as setIsVisible and setDynamicBottom are stable

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`${styles.topButtonContainer} ${isVisible ? styles.visible : ''}`}
      style={isVisible ? { bottom: `${dynamicBottom}px` } : {}}
    >
      <button
        onClick={scrollToTop}
        className={styles.topButton}
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        <FaChevronUp className={styles.icon} />
      </button>
    </div>
  );
};

export default TopButton;
