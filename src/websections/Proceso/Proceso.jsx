import React from "react";
import styles from "./Proceso.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import { 
  FaComments, 
  FaFileSignature, 
  FaClipboardCheck, 
  FaLaptopCode, 
  FaRocket, 
  FaHandsHelping, 
  FaTools 
} from "react-icons/fa";
import Timeline from "../../components/Timeline/Timeline";

const pasos = [
  { 
    titulo: "1. Consulta", 
    desc: "Charlamos sobre tu idea, objetivos y lo que esperás de tu página web.", 
    icon: <FaComments size={24} /> 
  },
  { 
    titulo: "2. Propuesta", 
    desc: "Diseño una propuesta personalizada con un boceto adaptado a tu estilo.", 
    icon: <FaFileSignature size={24} /> 
  },
  { 
    titulo: "3. Aprobación", 
    desc: "Una vez que estás conforme con la propuesta, confirmás el desarrollo con el presupuesto y tiempos estimados.", 
    icon: <FaClipboardCheck size={24} /> 
  },
  { 
    titulo: "4. Desarrollo", 
    desc: "Empieza el desarrollo de tu página con avances semanales para que puedas seguir todo el proceso.", 
    icon: <FaLaptopCode size={24} /> 
  },
  { 
    titulo: "5. Lanzamiento", 
    desc: "Cuando la página está lista y validás que cumple con todo lo que necesitás, la publicamos en internet.", 
    icon: <FaRocket size={24} /> 
  },
  { 
    titulo: "6. Soporte", 
    desc: "Durante la primera semana hago un seguimiento activo para corregir cualquier detalle técnico.", 
    icon: <FaHandsHelping size={24} /> 
  },
  { 
    titulo: "7. Mantenimiento (opcional)", 
    desc: "Si querés, podés contratar un plan mensual para mantener tu página actualizada, segura y funcionando perfecto.", 
    icon: <FaTools size={24} /> 
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
