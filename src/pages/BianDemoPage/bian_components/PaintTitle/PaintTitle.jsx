import React, { useState, useEffect } from 'react';
import styles from './PaintTitle.module.css';

const PaintTitle = ({ words, color = "#d9201c", speed = 1200, pauseDuration = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState('enter'); // 'enter' | 'exit'

  useEffect(() => {
    if (!words || words.length === 0) return;

    setAnimationState('enter');

    const hideTimer = setTimeout(() => {
      setAnimationState('exit');
    }, speed + pauseDuration);

    const nextWordTimer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
    }, speed + pauseDuration + speed);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextWordTimer);
    };
  }, [currentIndex, words, speed, pauseDuration]);

  if (!words || words.length === 0) return null;

  return (
    <div className={styles.paintTitleContainer}>
      <span
        className={
          `${styles.paintText} ` +
          (animationState === 'enter'
            ? styles.paintTextActive
            : animationState === 'exit'
            ? styles.paintTextExit
            : '')
        }
        style={{
          '--paint-title-color': color,
          '--animation-speed': `${speed}ms`
        }}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

export default PaintTitle;
