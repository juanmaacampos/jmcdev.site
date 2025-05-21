import React, { useEffect, useRef, useState } from "react";
import styles from "./Portafolio.module.css";
import VideoGallery from "../../components/VideoGallery";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import MachineTypeTitle from "../../components/MachineTypeTitle/MachineTypeTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortafolioBackground from "./PortafolioBackground";
import ReactGA from 'react-ga'; // Import ReactGA

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Importamos el video directamente para que funcione con GitHub Pages
import saboresVideo from "../../assets/videos/sabores_project.webm";
import portfolioVideo from "../../assets/videos/portfolio_project.webm";
import jmcdevwebVideo from "../../assets/videos/jmcdevweb_project.webm";
import saboresThumb from "../../assets/projects_img/sabores_project.webp";
import portfolioThumb from "../../assets/projects_img/portfolio_project.webp";
import jmcdevwebThumb from "../../assets/projects_img/jmcdevweb_project.webp";
import bianSushiThumb from "../../assets/projects_img/bian_project.webp";

// Datos de ejemplo de proyectos - ahora todos los videos usan el mismo archivo importado
const projects = [
  {
    id: 1,
    name: "Web Portafolio Estandar",
    type: "video",
    media: portfolioVideo, // Usamos la referencia importada
    thumbnail: portfolioThumb,
    url: "https://juanmaacampos.github.io/juanmacampos-portfolio/",
    description: "Portafolio digital personal para mostrar tus habilidades y proyectos facilmente.",
  },

  {
    id: 2,
    name: "Web Restaurante Premium",
    type: "video",
    media: saboresVideo, // Usamos la referencia importada
    thumbnail: saboresThumb,
    url: "https://juanmaacampos.github.io/project_rest/",
    description: "Sitio web para restaurante premium con diseño elegante Y llamativo.",
  },
        {
    id: 3,
    name: "Web demo Bian Sushi",
    type: "video",
    thumbnail: bianSushiThumb,
    url: "https://jmcdev.site/bian_demo",
    description: "Demostración de mejora de web mobile para Bian Sushi Campana (NO ES EL RESULTADO FINAL).",
  },
    {
    id: 4,
    name: "Web de marca premium",
    type: "video", // Usamos la referencia importada
    media: jmcdevwebVideo, // Usamos la referencia importada
    thumbnail: jmcdevwebThumb,
    url: "https://jmcdev.site/",
    description: "Pagina web para nuestra marca, enfocada en branding y experiencia visual impactante.",
  },

];

// Function to track project clicks in Google Analytics using react-ga
const trackProjectClick = (projectName) => {
  ReactGA.event({
    category: 'Portafolio Project', // Category of the event
    action: 'Click',               // Action that took place
    label: projectName             // Specific label for the event (e.g., project name)
  });
  console.log(`ReactGA Event: Clicked on ${projectName}`); // For debugging
};

const Portafolio = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const galleryRef = useRef(null);

  // Animation for content
  useEffect(() => {
    // Set initial visibility to ensure elements are shown even before animations
    if (titleRef.current && galleryRef.current) {
      gsap.set([titleRef.current, galleryRef.current], { opacity: 1, y: 0 });
    }
    
    if (sectionRef.current) {
      // Simplified animation that won't hide elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      tl.from(titleRef.current, {
        y: 30,
        opacity: 0.7,
        duration: 0.8,
        ease: "power3.out"
      }).from(galleryRef.current, {
        y: 30, 
        opacity: 0.7,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  console.log("Rendering Portafolio section"); // Debug log
  
  return (
    <section 
      id="portafolio" 
      className={styles.portafolioSection}
      ref={sectionRef}
    >
      <div className={styles.topGradient}></div>
      <PortafolioBackground sectionRef={sectionRef} />
      <div className={styles.container}>
        {/* Ensure title is visible with explicit styles */}
        <div 
          className={`${styles.titleContainer} ${styles.visibleContent}`} 
          ref={titleRef}
          style={{ opacity: 1 }}
        >
          <CoolTitle className={styles.coolTitlePart}>Nuestros <MachineTypeTitle 
            words={["Proyectos", "Trabajos", "Diseños", "Desarrollos"]} 
            typingSpeed={80}
            deletingSpeed={50}
            pause={2000}
            className={styles.machineTypePart}
            fonts={["'Geologica', sans-serif"]}
          /></CoolTitle>
        </div>
        
        {/* Ensure gallery is visible with explicit styles */}
        <div 
          ref={galleryRef} 
          className={`${styles.galleryWrapper} ${styles.visibleContent}`}
          style={{ opacity: 1 }}
        >
          <VideoGallery projects={projects} onProjectClick={trackProjectClick} />
        </div>
      </div>
      <div className={styles.bottomGradient}></div>
    </section>
  );
};

export default Portafolio;
