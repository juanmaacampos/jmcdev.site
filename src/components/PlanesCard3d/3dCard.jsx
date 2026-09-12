import React, { useRef } from 'react';
import styles from './3dCard.module.css';
import Button from '../Button/Button';
import { useLanguageTranslation } from '../../utils/languageUtils';
import { 
  FaPalette, 
  FaMobileAlt, 
  FaEnvelopeOpenText, 
  FaShareAlt, 
  FaSearch, 
  FaClock,
  FaPaintBrush,
  FaBolt,
  FaLayerGroup,
  FaChartLine,
  FaStore,
  FaDatabase,
  FaSlidersH,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaCogs
} from 'react-icons/fa';

const basicIcons = [FaPalette, FaMobileAlt, FaEnvelopeOpenText, FaShareAlt, FaSearch, FaClock];
const premiumIcons = [FaPaintBrush, FaBolt, FaLayerGroup, FaChartLine, FaClock];
const panelIcons = [FaStore, FaDatabase, FaSlidersH];

const Card3D = ({ plan, destacado }) => {
  const cardRef = useRef(null);
  const { t } = useLanguageTranslation();
  const isPremium = destacado;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 3.5;
    const rotateX = -(y / (rect.height / 2)) * 3.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const icons = isPremium ? premiumIcons : basicIcons;

  return (
    <div
      className={`${styles.cardContainer} ${isPremium ? styles.destacado : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {/* Top Badge */}
        <div className={styles.topBadgeWrapper}>
          {isPremium ? (
            <div className={styles.badgePremium}>
              <span className={styles.pulseDotPurple} />
              SISTEMA + WEB · MÁS COMPLETO
            </div>
          ) : (
            <div className={styles.badgeBasic}>
              <span className={styles.pulseDotTeal} />
              WEB A MEDIDA · SIN PLANTILLAS
            </div>
          )}
        </div>

        {/* Header Info */}
        <div className={styles.cardHeader}>
          <h3 className={isPremium ? styles.titlePremium : styles.titleBasic}>
            {plan.nombre}
          </h3>
          <p className={styles.descripcion}>{plan.descripcion}</p>
        </div>

        {/* Feature Items List Styled Like Inmobiliaria */}
        <div className={styles.featuresList}>
          {plan.beneficios.map((b, j) => {
            const IconComponent = icons[j] || FaCheckCircle;
            return (
              <div key={`benefit-${j}`} className={styles.featureItem}>
                <div className={`${styles.featureIconWrap} ${isPremium ? styles.iconWrapPremium : styles.iconWrapBasic}`}>
                  <IconComponent className={styles.featureIcon} />
                </div>
                <span className={styles.featureText}>{b}</span>
              </div>
            );
          })}
        </div>

        {/* JMCpanel Highlight Box */}
        {plan.jmcpanel && (
          <div className={styles.jmcpanelBox}>
            <div className={styles.jmcpanelHeader}>
              <div className={styles.panelTitleGroup}>
                <div className={styles.panelIconWrap}>
                  <FaCogs className={styles.panelIcon} />
                </div>
                <div>
                  <h4 className={styles.jmcpanelTitle}>JMCpanel Autoadministrable</h4>
                  <p className={styles.jmcpanelSubtitle}>{plan.jmcpanelDescription}</p>
                </div>
              </div>
            </div>

            <div className={styles.jmcpanelFeatures}>
              {plan.jmcpanelBenefits.map((b, j) => {
                const PanelIcon = panelIcons[j] || FaCheckCircle;
                return (
                  <div key={`jmcp-${j}`} className={styles.jmcpanelItem}>
                    <PanelIcon className={styles.jmcpanelItemIcon} />
                    <span>{b}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.panelLinkWrapper}>
              <a 
                href="https://inmo.jmcdev.site" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.panelDemoLink}
                title="Ver demo del panel en vivo"
              >
                <span>Ver demo del panel en vivo</span>
                <FaExternalLinkAlt className={styles.panelLinkIcon} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer Area: Ideal Para + CTA Button */}
      <div className={styles.cardFooter}>
        {Array.isArray(plan.idealPara) && plan.idealPara.length > 0 && (
          <div className={styles.idealParaSection}>
            <span className={styles.idealParaLabel}>
              {t('planesSection.idealParaLabel')}
            </span>
            <div className={styles.chips}>
              {plan.idealPara.map((tag, i) => (
                <span key={i} className={`${styles.chip} ${isPremium ? styles.chipPremium : styles.chipBasic}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.buttonWrapper}>
          <Button 
            label={
              <span className={styles.buttonLabelWithIcon}>
                {t('common.meInteresa')}
                <FaArrowRight className={styles.buttonArrow} />
              </span>
            }
            effect="neon" 
            size="medium" 
            scrollTarget="contacto" 
            scrollTargetQuery={{ param: 'plan', value: plan.nombre }} 
            className={`${styles.ctaButton} ${isPremium ? styles.ctaPremium : styles.ctaBasic}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card3D;
