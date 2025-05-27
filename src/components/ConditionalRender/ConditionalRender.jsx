import React from 'react';
import { useIsMobile, useIsDesktop } from '../../hooks/useMediaQuery';

export const MobileOnly = ({ children }) => {
  const isMobile = useIsMobile();
  return isMobile ? children : null;
};

export const DesktopOnly = ({ children }) => {
  const isDesktop = useIsDesktop();
  return isDesktop ? children : null;
};

export const TabletUp = ({ children }) => {
  const isMobile = useIsMobile();
  return !isMobile ? children : null;
};

export const ConditionalRender = ({ mobile, desktop, tablet, fallback = null }) => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  
  if (isMobile && mobile) return mobile;
  if (isDesktop && desktop) return desktop;
  if (!isMobile && !isDesktop && tablet) return tablet;
  
  return fallback;
};
