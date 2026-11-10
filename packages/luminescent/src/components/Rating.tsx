import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
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

export function Rating({ value, defaultValue = 0, onChange, max = 5, name, label = 'Rating', disabled, readOnly, size = 'md', glowColor = 'peach', className, style, ...props }: RatingProps) {
  const generatedName = React.useId();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const count = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
  const selected = Math.min(count, Math.max(0, Math.round(value ?? internalValue)));
  const displayed = hoverValue ?? selected;
  return (
    <div
      {...props}
      className={cn('lumi-rating', className)}
      style={glowStyle(glowColor, style)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `${label}: ${selected} of ${count}` : label}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-disabled={disabled || undefined}
      onMouseLeave={(event) => { setHoverValue(null); props.onMouseLeave?.(event); }}
    >
      {Array.from({ length: count }, (_, index) => {
        const rating = index + 1;
        const star = <Star className="lumi-rating-star" aria-hidden="true" data-active={rating <= displayed} />;
        if (readOnly) return <span key={rating}>{star}</span>;
        return (
          <label key={rating} className="lumi-rating-option" onMouseEnter={() => { if (!disabled) setHoverValue(rating); }}>
            <input
              className="lumi-visually-hidden"
              type="radio"
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
}
