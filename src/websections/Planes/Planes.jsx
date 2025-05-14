import React, { lazy, Suspense, useState, useEffect } from "react";
import styles from "./Planes.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button"; // Import custom Button
import Lottie from "lottie-react"; // Import Lottie
import accelerometerAnimationData from "../../assets/images/accelerometer.json"; // Import Lottie JSON
// Import the new AdicionalesCard component
const AdicionalesCard = lazy(() => import("../../components/AdicionalesCard/AdicionalesCard"));

const ParticleBackground = lazy(() => import("../../components/ParticleBackground/ParticleBackground"));
const Card3D = lazy(() => import("../../components/PlanesCard3d/3dCard"));

const ParticleFallback = () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent' }} />;
const Card3DFallback = () => <div style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', margin: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>Cargando plan...</div>;
// Fallback for AdicionalesCard
const AdicionalesCardFallback = () => <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(22,22,29,0.8)', borderRadius: '10px', margin: '15px 0', padding: '20px', border: '1px solid rgba(163,255,229,0.2)' }}>Cargando adicionales...</div>;

const planes = [
  {
    nombre: "Web Básica / Landing Page",
    precio: "$200.000*",
    descripcion: "Presencia online esencial, portfolios simples o landing pages efectivas.",
    beneficios: [
      "Diseño moderno y responsivo",
      "Formulario de contacto",
      "Enlaces a redes sociales",
      "Entrega: 1-2 semanas aprox."
    ],
    destacado: false,
  },
  {
    nombre: "Web Estándar / Multi-página",
    precio: "$350.000*",
    descripcion: "Sitio web completo con múltiples secciones para pequeñas empresas o servicios.",
    beneficios: [
      "Hasta 5 páginas (Ej: Inicio, Servicios, Nosotros, Galería, Contacto)",
      "Diseño personalizado y adaptado a tu identidad",
      "Integración básica (Google Maps, etc.)",
      "Entrega: 2-4 semanas aprox."
    ],
    destacado: false, // Puedes cambiar esto a true si quieres destacar este plan
  },
  {
    nombre: "Web Premium / Avanzada",
    precio: "$450.000*",
    descripcion: "Soluciones web de alto impacto con funcionalidades avanzadas y diseño exclusivo.",
    beneficios: [
      "Diseño único y efectos visuales avanzados",
      "Funcionalidades personalizadas (sliders, galerías interactivas, animaciones)",
      "Estructura flexible y escalable (múltiples páginas complejas)",
      "Entrega: desde 4 semanas"
    ],
    destacado: true,
  },
];

export default function Planes() {
  const [iosGlobalPermissionState, setIosGlobalPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [isIOSForPermission, setIsIOSForPermission] = useState(false);

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

  return (
    <section className={styles.planesSection} id="planes">
      <div className={styles.radialFadeTop} />
      <Suspense fallback={<ParticleFallback />}>
        <ParticleBackground />
      </Suspense>
      <CoolTitle className={styles.titulo}>Planes web que se adaptan a vos</CoolTitle>
      
      {isIOSForPermission && (iosGlobalPermissionState === 'prompt' || iosGlobalPermissionState === 'granted') && (
        <div className={styles.permissionButtonContainer} style={{ color: '#A3FFE5' }}>
          <Button
            label={iosGlobalPermissionState === 'granted' ? "¡Move el celu!" : "¡Activar Tarjetas 3D Interactivas!"}
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
          <Suspense fallback={<Card3DFallback />} key={i}>
            <Card3D
              plan={plan}
              destacado={plan.destacado}
              motionActive={motionActiveForCards} // Pass global permission status
            />
          </Suspense>
        ))}
      </div>

      <div className={styles.adicionalesContainer}>
        <div className={styles.adicionalesTitleContainer}>
          <h3 className={styles.adicionalesTitle}>
            Personaliza tu plan con estos adicionales<span className={styles.consultarText}> (consultar)</span>
          </h3>
        </div>
        <Suspense fallback={<AdicionalesCardFallback />}>
          <AdicionalesCard />
        </Suspense>
        <div className={styles.footerNotes}>
          <p className={styles.footerNote}>Todos los planes son compatibles con celular y PC.</p>
          <p className={styles.footerNote}><strong>*Precios referenciales. El costo y tiempo final dependen del proyecto del cliente.</strong></p>
        </div>
      </div>
    </section>
  );
}