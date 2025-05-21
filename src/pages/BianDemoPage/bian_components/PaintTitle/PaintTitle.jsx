import React, { useState, useEffect } from 'react';
import styles from './PaintTitle.module.css';

const PaintTitle = ({ words, color = "#E94C2A", speed = 1200, pauseDuration = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextActive, setIsTextActive] = useState(false); // Controls visibility and reveal/hide trigger

  useEffect(() => {
    if (!words || words.length === 0) return;

    // Start by revealing the current word
    setIsTextActive(true);

    // Timer to hide the word after it has been revealed and paused
    const hideTimer = setTimeout(() => {
      setIsTextActive(false); // Trigger hide animation
    }, speed + pauseDuration); // Reveal duration + pause duration

    // Timer to change to the next word after hide animation is complete
    const nextWordTimer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
      // setIsTextActive(true) will be triggered by the next effect run due to currentIndex change
    }, speed + pauseDuration + speed); // Reveal + pause + hide duration

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextWordTimer);
    };
  }, [currentIndex, words, speed, pauseDuration]);

  if (!words || words.length === 0) return null;

  return (
    <div className={styles.paintTitleContainer}>
      <span
        className={`${styles.paintText} ${isTextActive ? styles.paintTextActive : ''}`}
        style={{
          '--paint-title-color': color, // Use CSS variable for color
          '--animation-speed': `${speed}ms` // Pass speed as CSS variable for transition
        }}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

export default PaintTitle;
