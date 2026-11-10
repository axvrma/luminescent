import React from 'react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';
import { useFormReset } from '../lib/useFormReset';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  form?: string;
  glowColor?: GlowColor;
  layout?: 'vertical' | 'horizontal';
  /** Preserved appearance option; transitions respect reduced motion. */
  indicatorAnimation?: 'slide' | 'fade';
}
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      name,
      label,
      disabled,
      required,
      readOnly,
      form,
      glowColor,
      className,
      style,
      layout = 'vertical',
      indicatorAnimation = 'fade',
      ...props
    },
    ref,
  ) => {
    const groupId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const selected = value ?? internalValue;
    useFormReset(
      inputRef,
      React.useCallback(() => {
        if (value === undefined) setInternalValue(defaultValue);
      }, [value, defaultValue]),
    );
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-radio-group', className)}
        role="radiogroup"
        aria-label={props['aria-label'] ?? label}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        aria-required={required || undefined}
        style={glowStyle(glowColor, style)}
        data-layout={layout}
        data-animation={indicatorAnimation}
      >
        {options.map((option, index) => (
          <label
            key={option.value}
            className="lumi-radio"
            data-disabled={disabled || option.disabled || undefined}
          >
            <input
              type="radio"
              className="lumi-visually-hidden"
              ref={index === 0 ? inputRef : undefined}
              name={name ?? groupId}
              form={form}
              value={option.value}
              checked={selected === option.value}
              required={required}
              disabled={disabled || option.disabled}
              aria-describedby={option.description ? `${groupId}-${index}-description` : undefined}
              onClick={(event) => {
                if (readOnly) event.preventDefault();
              }}
              onKeyDown={(event) => {
                if (
                  readOnly &&
                  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)
                )
                  event.preventDefault();
              }}
              onChange={() => {
                if (readOnly || selected === option.value) return;
                if (value === undefined) setInternalValue(option.value);
                onChange?.(option.value);
              }}
            />
            <span className="lumi-radio-indicator" aria-hidden="true" />
            <span className="lumi-radio-copy">
              <span className="lumi-label">{option.label}</span>
              {option.description && (
                <span className="lumi-description" id={`${groupId}-${index}-description`}>
                  {option.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';
