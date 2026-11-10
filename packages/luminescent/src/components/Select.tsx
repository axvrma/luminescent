import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: GlowColor;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, description, error, size = 'md', glowColor = 'peach', containerClassName, className, style, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    return (
      <div className={cn('lumi-field', containerClassName)} style={glowStyle(glowColor, style)}>
        {label && <label className="lumi-label" htmlFor={selectId}>{label}</label>}
        <div className="lumi-select-wrap">
          <select
            {...props}
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={[props['aria-describedby'], error || description ? `${selectId}-description` : undefined].filter(Boolean).join(' ') || undefined}
            className={cn('lumi-select', className)}
            data-size={size}
          >{children}</select>
          <ChevronDown className="lumi-select-chevron" size={16} aria-hidden="true" />
        </div>
        {(error || description) && <span id={`${selectId}-description`} className={error ? 'lumi-error' : 'lumi-description'}>{error || description}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
