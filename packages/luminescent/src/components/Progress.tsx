import React from 'react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'linear' | 'circular';
  glowColor?: GlowColor;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    label = 'Loading',
    showValue = false,
    variant = 'linear',
    glowColor,
    className,
    style,
    ...props
  }: ProgressProps,
  ref,
) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const currentValue =
    value === undefined
      ? undefined
      : Math.min(safeMax, Math.max(0, Number.isFinite(value) ? value : 0));
  const percentage = currentValue === undefined ? 0 : (currentValue / safeMax) * 100;
  const indeterminate = currentValue === undefined;
  const circumference = 2 * Math.PI * 24;
  return (
    <div
      ref={ref}
      {...props}
      role="progressbar"
      aria-label={props['aria-label'] ?? label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={currentValue}
      className={cn('lumi-progress', className)}
      style={glowStyle(glowColor, style)}
      data-variant={variant}
      data-indeterminate={indeterminate}
    >
      {variant === 'linear' ? (
        <>
          <div className="lumi-field-heading">
            <span className="lumi-label">{label}</span>
            {showValue && !indeterminate && (
              <span className="lumi-slider-value">{Math.round(percentage)}%</span>
            )}
          </div>
          <div className="lumi-progress-track">
            <div
              className="lumi-progress-fill"
              style={{ width: indeterminate ? '35%' : `${percentage}%` }}
            />
          </div>
        </>
      ) : (
        <>
          <svg className="lumi-progress-ring" viewBox="0 0 64 64" aria-hidden="true">
            <circle className="lumi-progress-ring-track" cx="32" cy="32" r="24" />
            <circle
              className="lumi-progress-ring-fill"
              cx="32"
              cy="32"
              r="24"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - (indeterminate ? 0.28 : percentage / 100))}
            />
          </svg>
          {showValue && !indeterminate && (
            <span className="lumi-progress-ring-value">{Math.round(percentage)}%</span>
          )}
        </>
      )}
    </div>
  );
});
