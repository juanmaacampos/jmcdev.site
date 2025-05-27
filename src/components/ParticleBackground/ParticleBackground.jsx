import React, { useCallback, Suspense, lazy } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Lazy load particles for all devices
const Particles = lazy(() => import('react-tsparticles'));

const ParticleBackground = ({ id = "tsparticles-background", backgroundColor = '#171717' }) => {
  const isMobile = useIsMobile();
  
  // Always call useCallback hooks in the same order
  const particlesInit = useCallback(async (engine) => {
    const { loadSlim } = await import('tsparticles-slim');
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Opcional: log cuando se cargan las partículas
  }, []);

  // Memoize particle options to prevent unnecessary re-renders
  const particleOptions = useCallback(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: {
        value: backgroundColor,
      },
    },
    fpsLimit: isMobile ? 20 : 30,
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: 'repulse',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: isMobile ? 50 : 100,
          duration: 0.4,
        },
        push: {
          quantity: 1,
        },
      },
    },
    particles: {
      color: {
        value: '#55d3c4',
      },
      links: {
        color: '#ffffff',
        distance: isMobile ? 100 : 150,
        enable: true,
        opacity: isMobile ? 0.1 : 0.15,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: false,
        speed: isMobile ? 0.8 : 1.2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: isMobile ? 1000 : 800,
        },
        value: isMobile ? 20 : 30,
        limit: isMobile ? 50 : 100,
      },
      opacity: {
        value: isMobile ? 0.3 : 0.4,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: isMobile ? 2 : 3 },
      },
    },
    detectRetina: true,
  }), [isMobile, backgroundColor]);

  return (
    <Suspense fallback={<div style={{ position: 'fixed', inset: 0, backgroundColor, zIndex: -1 }} />}>
      <Particles
        id={id}
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions()}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </Suspense>
  );
};

export default ParticleBackground;
