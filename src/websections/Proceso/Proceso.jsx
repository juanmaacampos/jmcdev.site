import React from "react";
import styles from "./Proceso.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { FaComments, FaFileSignature, FaLaptopCode, FaRocket, FaHandsHelping } from "react-icons/fa"; 
import Timeline from "../../components/Timeline/Timeline";

const pasos = [
  { 
    titulo: "1. Consulta", 
    desc: "Hablamos sobre tu idea y necesidades especificas.", 
    icon: <FaComments size={24} /> 
  },
  { 
    titulo: "2. Propuesta", 
    desc: "Diseñamos la idea y un boceto con la propuesta personalizada.", 
    icon: <FaFileSignature size={24} /> 
  },
  { 
    titulo: "3. Desarrollo", 
    desc: "Si te gusta la idea, empezamos con el desarrollo de la pagina y mostramos avances semanales.", 
    icon: <FaLaptopCode size={24} /> 
  },
  { 
    titulo: "4. Lanzamiento", 
    desc: "Una vez que la pagina se adapte a lo que querias, la publicamos en internet!", 
    icon: <FaRocket size={24} /> 
  },
  { 
    titulo: "5. Soporte", 
    desc: "Durante la primer semana, se va a hacer un seguimiento activo de la pagina para corregir errores tecnicos.", 
    icon: <FaHandsHelping size={24} /> 
  },
];

export default function Proceso() { 
  return (
    <section className={styles.procesoSection} id="proceso">
      <CoolTitle className={styles.titulo}>¿Cómo trabajamos?</CoolTitle>
      <Timeline items={pasos} />
    </section>
  );
}
