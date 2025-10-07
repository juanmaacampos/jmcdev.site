// src/main.jsx
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';

// Optimized loading placeholder
const MinimalLoader = () => (
  <div className="loading-placeholder" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171717',
    color: '#55d3c4',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div className="loading-logo" style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    }}>JMCdev</div>
    <div className="loading-spinner" style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(85, 211, 196, 0.3)',
      borderTop: '3px solid #55d3c4',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

// Inject minimal CSS for spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Lazy load App with preloading strategy
const App = lazy(() => {
  // Preload critical components while App is loading
  const preloadPromises = [];
  
  // Detect if mobile to conditionally preload
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (!isMobile) {
    // Only preload desktop components on desktop
    preloadPromises.push(
      import('./websections/Header/Header'),
      import('./components/VideoMaskEffect/VideoMaskEffect'),
      import('./components/ParticleBackground/ParticleBackground')
    );
  } else {
    // Preload mobile-specific components
    preloadPromises.push(
      import('./pages/BianDemoPage/websections/MobileNav/MobileNav')
    );
  }
  
  return Promise.all([
    import('./App'),
    ...preloadPromises
  ]).then(([appModule]) => appModule);
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Suspense fallback={<MinimalLoader />}>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

// Optimized preloading for non-critical components
const preloadNonCritical = () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      if (!isMobile) {
        // Desktop components
        import('./websections/footer/Footer');
        import('./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg');
        import('./components/VideoGallery/VideoGallery');
      }
      // Common components
      import('./components/TopButton/TopButton');
    }, { timeout: 5000 });
  } else {
    setTimeout(() => {
      if (!isMobile) {
        import('./websections/footer/Footer');
        import('./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg');
      }
    }, 3000);
  }
};

// Preload after initial load
window.addEventListener('load', () => {
  setTimeout(preloadNonCritical, 2000);
});

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
      setTimeout(() => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
      }, 0);
    }
  });
}
