import React, { Suspense, lazy, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MachineTypeTitle from '../../components/MachineTypeTitle/MachineTypeTitle';
import styles from './Header.module.css';
import CoolTitle from '../../components/CoolTitle/CoolTitle';
import ParallaxMouseImage from '../../components/ParallaxMouseImage/ParallaxMouseImage';
import { FaEye, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useLanguageTranslation } from '../../utils/languageUtils'; // Replace previous import

// Import header image
import headerImage from '../../assets/images/header_img.webp';

const ParticleBackground = lazy(() => import('../../components/ParticleBackground/ParticleBackground'));

// A simple fallback for Suspense, can be customized
const ParticleFallback = () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;

function Header() {
  const { currentLanguage } = useLanguage();
  const { t } = useLanguageTranslation(currentLanguage); // Updated hook

  // Get animated words based on current language
  const animatedWords = t('header.animatedWords');

  // Effect to start loading the header image early
  useEffect(() => {
    const img = new Image();
    img.src = headerImage;
  }, []);

  // Add a language-specific title class
  const titleClass = `${styles.title} ${currentLanguage === 'en' ? styles.titleEn : ''}`;

  return (
    <header className={styles.header} id="inicio">
      <Suspense fallback={<ParticleFallback />}>
        <ParticleBackground id="header-particles" />
      </Suspense>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.textBlockWrapper}>
              <CoolTitle 
                className={titleClass} 
                hoverFonts={[
                  "'Geologica', sans-serif" ]}
                fontTransition="0.7s"
              >
                {t('header.title')}{' '}
                <MachineTypeTitle
                  words={animatedWords}
                  className={styles.machine_title}
                  color="#8a4dff"
                />
              </CoolTitle>
              
              <p className={styles.description}>
                {t('header.description')}
              </p>

              
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <ParallaxMouseImage 
              src={headerImage} 
              alt="Desarrollo web" 
              className={styles.headerImage}
              draggable={false}
              strength={40} // Reduced strength for better experience on small screens
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
