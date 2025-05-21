import React, { useEffect } from 'react';
import styles from './HeaderHero.module.css';
import AnimatedImageSlider from '../../bian_components/AnimatedImageSlider/AnimatedImageSlider';
import CoolTitle from '../../bian_components/CoolTitle/CoolTitle';
import PaintTitle from '../../bian_components/PaintTitle/PaintTitle';
import BianButton from '../../bian_components/BianButton/BianButton'; // Import new component
import logoRed from '../../bian_assets/images/logo_bian_redwhite.svg';

import boardSushi from '../../bian_assets/images/bowl_sushi.png';
import sushiDish from '../../bian_assets/images/sushi_dish.png';
import threeSushis from '../../bian_assets/images/three_sushis.png'; 
import sushiBackground from '../../bian_assets/images/sushi_background.svg'; // import background


const defaultSliderImages = [
  { src: boardSushi, alt: "Sushi board" },
  { src: sushiDish, alt: "Sushi dish" },
  { src: threeSushis, alt: "Three Sushis" },
];

const HeaderHero = ({ sliderImages = defaultSliderImages }) => {
  // Effect to preload the first image
  useEffect(() => {
    if (sliderImages && sliderImages.length > 0) {
      const img = new Image();
      img.src = sliderImages[0].src;
    }
  }, [sliderImages]);

  return (
    <header className={styles.header}>
      {/* Overlay de la imagen decorativa, menos difuminada */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          backgroundImage: `url(${sushiBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          opacity: 0.65, // más visible
          filter: 'blur(0.5px)', // menos blur
        }}
      />
      <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
        {/* Logo at the top */}
        <div className={styles.logoContainer}>
          <img src={logoRed} alt="Bian Sushi Logo" className={styles.logo} />
        </div>
        
        <div className={styles.heroContent}>
          {/* Imagen animada con slider */}
          <div className={styles.bowlImageContainer} style={{ marginBottom: '0.5rem' }}>
            <AnimatedImageSlider
              images={sliderImages}
              interval={2600}
              animationType="pulse" // Transition between images
              staticAnimationType="wiggle" // Animation while image is displayed
              width="100%"
              height="auto"
              className={styles.bowlImage}
              glowColor="#d9201c"
            />
          </div>
          
          <div className={`${styles.textSection} ${styles.textSectionWithJapaneseFont}`}>
            {/* Title section with better spacing */}
            <div className={styles.titleGroup} style={{ marginBottom: '0.5rem' }}>
              <CoolTitle 
                className={styles.coolTitle}
                fontSize="2.2rem" // Reducido de 2.4rem
              >
                La Experiencia del Sushi
              </CoolTitle>
              <div className={styles.paintTitleWrapper}>
                <PaintTitle
                  words={['autentico', 'fresco', 'delicioso', 'artesanal', 'unico']}
                  color="#d9201c"
                />
              </div>
            </div>
            
            <p className={styles.description} style={{ 
              marginBottom: '0.8rem', 
              fontSize: '0.95rem', 
              lineHeight: '1.3' 
            }}>
             <strong>Desde 2012</strong> trabajamos y preparamos cada plato a la vista, para que disfrutes no solo del sabor, sino también del proceso
            </p>

            <div className={styles.buttonContainer} style={{ marginTop: '1.8rem' }}>
              {/* Replace original button with new BianButton */}
              <BianButton href="#menu">Ver Menu</BianButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHero;
