import React from 'react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  animation?: 'shimmer' | 'pulse' | 'none';
  glowColor?: GlowColor;
}

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    variant = 'text',
    width,
    height,
    animation = 'shimmer',
    glowColor,
    className,
    style,
    ...props
  }: SkeletonProps,
  ref,
) {
  return (
    <span
      ref={ref}
      {...props}
      aria-hidden="true"
      className={cn('lumi-skeleton', className)}
      data-variant={variant}
      data-animation={animation}
      style={glowStyle(glowColor, { width, height, ...style })}
    />
  );
});
