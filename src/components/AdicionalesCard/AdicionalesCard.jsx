import fotosImg from '../../assets/images/adicionales_img/fotos.jpeg';
import feedImg from '../../assets/images/adicionales_img/feed.png';
import soporteImg from '../../assets/images/adicionales_img/soporte.jpg';
import idiomasImg from '../../assets/images/adicionales_img/idiomas.webp';
import analiticasImg from '../../assets/images/adicionales_img/analiticas.jpg';
import galeriaImg from '../../assets/images/adicionales_img/galeria.png';
import mapsImg from '../../assets/images/adicionales_img/maps.webp';
import modosImg from '../../assets/images/adicionales_img/modos.png';

export const ADICIONALES_DATA = [
  {
    disabled: true
  },
  {
    disabled: true
  },
  {
    disabled: true
  },
  {
    disabled: true
  },
  {
    id: "fotos",
    name: "Fotografías profesionales", // Shorter name for list
    description: "*Precio a definir con el cliente* | Renueva las fotos de tu local de una manera moderna. Ofrecemos fotos en full HD tomadas con cámara réflex, totalmente adaptables a tu página web y redes sociales con un impacto visual inmediato.",
    imageSrc: fotosImg, // Using imported image
    icon: "FaCamera" // Replaced emoji
  },
  {
    id: "feed",
    name: "Feed de Instagram",
    description: "Integrá tu cuenta de Instagram para que tus publicaciones más recientes se vean directamente en tu sitio web, actualizándose automáticamente.",
    imageSrc: feedImg, // Using imported image
    icon: "FaInstagram" // Replaced emoji
  },
  {
    id: "soporte",
    name: "Soporte Mensual", // Shorter name
    description: "*Pago mensual: $50.000* | ¡Soporte activo para vos! Actualización de contenido, corrección de errores, nuevas funcionalidades básicas y optimizaciones específicas de la página.",
    imageSrc: soporteImg, // Using imported image
    icon: "FaTools" // Replaced emoji
  },
  {
    id: "idiomas",
    name: "Multi-idioma Automático", // Shorter name
    description: "El sitio detecta el idioma del navegador del visitante (por ejemplo, español o inglés) y muestra automáticamente el contenido en ese idioma si está disponible. ¡Esto permite que turistas extranjeros vean y entiendan la página web!",
    imageSrc: idiomasImg, // Using imported image
    icon: "FaGlobeAmericas" // Replaced emoji
  },
  {
    id: "analiticas",
    name: "Google Analytics",
    description: "Conectá tu sitio con Google Analytics para obtener estadísticas detalladas sobre cuántas personas te visitan, desde dónde y qué secciones ven más.",
    imageSrc: analiticasImg, // Using imported image
    icon: "FaChartBar" // Replaced emoji
  },
  {
    id: "galeria",
    name: "Galería Interactiva",
    description: "Creá una sección para mostrar tus fotos o productos con efectos visuales al pasar el mouse, permitiendo una navegación moderna y atractiva.",
    imageSrc: galeriaImg, // Using imported image
    icon: "FaImages" // Replaced emoji
  },
  {
    id: "maps",
    name: "Integración Google Maps", // Shorter name
    description: "Mostrá tu ubicación en un mapa interactivo integrado, ideal para negocios físicos o lugares con atención al público.",
    imageSrc: mapsImg, // Using imported image
    icon: "FaMapMarkedAlt" // Replaced emoji
  },
  {
    id: "modos",
    name: "Modo Oscuro/Claro",
    description: "Permití a tus visitantes elegir entre un tema claro o uno oscuro para una mejor experiencia visual, con un simple botón en pantalla.",
    imageSrc: modosImg, // Using imported image
    icon: "FaAdjust" // Replaced emoji
  },
];

// Ejemplo de renderizado de cards (ajusta según tu implementación real)
{ADICIONALES_DATA.map((item, idx) => (
  <div
    key={idx}
    style={item.disabled ? { visibility: "hidden" } : {}}
    onClick={e => {
      if (item.disabled) {
        e.stopPropagation();
        return;
      }
      // tu lógica aquí para elementos activos
    }}
    // ...otros props...
  >
    {/* Renderiza el contenido de la card aquí */}
    {/* ...existing code... */}
  </div>
))}