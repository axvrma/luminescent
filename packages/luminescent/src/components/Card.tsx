import React from 'react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: GlowColor;
  spotlight?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ glowColor = 'peach', spotlight = true, className, style, children, onPointerMove, onPointerLeave, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn('lumi-surface lumi-card', className)}
      style={glowStyle(glowColor, style)}
      onPointerMove={(event) => {
        if (spotlight) {
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--lumi-x', `${event.clientX - bounds.left}px`);
          event.currentTarget.style.setProperty('--lumi-y', `${event.clientY - bounds.top}px`);
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--lumi-x');
        event.currentTarget.style.removeProperty('--lumi-y');
        onPointerLeave?.(event);
      }}
    >
      {spotlight && <span className="lumi-card-spotlight" aria-hidden="true" />}
      <div className="lumi-card-content">{children}</div>
    </div>
  )
);
Card.displayName = 'Card';
