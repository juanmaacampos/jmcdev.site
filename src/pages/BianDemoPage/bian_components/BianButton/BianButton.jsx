import React from 'react';
import styles from './BianButton.module.css';

const BianButton = ({ 
  children, 
  onClick, 
  href, 
  type = 'button',
  className = '',
  ...props 
}) => {
  // If href is provided, render as a link
  if (href) {
    return (
      <a 
        href={href} 
        className={`${styles.bianButton} ${className}`} 
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Otherwise, render as a button
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${styles.bianButton} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default BianButton;
