import React, { useEffect } from 'react';
import styles from './HeaderHero.module.css';
import ParallaxMouseImage from '../../bian_components/ParallaxMouseImage/ParallaxMouseImage';
import CoolTitle from '../../bian_components/CoolTitle/CoolTitle';
import PaintTitle from '../../bian_components/PaintTitle/PaintTitle';
import logoRed from '../../bian_assets/images/logo_bian_white.svg';
import bowlSushi from '../../bian_assets/images/bowl_sushi.png';

const HeaderHero = () => {
  // Effect to preload the image
  useEffect(() => {
    const img = new Image();
    img.src = bowlSushi;
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo at the top */}
        <div className={styles.logoContainer}>
          <img src={logoRed} alt="Bian Sushi Logo" className={styles.logo} />
        </div>
        
        <div className={styles.heroContent}>
          {/* Bowl image with better positioning */}
          <div className={styles.bowlImageContainer}>
            <ParallaxMouseImage 
              src={bowlSushi} 
              alt="Sushi bowl" 
              className={styles.bowlImage}
              draggable={false}
            />
          </div>
          
          <div className={styles.textSection}>
            {/* Title section with better spacing */}
            <div className={styles.titleGroup}>
              <CoolTitle className={styles.coolTitle}>La Experiencia del Sushi</CoolTitle>
              <div className={styles.paintTitleWrapper}>
                <PaintTitle
                  words={['auténtico', 'fresco', 'delicioso', 'artesanal', 'único']}
                  color="#E94C2A"
                />
              </div>
            </div>
            
            <p className={styles.description}>
              La mejor experiencia gastronómica japonesa con ingredientes frescos y técnicas tradicionales que te transportarán al corazón de Japón.
            </p>

            <div className={styles.buttonContainer}>
              <a href="#menu" className={styles.primaryButton}>Ver Menú</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHero;
