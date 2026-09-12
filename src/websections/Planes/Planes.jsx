import React, { useMemo } from "react";
import styles from "./Planes.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { useLanguageTranslation } from "../../utils/languageUtils";
import Card3D from "../../components/PlanesCard3d/3dCard";

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
      <div className={styles.ambientGlow} />
      <div className={styles.radialFadeTop} />
      <div className={styles.radialFadeBottom} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <CoolTitle className={styles.titulo}>
            {t('planesSection.mainTitle')}
          </CoolTitle>
          <p className={styles.subtitulo}>
            Sitios web únicos construidos a medida, con diseño de alto impacto y arquitectura moderna lista para crecer.
          </p>
        </div>
        
        <div className={styles.grid}>
          {planes.map((plan, i) => (
            <Card3D
              key={`plan-${plan.id || i}`}
              plan={plan}
              destacado={plan.destacado}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
