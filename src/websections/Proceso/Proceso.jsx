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
import { useLanguageTranslation } from "../../utils/languageUtils";

export default function Proceso() { 
  const { t } = useLanguageTranslation();
  
  const pasos = [
    { 
      titulo: t("proceso.steps.step1.title"), 
      desc: t("proceso.steps.step1.description"), 
      icon: <FaComments size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step2.title"), 
      desc: t("proceso.steps.step2.description"), 
      icon: <FaFileSignature size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step3.title"), 
      desc: t("proceso.steps.step3.description"), 
      icon: <FaClipboardCheck size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step4.title"), 
      desc: t("proceso.steps.step4.description"), 
      icon: <FaLaptopCode size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step5.title"), 
      desc: t("proceso.steps.step5.description"), 
      icon: <FaRocket size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step6.title"), 
      desc: t("proceso.steps.step6.description"), 
      icon: <FaHandsHelping size={24} /> 
    },
    { 
      titulo: t("proceso.steps.step7.title"), 
      desc: t("proceso.steps.step7.description"), 
      icon: <FaTools size={24} /> 
    },
  ];

  return (
    <section className={styles.procesoSection} id="proceso">
      <CoolTitle className={styles.titulo}>{t("proceso.title")}</CoolTitle>
      <Timeline items={pasos} />
    </section>
  );
}