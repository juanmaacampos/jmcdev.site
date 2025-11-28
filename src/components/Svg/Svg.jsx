import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const Svg = ({ route }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Si route ya es un objeto (el JSON importado), úsalo directamente
    if (typeof route === 'object' && route !== null) {
      setAnimationData(route);
      return;
    }

    // Si es una string, asumir que es una URL y hacer fetch
    const loadAnimation = async () => {
      try {
        const response = await fetch(route);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    if (typeof route === 'string') {
      loadAnimation();
    }
  }, [route]);

  return (
    <div style={{ 
      width: '64px', 
      height: '64px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      margin: '0 auto 1rem auto' 
    }}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: '72px',
            height: '72px',
            maxWidth: '120%',
            maxHeight: '120%',
            margin: 0,
            padding: 0,
            transform: 'scale(1.1)'
          }}
        />
      )}
    </div>
  );
};

export default Svg;
