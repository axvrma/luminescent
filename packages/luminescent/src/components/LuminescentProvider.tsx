import React, { createContext, useContext, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { glowColors, type GlowColor, type GlowIntensity, type LuminescentStyle } from '../lib/glow';
import { ReducedMotionContext } from '../lib/useReducedMotion';
import { cn } from '../lib/classes';

export interface LuminescentProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'dark' | 'light' | 'system';
  accent?: GlowColor;
  glow?: GlowIntensity;
  motion?: 'system' | 'reduced';
  style?: LuminescentStyle;
}

const PortalContext = createContext<HTMLElement | null>(null);
/** Keep portalled overlays in the same theme as their trigger. */
export function usePortalContainer() {
  return useContext(PortalContext);
}

export const LuminescentProvider = React.forwardRef<HTMLDivElement, LuminescentProviderProps>(
  (
    {
      theme = 'dark',
      accent = 'peach',
      glow = 'normal',
      motion = 'system',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-theme', className)}
        data-lumi-theme={theme}
        data-lumi-glow={glow}
        data-lumi-motion={motion}
        style={{ '--lumi-color': glowColors[accent], ...style } as LuminescentStyle}
      >
        <MotionConfig reducedMotion={motion === 'reduced' ? 'always' : 'user'}>
          <ReducedMotionContext.Provider value={motion === 'reduced'}>
            <PortalContext.Provider value={portalContainer}>
              {children}
              <div ref={setPortalContainer} className="lumi-portal-root" />
            </PortalContext.Provider>
          </ReducedMotionContext.Provider>
        </MotionConfig>
      </div>
    );
  },
);
LuminescentProvider.displayName = 'LuminescentProvider';
