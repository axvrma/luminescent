import React from 'react';
import { cn } from '../lib/classes';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
}
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'accent', size = 'md', dot, className, children, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cn('lumi-badge', className)}
      data-variant={variant}
      data-size={size}
    >
      {dot && <span className="lumi-badge-dot" aria-hidden="true" />}
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';
