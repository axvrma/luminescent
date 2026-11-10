import React from 'react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  glowColor?: GlowColor;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, defaultValue = 50, min = 0, max = 100, onChange, label, showValue = true, formatValue = String, glowColor = 'peach', className, style, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = Math.min(max, Math.max(min, value ?? internalValue));
    const percentage = max > min ? ((currentValue - min) / (max - min)) * 100 : 0;
    return (
      <div className={cn('lumi-field lumi-slider-field', className)} style={glowStyle(glowColor, { '--lumi-fill': `${percentage}%`, ...style } as React.CSSProperties)} data-disabled={props.disabled || undefined}>
        {(label || showValue) && <div className="lumi-field-heading">
          {label && <label className="lumi-label" htmlFor={inputId}>{label}</label>}
          {showValue && <output className="lumi-slider-value" htmlFor={inputId}>{formatValue(currentValue)}</output>}
        </div>}
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="range"
          className="lumi-slider"
          min={min}
          max={max}
          value={currentValue}
          aria-valuetext={formatValue(currentValue)}
          onChange={(event) => {
            const nextValue = event.currentTarget.valueAsNumber;
            if (value === undefined) setInternalValue(nextValue);
            onChange?.(nextValue);
          }}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';
