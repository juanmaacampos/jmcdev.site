import React, { useEffect, useRef, useState } from "react";
import styles from "./Portafolio.module.css";
import VideoGallery from "../../components/VideoGallery";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import MachineTypeTitle from "../../components/MachineTypeTitle/MachineTypeTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortafolioBackground from "./PortafolioBackground";
import ReactGA from 'react-ga'; // Import ReactGA
import { useLanguage } from "../../context/LanguageContext"; // Import useLanguage
import { useTranslation } from "../../translations"; // Import useTranslation

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Importamos el video directamente para que funcione con GitHub Pages
import saboresVideo from "../../assets/videos/sabores_project.webm";
import portfolioVideo from "../../assets/videos/portfolio_project.webm";
import jmcdevwebVideo from "../../assets/videos/jmcdevweb_project.webm";
import abcVideo from "../../assets/videos/ABC_project.webm";

import saboresThumb from "../../assets/projects_img/sabores_project.webp";
import portfolioThumb from "../../assets/projects_img/portfolio_project.webp";
import jmcdevwebThumb from "../../assets/projects_img/jmcdevweb_project.webp";
import bianSushiThumb from "../../assets/projects_img/bian_project.webp";
import abcThumb from "../../assets/projects_img/ABC_project.webp";

// Base data for projects (non-translatable parts)
const projectsData = [
  {
    id: 1,
    key: "portfolio", // Key for translations
    type: "video",
    media: portfolioVideo,
    thumbnail: portfolioThumb,
    url: "https://juanmaacampos.github.io/juanmacampos-portfolio/",
  },
  {
    id: 2,
    key: "restaurant", // Key for translations
    type: "video",
    media: saboresVideo,
    thumbnail: saboresThumb,
    url: "https://juanmaacampos.github.io/project_rest/",
  },
  {
    id: 3,
    key: "demoBianSushi", // Key for translations
    type: "video",
    thumbnail: bianSushiThumb,
    url: "https://jmcdev.site/bian_demo",
  },
  {
    id: 5,
    key: "businessDemo", // Key for translations
    type: "video",
    media: abcVideo,
    thumbnail: abcThumb,
    url: "https://juanmaacampos.github.io/ABC_project/",
  },
  {
    id: 4,
    key: "brandPremium", // Key for translations
    type: "video",
    media: jmcdevwebVideo,
    thumbnail: jmcdevwebThumb,
    url: "https://jmcdev.site/",
  },
];

// Function to track project clicks in Google Analytics using react-ga
// Updated to handle navigation as well
const trackProjectClick = (projectName, projectUrl, event) => {
  // Prevent default behavior if event is provided
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  
  ReactGA.event({
    category: 'Portafolio Project',
    action: 'Click',
    label: projectName
  });
  console.log(`ReactGA Event: Clicked on ${projectName}`);
  
  // Handle the navigation in a controlled way
  if (projectUrl) {
    window.open(projectUrl, '_blank');
  }
};

const Portafolio = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const galleryRef = useRef(null);
  const { currentLanguage } = useLanguage(); // Get current language
  const { t } = useTranslation(currentLanguage); // Get translation function

  // Construct projects with translated names and descriptions
  const projects = projectsData.map(project => ({
    ...project,
    name: t(`portafolio.projects.${project.key}.name`),
    description: t(`portafolio.projects.${project.key}.description`),
  }));

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
          <CoolTitle className={styles.coolTitlePart}>
            {t('portafolio.coolTitlePart1')} <MachineTypeTitle 
            words={t('portafolio.animatedWords').split(',').map(word => word.trim())} 
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
          <VideoGallery 
            projects={projects} 
            onProjectClick={(name, url, event) => trackProjectClick(name, url, event)} 
          />
        </div>
      </div>
      <div className={styles.bottomGradient}></div>
    </section>
  );
};

export default Portafolio;
