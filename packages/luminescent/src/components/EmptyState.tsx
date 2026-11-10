import React from 'react';
import { cn } from '../lib/classes';
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
}
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, headingLevel = 3, children, className, ...props }, ref) => {
    const Heading = headingLevel === 2 ? 'h2' : headingLevel === 4 ? 'h4' : 'h3';
    return (
      <div {...props} ref={ref} className={cn('lumi-empty-state', className)}>
        {icon && (
          <span className="lumi-empty-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <Heading className="lumi-overlay-title">{title}</Heading>
        {description && <p className="lumi-description">{description}</p>}
        {children}
        {action && <div className="lumi-empty-action">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';
