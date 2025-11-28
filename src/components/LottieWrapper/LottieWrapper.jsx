import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';

/**
 * A modern functional wrapper for Lottie animations using lottie-react
 */
const LottieWrapper = ({
  animationData,
  height,
  width,
  loop = true,
  autoplay = true,
  speed = 1,
  style = {}
}) => {
  const lottieRef = useRef(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{
        width: width || '100%',
        height: height || '100%',
        ...style
      }}
    />
  );
};

LottieWrapper.propTypes = {
  animationData: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  speed: PropTypes.number,
  style: PropTypes.object
};

export default LottieWrapper;
