import React from "react";
import styles from "./Testimonios.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";

const testimonios = [
  {
    nombre: "Camila C.",
    puesto: "Export Control Officer, ICHOS",
    imagenUrl: "https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/469481038_1113125820214248_8066473694455431940_n.jpg?ccb=11-4&oh=01_Q5Aa1gHRV5yMDPauYTEwhQfg315rtAzE37uYpOpBXwKxzkBL5A&oe=682F9B0F&_nc_sid=5e03e0&_nc_cat=110", // Placeholder image
    texto: "¡Excelente trabajo! Mi portfolio web quedó buenisimo y llama más la atención de los entrevistadores. El diseño es moderno y funcional.",
  },
  

];

export default function Testimonios() {
  return (
    <section className={styles.testimoniosSection} id="testimonios">
      <div className={styles.contentBox}> {/* New wrapper for title and grid */}
        <CoolTitle className={styles.titulo}>Lo que dicen nuestros clientes</CoolTitle>
        <div className={styles.grid}>
          {testimonios.map((t, i) => (
            // Removed cardContainer div from here
            <div className={styles.testimonioCard} key={i}>
              <img
                src={t.imagenUrl}
                alt={`Foto de ${t.nombre}`}
                className={styles.testimonioImagen}
              />
              <p className={styles.texto}>"{t.texto}"</p>
              <span className={styles.nombre}>{t.nombre}</span>
              <span className={styles.puesto}>{t.puesto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
