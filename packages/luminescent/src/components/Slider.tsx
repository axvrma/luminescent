import React from 'react';
import { rangeBounds, snap } from '../lib/numbers';
import { useFormReset } from '../lib/useFormReset';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'onChange'
> {
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
  (
    {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      label,
      showValue = true,
      formatValue = String,
      glowColor,
      className,
      style,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    useFormReset(
      inputRef,
      React.useCallback(() => {
        if (value === undefined) setInternalValue(defaultValue);
      }, [value, defaultValue]),
    );
    const [lower, upper] = rangeBounds(min, max);
    const increment =
      step === 'any' ? 'any' : Number.isFinite(Number(step)) && Number(step) > 0 ? Number(step) : 1;
    const currentValue = snap(value ?? internalValue, lower, upper, increment);
    const percentage = upper > lower ? ((currentValue - lower) / (upper - lower)) * 100 : 0;
    return (
      <div
        className={cn('lumi-field lumi-slider-field', className)}
        style={glowStyle(glowColor, {
          '--lumi-fill': `${percentage}%`,
          ...style,
        } as React.CSSProperties)}
        data-disabled={props.disabled || undefined}
      >
        {(label || showValue) && (
          <div className="lumi-field-heading">
            {label && (
              <label className="lumi-label" htmlFor={inputId}>
                {label}
              </label>
            )}
            {showValue && (
              <output className="lumi-slider-value" htmlFor={inputId}>
                {formatValue(currentValue)}
              </output>
            )}
          </div>
        )}
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') return ref(node);
            else if (ref) ref.current = node;
          }}
          id={inputId}
          type="range"
          className="lumi-slider"
          min={lower}
          max={upper}
          step={increment}
          value={currentValue}
          aria-valuetext={formatValue(currentValue)}
          onChange={(event) => {
            const nextValue = snap(event.currentTarget.valueAsNumber, lower, upper, increment);
            if (value === undefined) setInternalValue(nextValue);
            onChange?.(nextValue);
          }}
        />
      </div>
    );
  },
);
Slider.displayName = 'Slider';
