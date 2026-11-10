import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> {
  containerClassName?: string;
  glowVariant?: 'peach' | 'comet' | 'light';
  glowColor?: GlowColor;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fieldSize?: 'sm' | 'md' | 'lg';
  passwordToggle?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerClassName,
      glowVariant = 'peach',
      glowColor,
      label,
      description,
      error,
      prefix,
      suffix,
      fieldSize = 'md',
      passwordToggle = false,
      type = 'text',
      id,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [showPassword, setShowPassword] = React.useState(false);
    const canReveal = type === 'password' && passwordToggle;
    const describedBy =
      [
        props['aria-describedby'],
        description ? `${inputId}-description` : undefined,
        error ? `${inputId}-error` : undefined,
      ]
        .filter(Boolean)
        .join(' ') || undefined;
    return (
      <div className={cn('lumi-field', containerClassName)} style={glowStyle(glowColor)}>
        {label && (
          <label htmlFor={inputId} className="lumi-label">
            {label}
            {props.required && <span aria-hidden="true"> *</span>}
          </label>
        )}
        <div
          className="lumi-input-wrap lumi-glow"
          data-variant={glowVariant}
          data-disabled={props.disabled || undefined}
        >
          {prefix && <span className="lumi-input-adornment">{prefix}</span>}
          <input
            {...props}
            id={inputId}
            ref={ref}
            type={canReveal && showPassword ? 'text' : type}
            className={cn('lumi-input', className)}
            data-size={fieldSize}
            style={style}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={describedBy}
          />
          {suffix && <span className="lumi-input-adornment">{suffix}</span>}
          {canReveal && (
            <button
              type="button"
              className="lumi-icon-button lumi-password-toggle"
              disabled={props.disabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              aria-controls={inputId}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {description && (
          <span id={`${inputId}-description`} className="lumi-description">
            {description}
          </span>
        )}
        {error && (
          <span id={`${inputId}-error`} className="lumi-error">
            {error}
          </span>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
