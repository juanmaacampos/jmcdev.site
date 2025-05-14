import React, { useRef, useState, useEffect } from 'react';
import styles from './3dCard.module.css';
import Button from '../Button/Button'; // Adjusted path relative to current file

const Card3D = ({ plan, destacado, motionActive }) => { // Added motionActive prop
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0); // New state for depth
  const [glow, setGlow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck); 

    if (mobileCheck && motionActive) { // Check motionActive prop here
      const handleOrientation = (event) => {
        let { beta, gamma } = event; 
        beta = beta || 0; // Typically -180 to 180. 0=flat screen up, 90=vertical.
        gamma = gamma || 0; // Typically -90 to 90. 0=neutral.

        const maxRotate = 15; 
        
        // --- Rotation X (Up/Down Tilt) ---
        const neutralBetaForRotateX = 75; // Neutral phone holding angle for X rotation (e.g., 75 degrees from flat)
        // Sensitivity for X-axis rotation: degrees of phone tilt from neutralBetaForRotateX to achieve maxRotate.
        // Smaller value = more sensitive.
        const betaRotationSensitivity = 20; 
        let deviationBeta = beta - neutralBetaForRotateX;
        // Tilting phone forward (beta decreases, e.g., towards 0) -> positive rotateX (top of card away)
        // Tilting phone backward (beta increases, e.g., towards 90 from 75) -> negative rotateX (top of card towards)
        let newRotateX = -(deviationBeta / betaRotationSensitivity) * maxRotate;

        // --- Rotation Y (Left/Right Tilt) ---
        // Sensitivity for Y-axis rotation: degrees of phone tilt from neutral gamma (0) to achieve maxRotate.
        const gammaRotationSensitivity = 20; 
        let newRotateY = (gamma / gammaRotationSensitivity) * maxRotate;

        // Clamp rotations
        newRotateX = Math.max(-maxRotate, Math.min(maxRotate, newRotateX));
        newRotateY = Math.max(-maxRotate, Math.min(maxRotate, newRotateY));
        
        setRotateX(newRotateX);
        setRotateY(newRotateY);

        // --- Depth (translateZ) calculation based on beta ---
        const neutralBetaForDepth = 60; // Assumed neutral holding angle for depth effect
        const maxDepthChange = 40; 
        // Range of beta tilt (from neutralBetaForDepth) that causes full depth change.
        // e.g., if 30, then beta changing by +/-30 from neutralBetaForDepth gives +/-maxDepthChange.
        const betaRangeForDepth = 30; 

        let depthFactor = (beta - neutralBetaForDepth) / betaRangeForDepth;
        let newTranslateZ = depthFactor * maxDepthChange;
        newTranslateZ = Math.max(-maxDepthChange, Math.min(maxDepthChange, newTranslateZ));
        
        setTranslateZ(newTranslateZ);

        setGlow(true); 
      };

      const addOrientationListener = () => {
        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      };

      // Directly add listener if motionActive is true and it's a mobile device
      addOrientationListener();

      return () => {
        if (window.DeviceOrientationEvent) {
          window.removeEventListener('deviceorientation', handleOrientation, true);
        }
      };
    }
  }, [isMobile, motionActive]); // Depend on motionActive

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;

    // Define max rotation, e.g., 15 degrees
    const maxRotate = 15;
    const newRotateX = (deltaY / centerY) * -maxRotate;
    const newRotateY = (deltaX / centerX) * maxRotate;

    setRotateX(newRotateX);
    setRotateY(newRotateY);
    setGlow(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotateX(0);
    setRotateY(0);
    setGlow(false);
  };

  return (
    <div
      className={`${styles.cardContainer} ${destacado ? styles.destacado : ''}`}
      ref={cardRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: isMobile ? 'transform 0.1s ease-out' : 'transform 0.1s linear, box-shadow 0.3s ease', 
      }}
    >
      <div className={styles.cardContent}>
        <h3>{plan.nombre}</h3>
        <div className={styles.precio}>{plan.precio}</div>
        <p className={styles.descripcion}>{plan.descripcion}</p>
        <ul>
          {plan.beneficios.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
        <Button 
          label="Me interesa" 
          effect="neon" 
          size="medium" 
          scrollTarget="contacto" 
          scrollTargetQuery={{ param: 'plan', value: plan.nombre }} 
        />
      </div>
    </div>
  );
};

export default Card3D;
