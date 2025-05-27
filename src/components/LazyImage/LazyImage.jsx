import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  mobileSrc, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz48L3N2Zz4=',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [loaded, setLoaded] = useState(false);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const finalSrc = isMobile && mobileSrc ? mobileSrc : src;
              setImageSrc(finalSrc);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src, mobileSrc, isMobile]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${loaded ? 'loaded' : 'loading'}`}
      onLoad={handleLoad}
      style={{
        transition: 'opacity 0.3s',
        opacity: loaded ? 1 : 0.7
      }}
      {...props}
    />
  );
};

export default LazyImage;
