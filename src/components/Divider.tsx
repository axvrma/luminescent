import React from 'react';
import { cn } from '../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  intensity?: 'low' | 'medium' | 'high';
  glowDirection?: 'left' | 'right' | 'top' | 'bottom' | 'both';
  color?: string;
}

export function Divider({
  orientation = 'vertical',
  intensity = 'medium',
  glowDirection = 'left',
  color = '#ffaa66', // Peach glow by default
  className,
  ...props
}: DividerProps) {
  
  // Maps intensity levels to blur, opacity, and the vertical/horizontal spread
  const intensityMap = {
    low: { blur: 16, opacity: 0.5, spread: '50%' },
    medium: { blur: 24, opacity: 0.85, spread: '70%' },
    high: { blur: 40, opacity: 1, spread: '90%' },
  };

  const currentIntensity = intensityMap[intensity];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        orientation === 'vertical' ? "w-px h-full min-h-[300px]" : "h-px w-full min-w-[300px]",
        className
      )}
      {...props}
    >
      {/* Glow containers for sharp cutoffs using overflow-hidden */}
      
      {orientation === 'vertical' && (glowDirection === 'left' || glowDirection === 'both') && (
        <div className="absolute inset-y-0 right-full w-64 overflow-hidden flex items-center pointer-events-none">
          <div 
            className="rounded-[100%] absolute"
            style={{
              backgroundColor: color,
              opacity: currentIntensity.opacity,
              filter: `blur(${currentIntensity.blur}px)`,
              height: currentIntensity.spread,
              width: '120px',
              right: '-60px', // Shift right so the center of the glow is exactly on the line
            }}
          />
        </div>
      )}

      {orientation === 'vertical' && (glowDirection === 'right' || glowDirection === 'both') && (
        <div className="absolute inset-y-0 left-full w-64 overflow-hidden flex items-center pointer-events-none">
          <div 
            className="rounded-[100%] absolute"
            style={{
              backgroundColor: color,
              opacity: currentIntensity.opacity,
              filter: `blur(${currentIntensity.blur}px)`,
              height: currentIntensity.spread,
              width: '120px',
              left: '-60px',
            }}
          />
        </div>
      )}

      {orientation === 'horizontal' && (glowDirection === 'top' || glowDirection === 'both') && (
        <div className="absolute inset-x-0 bottom-full h-64 overflow-hidden flex justify-center pointer-events-none">
          <div 
            className="rounded-[100%] absolute"
            style={{
              backgroundColor: color,
              opacity: currentIntensity.opacity,
              filter: `blur(${currentIntensity.blur}px)`,
              width: currentIntensity.spread,
              height: '120px',
              bottom: '-60px',
            }}
          />
        </div>
      )}

      {orientation === 'horizontal' && (glowDirection === 'bottom' || glowDirection === 'both') && (
        <div className="absolute inset-x-0 top-full h-64 overflow-hidden flex justify-center pointer-events-none">
          <div 
            className="rounded-[100%] absolute"
            style={{
              backgroundColor: color,
              opacity: currentIntensity.opacity,
              filter: `blur(${currentIntensity.blur}px)`,
              width: currentIntensity.spread,
              height: '120px',
              top: '-60px',
            }}
          />
        </div>
      )}

      {/* The sharp core line */}
      <div 
        className={cn(
          "absolute",
          orientation === 'vertical' 
            ? "inset-y-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" 
            : "inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        )}
      />
    </div>
  );
}
