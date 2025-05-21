import React from 'react';
import styles from './CoolTitle.module.css';

const CoolTitle = ({ children, className = '', animation = 'none', fontTransition = '0.3s', fontSize }) => {
  return (
    <h1 
      className={`${styles.coolTitle} ${className}`}
      style={{ 
        '--font-transition': fontTransition,
        fontSize: fontSize || undefined // Apply custom fontSize if provided
      }}
    >
      {children}
    </h1>
  );
};

export default CoolTitle;
