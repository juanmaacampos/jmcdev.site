import React, { useRef } from "react";
import styles from "./Inmobiliaria.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button";
import { useLanguageTranslation } from "../../utils/languageUtils";
import { 
  FaExternalLinkAlt, 
  FaBuilding, 
  FaWhatsapp, 
  FaBolt, 
  FaArrowRight,
  FaLock 
} from "react-icons/fa";

import fotoHero from "../../assets/images/inmobiliaria/foto_hero.webp";
import logoAbadie from "../../assets/images/inmobiliaria/abadie.webp";
import logoPeirano from "../../assets/images/inmobiliaria/peirano.webp";

export default function Inmobiliaria() {
  const { t } = useLanguageTranslation();
  const mockupRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!mockupRef.current || window.innerWidth < 1024) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 5;
    const rotateX = -(y / (rect.height / 2)) * 5;
    mockupRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!mockupRef.current) return;
    mockupRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section className={styles.inmoSection} id="inmobiliaria">
      <div className={styles.ambientGlow} />
      <div className={styles.radialFadeTop} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <CoolTitle className={styles.title}>
            {t("inmobiliariaSection.title")}
          </CoolTitle>
          
          <p className={styles.subtitle}>
            {t("inmobiliariaSection.subtitle")}
          </p>
        </div>

        {/* Two Column Grid */}
        <div className={styles.grid}>
          {/* Left Column: Feature Highlights (all clickable links to inmo.jmcdev.site) & CTA */}
          <div className={styles.contentCol}>
            <div className={styles.featuresList}>
              <a 
                href="https://inmo.jmcdev.site" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.featureCard}
                title="Visitar inmo.jmcdev.site"
              >
                <div className={styles.featureIconWrap}>
                  <FaBuilding className={styles.featureIcon} />
                </div>
                <div className={styles.featureText}>
                  <h4>{t("inmobiliariaSection.features.brand.title")}</h4>
                  <p>{t("inmobiliariaSection.features.brand.description")}</p>
                </div>
              </a>

              <a 
                href="https://inmo.jmcdev.site" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.featureCard}
                title="Visitar inmo.jmcdev.site"
              >
                <div className={styles.featureIconWrap}>
                  <FaWhatsapp className={styles.featureIcon} />
                </div>
                <div className={styles.featureText}>
                  <h4>{t("inmobiliariaSection.features.whatsapp.title")}</h4>
                  <p>{t("inmobiliariaSection.features.whatsapp.description")}</p>
                </div>
              </a>

              <a 
                href="https://inmo.jmcdev.site" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.featureCard}
                title="Visitar inmo.jmcdev.site"
              >
                <div className={styles.featureIconWrap}>
                  <FaBolt className={styles.featureIcon} />
                </div>
                <div className={styles.featureText}>
                  <h4>{t("inmobiliariaSection.features.crm.title")}</h4>
                  <p>{t("inmobiliariaSection.features.crm.description")}</p>
                </div>
              </a>
            </div>

            {/* Clients / Social Proof */}
            <div className={styles.clientsArea}>
              <span className={styles.clientsLabel}>
                {t("inmobiliariaSection.clientsLabel")}
              </span>
              <div className={styles.clientBadges}>
                <a 
                  href="https://abadiepropiedades.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.clientCard}
                  title="Visitar Abadie Propiedades"
                >
                  <img src={logoAbadie} alt="Abadie Propiedades" className={styles.clientLogo} />
                  <span className={styles.clientName}>Abadie Propiedades</span>
                  <FaExternalLinkAlt className={styles.clientLinkIcon} />
                </a>

                <a 
                  href="https://fabianapeiranopropiedades.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.clientCard}
                  title="Visitar Fabiana Peirano Propiedades"
                >
                  <img src={logoPeirano} alt="Fabiana Peirano Propiedades" className={styles.clientLogo} />
                  <span className={styles.clientName}>Fabiana Peirano</span>
                  <FaExternalLinkAlt className={styles.clientLinkIcon} />
                </a>
              </div>
            </div>

            {/* Action Button */}
            <div className={styles.buttonGroup}>
              <Button
                label={t("inmobiliariaSection.ctaButton")}
                to="https://inmo.jmcdev.site"
                effect="neon"
                size="large"
                icon={<FaExternalLinkAlt />}
                className={styles.mainCtaBtn}
              />
            </div>
          </div>

          {/* Right Column: Interactive Browser Preview */}
          <div className={styles.previewCol}>
            <div 
              className={styles.browserMockup}
              ref={mockupRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Browser chrome header */}
              <div className={styles.browserHeader}>
                <div className={styles.browserDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotYellow}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.addressBar}>
                  <FaLock className={styles.lockIcon} />
                  <span className={styles.domainText}>inmo.jmcdev.site</span>
                </div>
                <div className={styles.liveBadge}>
                  <span className={styles.pulseDot} />
                  {t("inmobiliariaSection.previewBadge")}
                </div>
              </div>

              {/* Browser content preview */}
              <a 
                href="https://inmo.jmcdev.site" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.imageLink}
                title="Abrir inmo.jmcdev.site"
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={fotoHero} 
                    alt="Plataforma inmobiliaria en vivo - inmo.jmcdev.site" 
                    className={styles.previewImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.overlayCta}>
                      {t("inmobiliariaSection.ctaButton")} <FaArrowRight />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.radialFadeBottom} />
    </section>
  );
}
