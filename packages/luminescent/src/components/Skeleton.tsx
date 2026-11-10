import React from 'react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  animation?: 'shimmer' | 'pulse' | 'none';
  glowColor?: GlowColor;
}

export function Skeleton({ variant = 'text', width, height, animation = 'shimmer', glowColor = 'peach', className, style, ...props }: SkeletonProps) {
  return <span {...props} aria-hidden="true" className={cn('lumi-skeleton', className)} data-variant={variant} data-animation={animation} style={glowStyle(glowColor, { width, height, ...style })} />;
}
