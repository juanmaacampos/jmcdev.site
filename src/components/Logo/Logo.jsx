import styles from './Logo.module.css';
import logoImage from '../../assets/images/jmcdev.webp';

const Logo = ({ onClick }) => {
  const handleClick = () => {
    // Si se está en la página CMS, redirigir a jmcdev.site
    if (window.location.pathname.includes('/e-panel')) {
      window.location.href = '/';
    } else {
      // En la página principal, ejecutar el onClick pasado (scroll al top)
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <img src={logoImage} alt="JMCdev Logo" />
    </div>
  );
};

export default Logo;
