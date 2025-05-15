import React, { Suspense, lazy } from 'react';
import Button from '../../components/Button/Button';
import MachineTypeTitle from '../../components/MachineTypeTitle/MachineTypeTitle';
import styles from './Header.module.css';
import CoolTitle from '../../components/CoolTitle/CoolTitle';
import { FaEye, FaGithub, FaLaptop, FaListAlt } from 'react-icons/fa';
import ParallaxMouseImage from '../../components/ParallaxMouseImage/ParallaxMouseImage';
import headerImage from '../../assets/images/header_img.png';

const ParticleBackground = lazy(() => import('../../components/ParticleBackground/ParticleBackground'));

// A simple fallback for Suspense, can be customized
const ParticleFallback = () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;

function Header() {
  return (
    <header className={styles.header}>
      <Suspense fallback={<ParticleFallback />}>
        <ParticleBackground id="header-particles" /> {/* Use ParticleBackground */}
      </Suspense>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.textBlockWrapper}>
              <CoolTitle>Creamos Experiencias Digitales que</CoolTitle>
              <MachineTypeTitle
                words={['conectan', 'sorprenden', 'venden', 'posicionan', 'trascienden', 'destacan', 'atraen']}
                color="#B687F7" // o "linear-gradient(45deg, #fff 30%, #B687F7 100%)"
              />
              
<p className={styles.description}>
  <strong>Páginas web que impactan, redes que conectan y fotos que venden</strong>. Todo lo que tu negocio necesita para crecer online, con calidad profesional y al mejor precio del mercado.
</p>


            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <ParallaxMouseImage 
              src={headerImage} 
              alt="Desarrollo web" 
              className={styles.headerImage}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
