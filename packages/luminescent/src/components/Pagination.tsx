import React from 'react';
import { cn } from '../lib/classes';
import { clamp } from '../lib/numbers';
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
}
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    { count, page, defaultPage = 1, onPageChange, disabled, siblingCount = 1, className, ...props },
    ref,
  ) => {
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const pages = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
    const current = Math.floor(clamp(page ?? internalPage, 1, Math.max(1, pages)));
    const siblings = Math.floor(clamp(siblingCount, 0, 5));
    const visible = [
      ...new Set([
        1,
        pages,
        ...Array.from({ length: siblings * 2 + 1 }, (_, index) => current - siblings + index),
      ]),
    ]
      .filter((value) => value > 0 && value <= pages)
      .sort((a, b) => a - b);
    function change(next: number) {
      if (disabled || next === current) return;
      if (page === undefined) setInternalPage(next);
      onPageChange?.(next);
    }
    if (!pages) return null;
    return (
      <nav
        {...props}
        ref={ref}
        aria-label={props['aria-label'] ?? 'Pagination'}
        className={cn('lumi-pagination', className)}
      >
        <button
          type="button"
          disabled={disabled || current <= 1}
          onClick={() => change(current - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>
        {visible.map((value, index) => (
          <React.Fragment key={value}>
            {index > 0 && value - visible[index - 1] > 1 && (
              <span className="lumi-pagination-gap" aria-hidden="true">
                …
              </span>
            )}
            <button
              type="button"
              disabled={disabled}
              aria-label={`Page ${value}`}
              aria-current={value === current ? 'page' : undefined}
              onClick={() => change(value)}
            >
              {value}
            </button>
          </React.Fragment>
        ))}
        <button
          type="button"
          disabled={disabled || current >= pages}
          onClick={() => change(current + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';
