import React, { useState } from 'react';
import styles from './AdicionalesCard.module.css';

// Export ADICIONALES_DATA
export const ADICIONALES_DATA = [

  {
    id: "feed",
    name: "Feed de Instagram",
    description: "Integrá tu cuenta de Instagram para que tus publicaciones más recientes se vean directamente en tu sitio web, actualizándose automáticamente.",
    imageSrc: "https://v2networks.cl/wp-content/uploads/2021/09/Newsletter-03.png"
  },
{
    id: "soporte",
    name: "Soporte Mensual ($50.000)",
    description: "Soporte activo para vos! Actualización de contenido, corrección de errores, nuevas funcionalidades basicas y optimizaciones especificas de la pagina.",
    imageSrc: "https://via.placeholder.com/300x150/A3FFE5/16161D?text=Soporte"
  },
  {
    id: "modos",
    name: "Modo oscuro/claro",
    description: "Permití a tus visitantes elegir entre un tema claro o uno oscuro para una mejor experiencia visual, con un simple botón en pantalla.",
    imageSrc: "https://via.placeholder.com/300x150/A3FFE5/16161D?text=Modo"
  },
  {
    id: "efectos",
    name: "Efectos personalizados",
    description: "Agregá animaciones sutiles y elegantes que le den vida a tu marca, como transiciones al pasar el mouse, movimiento de textos o imágenes dinámicas."
  },
  {
    id: "analiticas",
    name: "Google Analytics",
    description: "Conectá tu sitio con Google Analytics para obtener estadísticas detalladas sobre cuántas personas te visitan, desde dónde y qué secciones ven más."
  },
  {
    id: "maps",
    name: "Google Maps",
    description: "Mostrá tu ubicación en un mapa interactivo integrado, ideal para negocios físicos o lugares con atención al público.",
    imageSrc: "https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png"
  },
  {
    id: "whatsapp",
    name: "Botón flotante de WhatsApp",
    description: "Incluí un ícono visible en todo momento para que los visitantes puedan escribirte directamente por WhatsApp con un solo clic.",
    imageSrc: "https://via.placeholder.com/300x150/A3FFE5/16161D?text=WhatsApp"
  },
  {
    id: "galeria",
    name: "Galería interactiva",
    description: "Creá una sección para mostrar tus fotos o productos con efectos visuales al pasar el mouse, permitiendo una navegación moderna y atractiva.",
    imageSrc: "https://via.placeholder.com/300x150/A3FFE5/16161D?text=Galeria"
  },
  {
    id: "idiomas",
    name: "Cambio automático de idioma",
    description: "El sitio detecta el idioma del navegador del visitante (por ejemplo, español o inglés) y muestra automáticamente el contenido en ese idioma si está disponible.",
    imageSrc: "https://via.placeholder.com/300x150/A3FFE5/16161D?text=Idioma"
  }
];


export default function AdicionalesCard() {
  const [selectedAdicionalId, setSelectedAdicionalId] = useState(ADICIONALES_DATA[0].id);

  const selectedAdicional = ADICIONALES_DATA.find(ad => ad.id === selectedAdicionalId);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.listPane}>
        <ul>
          {ADICIONALES_DATA.map(adicional => (
            <li
              key={adicional.id}
              className={`${styles.listItem} ${selectedAdicionalId === adicional.id ? styles.selectedItem : ''}`}
              onClick={() => setSelectedAdicionalId(adicional.id)}
            >
              {adicional.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contentPane}>
        {selectedAdicional ? (
          <>
            <h4 className={styles.contentTitle}>{selectedAdicional.name}</h4>
            <p className={styles.contentDescription}>{selectedAdicional.description}</p>
            {selectedAdicional.imageSrc ? (
              <img src={selectedAdicional.imageSrc} alt={selectedAdicional.name} className={styles.contentImage} />
            ) : (
              <div className={styles.imagePlaceholder}>Visualización del adicional</div>
            )}
          </>
        ) : (
          <p>Elige un adicional para ver más.</p>
        )}
      </div>
    </div>
  );
}