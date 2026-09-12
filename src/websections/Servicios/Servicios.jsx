import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Servicios.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Svg from "../../components/Svg/Svg";
import { useLanguageTranslation } from "../../utils/languageUtils"; 

// --- IMPORTA LOS ASSETS ---
import lottieWorld from "../../assets/images/modals_assets/world.json";
import lottieDesign from "../../assets/images/modals_assets/design.json";
import lottieSupport from "../../assets/images/modals_assets/support.json";

import parallaxVideoWebm from "../../assets/videos/parallax_servicio.webm";
import parallaxVideoMp4 from "../../assets/videos/parallax_servicio.mp4";
import parallaxPoster from "../../assets/images/parallax_service.webp";
import { getVideoFormat } from "../../utils/browserDetection";

const ServicioCard = lazy(() => import("../../components/ServicioCard/ServicioCard"));

const CardFallback = ({ t }) => (
  <div style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", background: "rgba(255,255,255,0.05)", borderRadius: "10px", margin: "10px" }}>
    {t("common.loading")}
  </div>
);

export default function Servicios() {
  const { t } = useLanguageTranslation();

  const parallaxVideo = getVideoFormat(parallaxVideoWebm, parallaxVideoMp4);
  const videoType = parallaxVideo.includes(".mp4") ? "video/mp4" : "video/webm";

  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [maskActive, setMaskActive] = useState(false);
  const [canRenderVideo, setCanRenderVideo] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    // Only enable video background on desktop (> 900px) where cursor hover effect is active
    const isDesktop = window.innerWidth > 900;
    if (!isDesktop) return;

    // Pre-load video only when approaching the section on desktop
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanRenderVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
      setMaskActive(true);
      setCanRenderVideo(true);
    };
    const handleMouseLeave = () => {
      setCursor((c) => ({ ...c, visible: false }));
      setMaskActive(false);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      observer.disconnect();
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const animatedTitleText = t("services.title.animated");
  const staticTitleText = t("services.title.static");

  return (
    <section
      className={styles.serviciosSection}
      id="servicios"
      ref={sectionRef}
    >
      {/* Fondo parallax con video y mascara circular */}
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
          {canRenderVideo && (
            <video
              className={styles.parallaxVideo}
              src={parallaxVideo}
              type={videoType}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={parallaxPoster}
            />
          )}
          <img 
            src={parallaxPoster}
            alt="Background"
            className={styles.parallaxImage}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Titulo con efectos */}
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
        style={{ fontFamily: "'Geologica', sans-serif" }}
      >
        {staticTitleText}
      </CoolTitle>

      {/* Cards de Servicios */}
      <div className={styles.serviciosGrid}>
        {/* DESARROLLO WEB CARD */}
        <div data-aos="fade-up" data-aos-delay="100" className={styles.cardWrapper}>
          <Suspense fallback={<CardFallback t={t} />}>
            <ServicioCard
              svg={<Svg route={lottieWorld} />}
              titulo={t("services.cards.webDevelopment.title")}
              descripcion={t("services.cards.webDevelopment.description")}
            />
          </Suspense>
        </div>

        {/* DISENO CARD */}
        <div data-aos="fade-up" data-aos-delay="300" className={styles.cardWrapper}>
          <Suspense fallback={<CardFallback t={t} />}>
            <ServicioCard
              svg={<Svg route={lottieDesign} />}
              titulo={t("services.cards.design.title")}
              descripcion={t("services.cards.design.description")}
            />
          </Suspense>
        </div>

        {/* SOPORTE CARD */}
        <div data-aos="fade-up" data-aos-delay="500" className={styles.cardWrapper}>
          <Suspense fallback={<CardFallback t={t} />}>
            <ServicioCard
              svg={<Svg route={lottieSupport} />}
              titulo={t("services.cards.support.title")}
              descripcion={t("services.cards.support.description")}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
