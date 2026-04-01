import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import styles from "./Planes.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { useLanguageTranslation } from "../../utils/languageUtils";

const ParticleBackground = lazy(() => import("../../components/ParticleBackground/ParticleBackground"));
const Card3D = lazy(() => import("../../components/PlanesCard3d/3dCard"));

// Define plan structure with keys for translation
const planDefinitions = [
  {
    id: "basic",
    destacado: false,
  },
  {
    id: "premium",
    destacado: true,
    jmcpanel: true,
  },
];

export default function Planes() {
  const { t } = useLanguageTranslation();

  const ParticleFallback = () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent' }} />;
  const Card3DFallback = () => <div style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', margin: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>{t('planesSection.loadingPlan')}</div>;

  const [iosGlobalPermissionState, setIosGlobalPermissionState] = useState('prompt');
  const [isIOSForPermission, setIsIOSForPermission] = useState(false);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const needsPermission = isIOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
    setIsIOSForPermission(needsPermission);
  }, []);

  const motionActiveForCards = iosGlobalPermissionState === 'granted' || !isIOSForPermission;

  const planes = useMemo(() => planDefinitions.map(pDef => ({
    id: pDef.id,
    nombre: t(`planesSection.planDetails.${pDef.id}.name`),
    descripcion: t(`planesSection.planDetails.${pDef.id}.description`),
    beneficios: t(`planesSection.planDetails.${pDef.id}.benefits`),
    destacado: pDef.destacado,
    idealPara: Array.isArray(t(`planesSection.planDetails.${pDef.id}.idealPara`)) ? t(`planesSection.planDetails.${pDef.id}.idealPara`) : [],
    jmcpanel: pDef.jmcpanel || false,
    jmcpanelDescription: pDef.jmcpanel ? t(`planesSection.planDetails.${pDef.id}.jmcpanelDescription`) : '',
    jmcpanelBenefits: pDef.jmcpanel ? t(`planesSection.planDetails.${pDef.id}.jmcpanelBenefits`) : [],
  })), [t]);

  return (
    <section className={styles.planesSection} id="planes">
      <div className={styles.radialFadeTop} />
      <Suspense fallback={<ParticleFallback />}>
        <ParticleBackground />
      </Suspense>
      <CoolTitle className={styles.titulo}>{t('planesSection.mainTitle')}</CoolTitle>
      
      <div className={styles.grid}>
        {planes.map((plan, i) => (
          <Suspense fallback={<Card3DFallback />} key={`plan-${plan.id || i}`}>
            <Card3D
              plan={plan}
              destacado={plan.destacado}
              motionActive={motionActiveForCards} // Pass global permission status
            />
          </Suspense>
        ))}
      </div>
    </section>
  );
}