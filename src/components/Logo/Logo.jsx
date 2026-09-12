import styles from './Logo.module.css';
import logoImage from '../../assets/images/jmcdev.webp';

const Logo = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <img src={logoImage} alt="JMCdev Logo" />
    </div>
  );
};

export default Logo;
