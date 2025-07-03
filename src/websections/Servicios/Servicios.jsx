import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Servicios.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { FaShare } from "react-icons/fa";
import Svg from "../../components/Svg/Svg";
import MachineTypeTitle from "../../components/MachineTypeTitle/MachineTypeTitle";
import { useLanguageTranslation } from "../../utils/languageUtils"; 

// --- IMPORTA LOS ASSETS ---
import lottieWorld from "../../assets/images/modals_assets/world.json";
import lottieSocial from "../../assets/images/modals_assets/social.json";
import lottieCamera from "../../assets/images/modals_assets/camera.json";
import lottieDesign from "../../assets/images/modals_assets/design.json";
import lottieHosting from "../../assets/images/modals_assets/hosting.json";
import lottieSupport from "../../assets/images/modals_assets/support.json";

import imgDesarrolloWeb from "../../assets/images/modals_assets/desarrollo_web.webp";
import imgRedes from "../../assets/images/modals_assets/redes.webp";
import imgCamera from "../../assets/images/modals_assets/camera.webp";
import imgDiseno from "../../assets/images/modals_assets/diseño.webp";
import imgHosting from "../../assets/images/modals_assets/hosting.webp";
import imgMantenimiento from "../../assets/images/modals_assets/mantenimiento.webp";
import imgCmsOverview from "../../assets/images/cms_assets/cms_overview.webp";

import Button from "../../components/Button/Button";

import parallaxVideoWebm from "../../assets/videos/parallax_servicio.webm";
import parallaxVideoMp4 from "../../assets/videos/parallax_servicio.mp4";
import parallaxPoster from "../../assets/images/parallax_service.webp";
import { getVideoFormat } from "../../utils/browserDetection";

const ServicioCard = lazy(() => import("../../components/ServicioCard/ServicioCard"));

const CardFallback = ({ t }) => <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', margin: '10px' }}>{t('common.loading')}</div>;

export default function Servicios() {
  const { currentLanguage, t } = useLanguageTranslation(); // Get both currentLanguage and t directly from useLanguageTranslation

  // Get the appropriate video format based on browser
  const parallaxVideo = getVideoFormat(parallaxVideoWebm, parallaxVideoMp4);
  const videoType = parallaxVideo.includes('.mp4') ? 'video/mp4' : 'video/webm';

  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [maskActive, setMaskActive] = useState(false); // Nuevo estado
  const sectionRef = useRef(null);
  const gridRef = useRef(null); // Ref for the services grid
  const firstCardRef = useRef(null); // Ref for the first card wrapper
  const [animateFirstCard, setAnimateFirstCard] = useState(false);
  const [initialHintPlayed, setInitialHintPlayed] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
      setMaskActive(true); // Activa la máscara
    };
    const handleMouseLeave = () => {
      setCursor((c) => ({ ...c, visible: false }));
      setMaskActive(false); // Desactiva la máscara
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;

    const handleGridScroll = (event) => {
      const scrollableElement = event.target.closest('.card-scrollable-content');

      if (!scrollableElement) {
        return; 
      }

      // Check if the card containing this scrollable content is actually flipped
      const cardElement = scrollableElement.closest('.servicioCard, [class*="servicioCard"]');
      const isCardFlipped = cardElement && cardElement.classList.contains('flipped');
      
      if (!isCardFlipped) {
        return; // Allow normal page scroll if card is not flipped
      }

      const { scrollHeight, clientHeight, scrollTop } = scrollableElement;

      // If the element is not scrollable, allow page scroll
      if (scrollHeight <= clientHeight) {
        return;
      }

      // Determine scroll direction
      const isScrollingDown = event.deltaY > 0;
      const isScrollingUp = event.deltaY < 0;

      // Check if we're at scroll boundaries
      const atTop = scrollTop <= 0;
      // Adjusted tolerance for atBottom check
      const atBottom = scrollTop + clientHeight >= scrollHeight - 0.5; // Changed from -1 to -0.5

      // Only prevent page scroll if we can scroll within the card
      if ((isScrollingUp && !atTop) || (isScrollingDown && !atBottom)) {
        event.preventDefault();
        event.stopPropagation();
      }
      // If at boundaries and trying to scroll beyond, allow page scroll
    };

    // Touch handling for mobile devices
    let touchStartY = 0;
    let isTouchingScrollableCard = false;

    const handleTouchStart = (event) => {
      const scrollableElement = event.target.closest('.card-scrollable-content');
      
      if (scrollableElement) {
        // Check if the card containing this scrollable content is actually flipped
        const cardElement = scrollableElement.closest('.servicioCard, [class*="servicioCard"]');
        const isCardFlipped = cardElement && cardElement.classList.contains('flipped');
        
        if (isCardFlipped) {
          isTouchingScrollableCard = true;
          touchStartY = event.touches[0].clientY;
        } else {
          isTouchingScrollableCard = false;
        }
      } else {
        isTouchingScrollableCard = false;
      }
    };

    const handleTouchMove = (event) => {
      if (!isTouchingScrollableCard) {
        return; // Let normal page scroll happen
      }

      const scrollableElement = event.target.closest('.card-scrollable-content');
      
      if (!scrollableElement) {
        return;
      }

      const { scrollHeight, clientHeight, scrollTop } = scrollableElement;
      
      // If content doesn't need scrolling, allow page scroll
      if (scrollHeight <= clientHeight) {
        return;
      }

      const touchCurrentY = event.touches[0].clientY;
      const touchDelta = touchStartY - touchCurrentY;
      const isScrollingDown = touchDelta > 0;
      const isScrollingUp = touchDelta < 0;

      // Check if we're at scroll boundaries
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      // Only prevent default if we're scrolling within the scrollable area
      if ((isScrollingUp && !atTop) || (isScrollingDown && !atBottom)) {
        event.preventDefault();
        event.stopPropagation();
      }
      // If at boundaries, allow the touch event to bubble up for page scroll
    };

    if (gridElement) {
      gridElement.addEventListener('wheel', handleGridScroll, { passive: false });
      gridElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      gridElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('wheel', handleGridScroll);
        gridElement.removeEventListener('touchstart', handleTouchStart);
        gridElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []); // Empty dependency array means this effect runs once after mount and cleans up on unmount.

  // Effect for first card animation hint
  useEffect(() => {
    if (initialHintPlayed || !firstCardRef.current) {
      return; // Don't run if already played or ref not ready
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay to allow AOS card reveal animation to play first
          // AOS duration is 800ms, first card AOS delay is 100ms.
          setTimeout(() => {
            setAnimateFirstCard(true);
            setInitialHintPlayed(true); // Mark as played to prevent re-triggering
          }, 500); // Delay after card is visible to start flip hint
          
          observer.unobserve(entry.target); // Stop observing
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the card is visible
    );

    observer.observe(firstCardRef.current);

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, [initialHintPlayed]);

  const animatedTitleText = t('services.title.animated');
  const staticTitleText = t('services.title.static');

  return (
    <section
      className={styles.serviciosSection}
      id="servicios"
      ref={sectionRef}
    >
      {/* Fondo parallax con video y máscara circular */}
      <div className={styles.parallaxBackground}>
        <div
          className={styles.videoRevealMask}
          style={
            cursor.visible
              ? {
                  WebkitMaskImage: `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, white 90%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 300px at ${cursor.x}px ${cursor.y}px, white 90%, transparent 100%)`,
                  pointerEvents: "none",
                }
              : {
                  WebkitMaskImage: "none",
                  maskImage: "none",
                  opacity: 0,
                  pointerEvents: "none",
                }
          }
        >
          <video
            className={styles.parallaxVideo}
            src={parallaxVideo}
            type={videoType}
            autoPlay
            loop
            muted
            playsInline
            poster={parallaxPoster}
          />
          <img 
            src={parallaxPoster}
            alt="Background"
            className={styles.parallaxImage}
          />
        </div>
      </div>

      {/* Titulo con efectos ---------------------------------------------------------------------------*/}

      <CoolTitle
        as="h1"
        className={`${styles.titulo} ${maskActive ? styles.tituloMaskActive : ""}`}
        hoverFonts={[
          "'Geologica','Orbitron', sans-serif",
          "'Rajdhani', 'DM Sans', sans-serif",
          "'Exo', 'Arial Rounded MT Bold', sans-serif",
          "'Share Tech Mono', 'Montserrat', monospace"
        ]}
        fontTransition="0.5s"
        maskActive={maskActive}
        animateScroll={true}
      >
        {animatedTitleText}
      </CoolTitle>
      
      {/* Separador decorativo entre titulo y subtitulo */}
      <div className={styles.titleSeparator}></div>
      
      <CoolTitle
        as="h2"
        className={`${styles.staticSubtitle} ${maskActive ? styles.tituloMaskActive : ""}`}
        maskActive={maskActive}
        style={{ fontFamily: "'Geologica', sans-serif" }} // Apply Geologica font directly
                                                          // No hoverFonts, no animation prop (defaults to 'none'), no animateScroll
      >
        {staticTitleText}
      </CoolTitle>
      <p className={styles.cardInstructionText}>
        {t('services.instruction')}
      </p>

      {/* Cards y sus Modals ----------------------------------------------------------------------------*/}

      <div className={styles.serviciosGrid} ref={gridRef}>

 {/* ----------- BIG CARD (3x2) -------------- */}
        <div className={styles.bigCard} data-aos="fade-up" data-aos-delay="0">
          <div className={styles.bigCardContent}>
            <div className={styles.bigCardImageWrapper}>
              <img src={imgCmsOverview} alt="Visión General del CMS" className={styles.bigCardImage} />
            </div>
            <div className={styles.bigCardText}>
              <div className={styles.bigCardTitle}>¿Tenés un Restaurante o Negocio? <br /><span className={styles.bigCardTitleAccent}>Mirá Nuestra Solución E-commerce.</span></div>
              <div className={styles.bigCardDesc}>
                Llevá tu negocio al siguiente nivel con una tienda online a medida que incluye un sistema de gestión integral. Vendé tus productos, controlá tu stock en tiempo real, gestioná tus pedidos y cobros de forma automática y sencilla.<br />
                <span className={styles.bigCardDescAccent}>¡Todo listo para vos!</span>
              </div>
              <div className={styles.bigCardButtonRow}>
                <Button 
                  label="Conocer más" 
                  color="#55D3C4" 
                  effect="neon" 
                  size="large" 
                  onClick={() => window.open('/cms', '_blank', 'noopener,noreferrer')}
                />
              </div>
            </div>
          </div>
        </div>
        {/*  -----------------------DESARROLLO WEB CARD------------------------------------*/}

<div data-aos="fade-up" data-aos-delay="100" className={styles.cardWrapper} ref={firstCardRef}>
  <Suspense fallback={<CardFallback t={t} />}>
    <ServicioCard
      svg={<Svg route={lottieWorld} />}
      titulo={t('services.cards.webDevelopment.title')}
      descripcion={t('services.cards.webDevelopment.description')}
      playInitialAnimation={animateFirstCard} // Pass the new prop
      modalData={{
        title: t('services.cards.webDevelopment.modal.title'), // Remove the wrapping <h1> element
        description: t('services.cards.webDevelopment.modal.description'),
        image: { src: imgDesarrolloWeb, alt: "Desarrollo Web" },
        tabs: [
          {
            label: "",
            icon: <FaShare />,
            content: (
              <ul>
                <li><h3>{t('services.cards.webDevelopment.modal.content.subtitle1')}</h3></li>
                <p>{t('services.cards.webDevelopment.modal.content.text1')}</p>
                <li><h4>{t('services.cards.webDevelopment.modal.content.subtitle2')}</h4></li>
                <p>{t('services.cards.webDevelopment.modal.content.text2')}</p>
              </ul>
            ),
          }
        ],
      }}
    />
  </Suspense>
</div>


{/* -------------------------DISEÑO CARD----------------------------------*/}

<div data-aos="fade-up" data-aos-delay="600" className={styles.cardWrapper}>
  <Suspense fallback={<CardFallback t={t} />}>
    <ServicioCard
      svg={<Svg route={lottieDesign} />}
      titulo={t('services.cards.design.title')}
      descripcion={t('services.cards.design.description')}
      modalData={{
        title: t('services.cards.design.modal.title'),
        description: t('services.cards.design.modal.description'),
        image: { src: imgDiseno, alt: "Diseño Personalizado" },
        tabs: [
          {
            label: "",
            icon: <FaShare />,
            content: (
              <ul>
                <li><h3>{t('services.cards.design.modal.content.subtitle1')}</h3></li>
                <p>{t('services.cards.design.modal.content.text1')}</p>
                <li><h4>{t('services.cards.design.modal.content.subtitle2')}</h4></li>
                <p>{t('services.cards.design.modal.content.text2')}</p>
              </ul>
            ),
          }
        ],
      }}
    />
  </Suspense>
</div>

{/* ----------------------------SOPORTE CARD------------------------------------*/}
<div data-aos="fade-up" data-aos-delay="300" className={styles.cardWrapper}>
  <Suspense fallback={<CardFallback t={t} />}>
    <ServicioCard
      svg={<Svg route={lottieSupport} />}
      titulo={t('services.cards.support.title')}
      descripcion={t('services.cards.support.description')}
      modalData={{
        title: t('services.cards.support.modal.title'),
        description: t('services.cards.support.modal.description'),
        image: { src: imgMantenimiento, alt: "Soporte Técnico" },
        tabs: [
          {
            label: "",
            icon: <FaShare />,
            content: (
              <ul>
                <li><h3>{t('services.cards.support.modal.content.subtitle1')}</h3></li>
                <p>{t('services.cards.support.modal.content.text1')}</p>
                <li><h4>{t('services.cards.support.modal.content.subtitle2')}</h4></li>
                <p>{t('services.cards.support.modal.content.text2')}</p>
              </ul>
            ),
          }
        ],
      }}
    />
  </Suspense>
</div>

       
      </div>
    </section>
  );
}