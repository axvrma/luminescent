import React from 'react';
import { cn } from '../lib/classes';
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  intensity?: 'low' | 'medium' | 'high';
  glowDirection?: 'left' | 'right' | 'top' | 'bottom' | 'both';
  color?: string;
}
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'vertical',
      intensity = 'medium',
      glowDirection = 'left',
      color = 'rgb(var(--lumi-color))',
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      {...props}
      ref={ref}
      role={props.role ?? 'separator'}
      aria-orientation={orientation}
      className={cn('lumi-divider', className)}
      data-orientation={orientation}
      data-direction={glowDirection}
      data-intensity={intensity}
      style={{ '--lumi-divider-color': color, ...style } as React.CSSProperties}
    />
  ),
);
Divider.displayName = 'Divider';
