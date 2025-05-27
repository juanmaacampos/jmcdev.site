import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie'; // Assuming this is the library you're using

/**
 * A modern functional wrapper for Lottie animations that avoids deprecated lifecycle methods
 */
const LottieWrapper = ({
  options,
  height,
  width,
  isStopped = false,
  isPaused = false,
  speed = 1,
  segments,
  direction = 1,
  ariaRole = "button",
  ariaLabel = "animation",
  isClickToPauseDisabled = false,
  title = "",
  eventListeners = [],
  style = {}
}) => {
  const lottieRef = useRef(null);
  const [lottieInstance, setLottieInstance] = useState(null);

  // Handle adding event listeners
  useEffect(() => {
    if (lottieInstance && eventListeners.length) {
      eventListeners.forEach(({ eventName, callback }) => {
        lottieInstance.addEventListener(eventName, callback);
      });

      return () => {
        eventListeners.forEach(({ eventName, callback }) => {
          lottieInstance.removeEventListener(eventName, callback);
        });
      };
    }
  }, [lottieInstance, eventListeners]);

  return (
    <Lottie
      ref={lottieRef}
      options={options}
      height={height}
      width={width}
      isStopped={isStopped}
      isPaused={isPaused}
      speed={speed}
      segments={segments}
      direction={direction}
      ariaRole={ariaRole}
      ariaLabel={ariaLabel}
      isClickToPauseDisabled={isClickToPauseDisabled}
      title={title}
      style={style}
      eventListeners={eventListeners}
    />
  );
};

LottieWrapper.propTypes = {
  eventListeners: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isStopped: PropTypes.bool,
  isPaused: PropTypes.bool,
  speed: PropTypes.number,
  segments: PropTypes.arrayOf(PropTypes.number),
  direction: PropTypes.number,
  ariaRole: PropTypes.string,
  ariaLabel: PropTypes.string,
  isClickToPauseDisabled: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object
};

export default LottieWrapper;
