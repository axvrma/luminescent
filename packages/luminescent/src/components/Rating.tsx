import React from 'react';
import { Star } from 'lucide-react';
import { clamp } from '../lib/numbers';
import { useFormReset } from '../lib/useFormReset';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface RatingProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  name?: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: GlowColor;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    name,
    label = 'Rating',
    disabled,
    readOnly,
    size = 'md',
    glowColor,
    className,
    style,
    ...props
  }: RatingProps,
  ref,
) {
  const generatedName = React.useId();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const count = Number.isFinite(max) ? Math.min(100, Math.max(1, Math.floor(max))) : 5;
  const selected = Math.round(clamp(value ?? internalValue, 0, count));
  const displayed = disabled || readOnly ? selected : (hoverValue ?? selected);
  const inputRef = React.useRef<HTMLInputElement>(null);
  useFormReset(
    inputRef,
    React.useCallback(() => {
      if (value === undefined) setInternalValue(defaultValue);
    }, [value, defaultValue]),
  );
  return (
    <div
      ref={ref}
      {...props}
      className={cn('lumi-rating', className)}
      style={glowStyle(glowColor, style)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `${label}: ${selected} of ${count}` : label}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-disabled={disabled || undefined}
      onMouseLeave={(event) => {
        setHoverValue(null);
        props.onMouseLeave?.(event);
      }}
    >
      {Array.from({ length: count }, (_, index) => {
        const rating = index + 1;
        const star = (
          <Star className="lumi-rating-star" aria-hidden="true" data-active={rating <= displayed} />
        );
        if (readOnly) return <span key={rating}>{star}</span>;
        return (
          <label
            key={rating}
            className="lumi-rating-option"
            onMouseEnter={() => {
              if (!disabled) setHoverValue(rating);
            }}
          >
            <input
              className="lumi-visually-hidden"
              type="radio"
              ref={index === 0 ? inputRef : undefined}
              name={name ?? generatedName}
              value={rating}
              checked={selected === rating}
              disabled={disabled}
              aria-label={`${rating} ${rating === 1 ? 'star' : 'stars'}`}
              onChange={() => {
                if (value === undefined) setInternalValue(rating);
                onChange?.(rating);
              }}
            />
            {star}
          </label>
        );
      })}
    </div>
  );
});
