import React from 'react';
import { cn } from '../lib/classes';
export type RevealDirection = 'top' | 'bottom' | 'left' | 'right';
export interface ScreenRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  frontContent: React.ReactNode;
  revealContent: React.ReactNode;
  revealDirection?: RevealDirection;
  revealAmount?: number;
  frontCornerRadius?: number;
}
export const ScreenReveal = React.forwardRef<HTMLDivElement, ScreenRevealProps>(
  (
    {
      className,
      isOpen,
      frontContent,
      revealContent,
      revealDirection = 'bottom',
      revealAmount = 140,
      frontCornerRadius = 48,
      style,
      ...props
    },
    ref,
  ) => {
    const amount = Number.isFinite(revealAmount) ? Math.max(0, revealAmount) : 140;
    const x = isOpen
      ? revealDirection === 'left'
        ? amount
        : revealDirection === 'right'
          ? -amount
          : 0
      : 0;
    const y = isOpen
      ? revealDirection === 'top'
        ? amount
        : revealDirection === 'bottom'
          ? -amount
          : 0
      : 0;
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-screen-reveal', className)}
        data-direction={revealDirection}
        data-open={isOpen}
        style={
          {
            '--lumi-reveal-x': `${x}px`,
            '--lumi-reveal-y': `${y}px`,
            '--lumi-reveal-radius': `${Math.max(0, frontCornerRadius)}px`,
            ...style,
          } as React.CSSProperties
        }
      >
        <div className="lumi-screen-back" hidden={!isOpen}>
          {revealContent}
        </div>
        <div className="lumi-screen-front">{frontContent}</div>
      </div>
    );
  },
);
ScreenReveal.displayName = 'ScreenReveal';
