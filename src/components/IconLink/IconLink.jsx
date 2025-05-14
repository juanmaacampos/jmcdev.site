import React from 'react';
import { Link } from 'react-router-dom';
import styles from './IconLink.module.css';

function IconLink({
  icon: Icon,  // Componente del ícono de react-icons
  to,        
  label,     
  size = 'medium',
  effect = 'fade',
  color = '#55d3c4',
  className = '',
  external = false,
  showColorAlways = false,  // New prop to always show icon in color
  ...props
}) {
  const classes = `${styles.iconLink} ${styles[size]} ${styles[effect]} ${showColorAlways ? styles.coloredAlways : ''} ${className}`.trim();
  const style = { '--icon-color': color };

  const content = (
    <span className={styles.iconWrapper} aria-label={label}>
      <Icon className={`${styles.icon} ${showColorAlways ? styles.iconColored : ''}`} />
    </span>
  );

  if (external) {
    return (
      <a 
        href={to}
        className={classes}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link 
      to={to}
      className={classes}
      style={style}
      {...props}
    >
      {content}
    </Link>
  );
}

export default IconLink;
