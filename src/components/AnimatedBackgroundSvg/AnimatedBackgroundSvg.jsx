import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedBackgroundSvg.module.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackgroundSvg = ({ svgPaths = [], startTriggerId, endTriggerId, contentIsVisible }) => {
  const svgRefs = useRef([]);
  svgRefs.current = svgPaths.map((_, i) => svgRefs.current[i] ?? React.createRef());

  useEffect(() => {
    if (!contentIsVisible || svgPaths.length === 0 || svgRefs.current.some(ref => !ref.current)) {
      return;
    }

    const startElement = document.getElementById(startTriggerId);
    const endElement = document.getElementById(endTriggerId);

    if (!startElement || !endElement) {
      console.warn('AnimatedBackgroundSvg: Start or end trigger element not found.');
      return;
    }

    const timelines = svgPaths.map((_, index) => {
      const currentSvgRef = svgRefs.current[index].current;
      if (!currentSvgRef) return null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: startElement,
          endTrigger: endElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 + (index * 0.2), // Slightly different scrub for variation
          // markers: index === 0, // For debugging the first SVG
        },
      });

      // Define animation sequences - these need to be distinct for each SVG
      // SVG 1 (Original path, slightly adjusted)
      if (index === 0) {
        tl.fromTo(
          currentSvgRef,
          { opacity: 0, scale: 0.3, x: '5vw', y: '70vh', rotation: -180 },
          { opacity: 0.4, scale: 1, x: '40vw', y: '50vh', rotation: 360, ease: 'power1.inOut', duration: 0.3 }
        )
        .to(currentSvgRef, { x: '70vw', y: '20vh', rotation: '+=720', scale: 1.2, ease: 'sine.inOut', duration: 0.4 })
        .to(currentSvgRef, { x: '10vw', y: '75vh', rotation: '+=720', scale: 0.8, ease: 'sine.inOut', duration: 0.3 })
        .to(currentSvgRef, { opacity: 0, scale: 0.3, x: '40vw', y: '10vh', rotation: '+=360', ease: 'power1.in', duration: 0.2 });
      }
      // SVG 2
      else if (index === 1) {
        tl.fromTo(
          currentSvgRef,
          { opacity: 0, scale: 0.25, x: '50vw', y: '80vh', rotation: 90 },
          { opacity: 0.35, scale: 0.9, x: '20vw', y: '40vh', rotation: -270, ease: 'power1.inOut', duration: 0.35 }
        )
        .to(currentSvgRef, { x: '55vw', y: '15vh', rotation: '+=540', scale: 1.1, ease: 'sine.inOut', duration: 0.35 })
        .to(currentSvgRef, { x: '80vw', y: '60vh', rotation: '+=540', scale: 0.7, ease: 'sine.inOut', duration: 0.3 })
        .to(currentSvgRef, { opacity: 0, scale: 0.25, x: '60vw', y: '5vh', rotation: '+=270', ease: 'power1.in', duration: 0.2 });
      }
      // SVG 3
      else if (index === 2) {
        tl.fromTo(
          currentSvgRef,
          { opacity: 0, scale: 0.35, x: '85vw', y: '65vh', rotation: 0 },
          { opacity: 0.45, scale: 1.1, x: '65vw', y: '30vh', rotation: 450, ease: 'power1.inOut', duration: 0.3 }
        )
        .to(currentSvgRef, { x: '25vw', y: '70vh', rotation: '+=630', scale: 1.3, ease: 'sine.inOut', duration: 0.4 })
        .to(currentSvgRef, { x: '90vw', y: '45vh', rotation: '+=630', scale: 0.9, ease: 'sine.inOut', duration: 0.3 })
        .to(currentSvgRef, { opacity: 0, scale: 0.35, x: '75vw', y: '10vh', rotation: '+=450', ease: 'power1.in', duration: 0.2 });
      }
      return tl;
    }).filter(Boolean); // Filter out null timelines if any ref was not ready

    return () => {
      timelines.forEach(tl => tl.kill());
      // It's good practice to also kill ScrollTriggers associated with these elements
      // though GSAP's timeline kill usually handles associated ScrollTriggers.
      // To be absolutely sure, especially if triggers are shared or managed complexly:
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === startElement || st.trigger === endElement) {
          // Check if this ST instance was created by one of our timelines
          // This check might need to be more specific if other animations use the same triggers
          const isOurTrigger = timelines.some(tl => tl.scrollTrigger === st);
          if (isOurTrigger) {
            st.kill();
          }
        }
      });
    };
  }, [contentIsVisible, svgPaths, startTriggerId, endTriggerId]); // svgPaths in dependency array

  if (svgPaths.length === 0) {
    return null; 
  }

  return (
    <>
      {svgPaths.map((svgPath, index) => (
        <div key={index} className={styles.container} ref={svgRefs.current[index]} style={{ zIndex: -1 }}> {/* Ensure all SVGs are in the background */}
          <img src={svgPath} alt={`Animated Background Logo ${index + 1}`} className={styles.svgImage} />
        </div>
      ))}
    </>
  );
};

export default AnimatedBackgroundSvg;
