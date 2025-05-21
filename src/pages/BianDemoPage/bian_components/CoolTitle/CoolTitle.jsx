import React from 'react';
import styles from './CoolTitle.module.css';

const CoolTitle = ({ children, className = '', animation = 'none', fontTransition = '0.3s' }) => {
  return (
    <h1 
      className={`${styles.coolTitle} ${className}`}
      style={{ '--font-transition': fontTransition }}
    >
      {children}
    </h1>
  );
};

export default CoolTitle;
