import React from 'react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';
import { useFormReset } from '../lib/useFormReset';

export interface ToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  required?: boolean;
  requiredMessage?: string;
  glowColor?: GlowColor;
  label?: React.ReactNode;
}
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onChange,
      size = 'md',
      disabled,
      readOnly,
      required,
      requiredMessage = 'This setting is required.',
      name,
      value = 'on',
      form,
      label,
      glowColor,
      style,
      id,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const buttonId = id ?? generatedId;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = checked ?? internalChecked;
    const [invalid, setInvalid] = React.useState(false);
    const showError = invalid && !isChecked && !disabled && !readOnly;
    useFormReset(
      inputRef,
      React.useCallback(() => {
        if (checked === undefined) setInternalChecked(defaultChecked);
        setInvalid(false);
      }, [checked, defaultChecked]),
    );
    return (
      <span className="lumi-toggle-field" style={glowStyle(glowColor, style)}>
        <button
          {...props}
          ref={ref}
          id={buttonId}
          form={form}
          type={type}
          role="switch"
          aria-checked={isChecked}
          aria-readonly={readOnly || undefined}
          aria-required={required || undefined}
          aria-invalid={showError || props['aria-invalid']}
          aria-describedby={
            [props['aria-describedby'], showError ? `${buttonId}-error` : undefined]
              .filter(Boolean)
              .join(' ') || undefined
          }
          disabled={disabled}
          className={cn('lumi-toggle lumi-glow', className)}
          data-size={size}
          onClick={(event) => {
            onClick?.(event);
            if (event.defaultPrevented || disabled || readOnly) return;
            if (checked === undefined) setInternalChecked(!isChecked);
            onChange?.(!isChecked);
          }}
        >
          <span className="lumi-toggle-thumb" aria-hidden="true" />
        </button>
        {label && (
          <label className="lumi-label" htmlFor={buttonId}>
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          type="checkbox"
          className="lumi-visually-hidden"
          aria-hidden="true"
          tabIndex={-1}
          name={name}
          value={String(value)}
          form={form}
          checked={isChecked}
          disabled={disabled}
          required={required && !readOnly}
          onChange={() => {
            /* This native proxy is controlled by the visible switch. */
          }}
          onInvalid={(event) => {
            event.preventDefault();
            setInvalid(true);
            document.getElementById(buttonId)?.focus();
          }}
        />
        {showError && (
          <span id={`${buttonId}-error`} className="lumi-error lumi-toggle-error" role="alert">
            {requiredMessage}
          </span>
        )}
      </span>
    );
  },
);
Toggle.displayName = 'Toggle';
