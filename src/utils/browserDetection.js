/**
 * Detects if the current browser is Safari
 * @returns {boolean} true if Safari, false otherwise
 */
export const isSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const vendor = navigator.vendor.toLowerCase();
  
  // Check for Safari (including mobile Safari on iOS)
  return (
    vendor.includes('apple') && 
    userAgent.includes('safari') && 
    !userAgent.includes('chrome') && 
    !userAgent.includes('firefox')
  ) || (
    // Additional check for iOS devices
    /ipad|iphone|ipod/.test(userAgent) && 
    userAgent.includes('safari')
  );
};

/**
 * Gets the appropriate video format based on browser compatibility
 * @param {string} webmPath - Path to WebM video
 * @param {string} mp4Path - Path to MP4 video
 * @returns {string} Appropriate video path
 */
export const getVideoFormat = (webmPath, mp4Path) => {
  return isSafari() ? mp4Path : webmPath;
};
