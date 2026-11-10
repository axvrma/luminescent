import React from 'react';
import { cn } from '../lib/classes';
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator = '/', className, ...props }, ref) => (
    <nav
      {...props}
      ref={ref}
      aria-label={props['aria-label'] ?? 'Breadcrumb'}
      className={cn('lumi-breadcrumbs', className)}
    >
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 && (
              <span aria-hidden="true" className="lumi-breadcrumb-separator">
                {separator}
              </span>
            )}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  ),
);
Breadcrumbs.displayName = 'Breadcrumbs';
