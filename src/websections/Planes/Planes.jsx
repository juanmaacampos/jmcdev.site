import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import styles from "./Planes.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button"; // Import custom Button
import Lottie from "lottie-react"; // Import Lottie
import accelerometerAnimationData from "../../assets/images/accelerometer.json"; // Import Lottie JSON
// Import ADICIONALES_DATA from the updated AdicionalesCard.jsx
import { ADICIONALES_DATA } from "../../components/AdicionalesCard/AdicionalesCard";
// Import framer-motion
import { motion, AnimatePresence } from "framer-motion";
// Import useLanguageTranslation
import { useLanguageTranslation } from "../../utils/languageUtils";

// Import the new AdicionalesIconList component
const AdicionalesIconList = lazy(() => import("../../components/AdicionalesIconList/AdicionalesIconList"));

const ParticleBackground = lazy(() => import("../../components/ParticleBackground/ParticleBackground"));
const Card3D = lazy(() => import("../../components/PlanesCard3d/3dCard"));

// Define plan structure with keys for translation
const planDefinitions = [
  {
    id: "basic",
    destacado: false,
  },
  {
    id: "standard",
    destacado: false, 
  },
  {
    id: "premium",
    destacado: true,
  },
];

export default function Planes() {
  const { t } = useLanguageTranslation();

  const ParticleFallback = () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent' }} />;
  const Card3DFallback = () => <div style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', margin: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>{t('planesSection.loadingPlan')}</div>;
  const AdicionalesIconListFallback = () => <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(10,10,15,0.5)', borderRadius: '8px', margin: '15px 0', padding: '20px' }}>{t('planesSection.loadingIcons')}</div>;


  const [iosGlobalPermissionState, setIosGlobalPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [isIOSForPermission, setIsIOSForPermission] = useState(false);
  
  const firstEnabledAdicional = useMemo(() => ADICIONALES_DATA.find(ad => ad.id && !ad.disabled), []);
  const [selectedAdicionalId, setSelectedAdicionalId] = useState(firstEnabledAdicional?.id || null);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const needsPermission = isIOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
    setIsIOSForPermission(needsPermission);
  }, []);

  const requestGlobalDeviceOrientationPermission = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          setIosGlobalPermissionState(permissionState);
        })
        .catch(err => {
          console.error('Error requesting global device orientation permission:', err);
          setIosGlobalPermissionState('denied');
        });
    }
  };

  const motionActiveForCards = iosGlobalPermissionState === 'granted' || !isIOSForPermission;

  const AccelerometerIcon = () => (
    <Lottie 
      animationData={accelerometerAnimationData} 
      loop={true} 
      style={{ width: 100, height: 100, marginRight: '0px', filter: 'brightness(1.2)' }} // Added filter to change color to match #A3FFE5
    />
  );

  const planes = useMemo(() => planDefinitions.map(pDef => ({
    id: pDef.id,
    nombre: t(`planesSection.planDetails.${pDef.id}.name`),
    precio: t(`planesSection.planDetails.${pDef.id}.price`),
    descripcion: t(`planesSection.planDetails.${pDef.id}.description`),
    beneficios: t(`planesSection.planDetails.${pDef.id}.benefits`), // t() returns the array of translated strings
    destacado: pDef.destacado,
  })), [t]);

  const translatedAdicionalesForList = useMemo(() => ADICIONALES_DATA.map(ad => {
    if (ad.disabled || !ad.id) return ad; // Keep disabled/invalid items as they are
    return {
      ...ad,
      name: t(`planesSection.adicionalesDetails.${ad.id}.name`),
      // Description is not needed for the icon list itself, but full object is passed
    };
  }), [t]);

  const selectedAdicional = useMemo(() => {
    if (!selectedAdicionalId) return null;
    const adData = ADICIONALES_DATA.find(ad => ad.id === selectedAdicionalId);
    if (!adData || adData.disabled || !adData.id) return null;
    return {
      ...adData,
      name: t(`planesSection.adicionalesDetails.${adData.id}.name`),
      description: t(`planesSection.adicionalesDetails.${adData.id}.description`),
    };
  }, [selectedAdicionalId, t]);


  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <section className={styles.planesSection} id="planes">
      <div className={styles.radialFadeTop} />
      <Suspense fallback={<ParticleFallback />}>
        <ParticleBackground />
      </Suspense>
      <CoolTitle className={styles.titulo}>{t('planesSection.mainTitle')}</CoolTitle>
      
      {isIOSForPermission && (iosGlobalPermissionState === 'prompt' || iosGlobalPermissionState === 'granted') && (
        <div className={styles.permissionButtonContainer} style={{ color: '#A3FFE5' }}>
          <Button
            label={iosGlobalPermissionState === 'granted' ? t('planesSection.iosButtonGranted') : t('planesSection.iosButtonPrompt')}
            onClick={requestGlobalDeviceOrientationPermission}
            icon={iosGlobalPermissionState === 'prompt' ? <AccelerometerIcon /> : null}
            effect="neon"
            disabled={iosGlobalPermissionState === 'granted'}
            className={styles.themedNeonButton}
            style={{ 
              color: '#A3FFE5', 
              borderColor: '#A3FFE5',
              boxShadow: iosGlobalPermissionState !== 'granted' ? '0 0 10px #A3FFE5, 0 0 20px #A3FFE5, inset 0 0 10px #A3FFE5' : 'none'
            }}
          />
        </div>
      )}

      <div className={styles.grid}>
        {planes.map((plan, i) => (
          <Suspense fallback={<Card3DFallback />} key={plan.id || i}>
            <Card3D
              plan={plan}
              destacado={plan.destacado}
              motionActive={motionActiveForCards} // Pass global permission status
            />
          </Suspense>
        ))}
      </div>

      {/* New Adicionales Section Layout */}
      <div className={styles.adicionalesSectionWrapper} id="adicionales">
        <div className={styles.adicionalesMainTitleContainer}>
          <h3 className={styles.adicionalesMainTitle}>
            {t('planesSection.adicionalesSection.title')}
            <span className={styles.consultarTextMain}> {t('planesSection.adicionalesSection.consultarPrecio')}</span>
          </h3>
        </div>

        <div className={styles.adicionalesTwoColumnLayout}>
          {/* Left Pane: Icon List */}
          <div className={styles.adicionalesIconPane}>
            <Suspense fallback={<AdicionalesIconListFallback />}>
              <AdicionalesIconList
                adicionales={translatedAdicionalesForList}
                selectedAdicionalId={selectedAdicionalId}
                onAdicionalSelect={setSelectedAdicionalId}
                motionActive={motionActiveForCards} // Pass motion permission state
              />
            </Suspense>
          </div>

          {/* Right Pane: Content Display */}
          <div className={styles.adicionalesContentPane}>
            <AnimatePresence mode="wait">
              {selectedAdicional ? (
                <motion.div
                  key={selectedAdicional.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} // Ensure motion.div fills the space
                >
                  <h4 className={styles.selectedAdicionalTitle}>{selectedAdicional.name}</h4>
                  <p className={styles.selectedAdicionalDescription}>{selectedAdicional.description}</p>
                  {selectedAdicional.imageSrc ? (
                    <img 
                      src={selectedAdicional.imageSrc} 
                      alt={selectedAdicional.name} 
                      className={styles.selectedAdicionalImage} 
                    />
                  ) : (
                    <div className={styles.selectedAdicionalImagePlaceholder}>
                      {t('planesSection.adicionalVisualizacionPlaceholder')}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="no-selection"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={styles.noAdicionalSelectedText}
                >
                  {t('planesSection.adicionalSelectPrompt')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* End of New Adicionales Section Layout */}

      <div className={styles.footerNotes}>
        <p className={styles.footerNote}>{t('planesSection.footerNote1')}</p>
        <p 
          className={styles.footerNote} 
          dangerouslySetInnerHTML={{ __html: t('planesSection.footerNote2Html') }} 
        />
      </div>
    </section>
  );
}