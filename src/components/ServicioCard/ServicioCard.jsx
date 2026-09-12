import React, { useEffect } from "react";
import styles from "./ServicioCard.module.css";
import { generateSchemaMarkup } from "../../utils/seo";

export default function ServicioCard({ icon, svg, titulo, descripcion }) {
  const serviceSchema = generateSchemaMarkup("Service", {
    name: titulo,
    description: descripcion,
    provider: {
      "@type": "Organization",
      "name": "JMCdev"
    }
  });

  useEffect(() => {
    const schemaId = `schema-${titulo.toLowerCase().replace(/\s+/g, "-")}`;
    let scriptElement = document.getElementById(schemaId);
    
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = schemaId;
      scriptElement.type = "application/ld+json";
      scriptElement.textContent = serviceSchema;
      document.head.appendChild(scriptElement);
    }
    
    return () => {
      const scriptToRemove = document.getElementById(schemaId);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [titulo, descripcion, serviceSchema]);

  return (
    <article 
      className={styles.servicioCard}
      itemScope 
      itemType="https://schema.org/Service"
    >
      <div className={styles.iconSvgWrapper}>
        {svg ? svg : icon}
      </div>
      <h3 className={styles.cardTitle}>{titulo}</h3>
      <p className={styles.cardDescription}>{descripcion}</p>
    </article>
  );
}
