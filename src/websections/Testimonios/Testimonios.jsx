import React from "react";
import styles from "./Testimonios.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { useLanguageTranslation } from "../../utils/languageUtils";
import userPlaceholder from "../../assets/images/user_placeholder.png"; // Import the new placeholder

export default function Testimonios() {
  const { t } = useLanguageTranslation();
  
  // Get testimonials from translations
  const testimoniosData = t('testimonios.items');

  // Ensure testimoniosData is an array before mapping
  const testimoniosList = Array.isArray(testimoniosData) ? testimoniosData : [];

  return (
    <section className={styles.testimoniosSection} id="testimonios">
      <div className={styles.contentBox}>
        <CoolTitle className={styles.titulo}>{t('testimonios.title')}</CoolTitle>
        <div className={styles.grid}>
          {testimoniosList.map((testimonio, i) => (
            <div className={styles.testimonioCard} key={i}>
              <img
                src={testimonio.imagenUrl || userPlaceholder}
                alt={`Foto de ${testimonio.name}`}
                className={styles.testimonioImagen}
              />
              <p className={styles.texto}>"{testimonio.text}"</p>
              <span className={styles.nombre}>{testimonio.name}</span>
              <span className={styles.puesto}>{testimonio.position}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
