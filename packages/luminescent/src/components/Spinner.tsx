import React from 'react';
import { cn } from '../lib/classes';
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ label = 'Loading', size = 'md', className, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      role="status"
      className={cn('lumi-status-spinner', className)}
      data-size={size}
    >
      <span className="lumi-spinner" aria-hidden="true" />
      <span className="lumi-visually-hidden">{label}</span>
    </span>
  ),
);
Spinner.displayName = 'Spinner';
