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
import abcVideo from "../../assets/videos/ABC_project.webm";
import groove_project from "../../assets/videos/groove_project.webm"
import threedDemoVideo from "../../assets/videos/threedDemoVideo.webm";
import abadie_video from "../../assets/videos/abadie_video.webm";

import grooveThumb from "../../assets/projects_img/groove_project.webp";
import threeDThumb from "../../assets/projects_img/threeDThumb.webp";
import bianSushiThumb from "../../assets/projects_img/bian_project.webp";
import abcThumb from "../../assets/projects_img/ABC_project.webp";
import abadieThumb from "../../assets/projects_img/abadie_thumb.webp";
// Base data for projects (non-translatable parts)
const projectsData = [

    {
    id: 8,
    key: "grooveCafe", // Key for translations
    type: "video",
    media: groove_project,
    thumbnail: grooveThumb,
    url: "https://groovecafe.com.ar/",
  },  

    {
    id: 7,
    key: "abadie_web", // Key for translations
    type: "video",
    media: abadie_video,
    thumbnail: abadieThumb,
    url: "https://abadiepropiedades.com.ar",
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
    id: 3,
    key: "demoBianSushi", // Key for translations
    type: "video",
    thumbnail: bianSushiThumb,
    url: "https://jmcdev.site/bian_demo",
  },

    {
    id: 6,
    key: "3dDemo", // Key for translations
    type: "video",
    media: threedDemoVideo,
    thumbnail: threeDThumb,
    url: "https://juanmaacampos.github.io/3d_demo/",
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
