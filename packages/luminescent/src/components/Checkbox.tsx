import React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: GlowColor;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate = false, size = 'md', glowColor = 'peach', className, style, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <label className={cn('lumi-checkbox', className)} data-size={size} data-disabled={props.disabled || undefined} style={glowStyle(glowColor, style)}>
        <input
          {...props}
          id={inputId}
          type="checkbox"
          className="lumi-visually-hidden"
          aria-describedby={[props['aria-describedby'], description ? `${inputId}-description` : undefined].filter(Boolean).join(' ') || undefined}
          ref={(node) => {
            if (node) node.indeterminate = indeterminate;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
        />
        <span className="lumi-checkbox-box" aria-hidden="true">
          {indeterminate ? <Minus size="75%" strokeWidth={3} /> : <Check size="75%" strokeWidth={3} />}
        </span>
        {(label || description) && <span className="lumi-checkbox-copy">
          {label && <span className="lumi-label">{label}</span>}
          {description && <span id={`${inputId}-description`} className="lumi-description">{description}</span>}
        </span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
