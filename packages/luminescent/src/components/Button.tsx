import React, { type ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor, type GlowIntensity } from '../lib/glow';

export interface ButtonProps extends ComponentProps<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  glowColor?: GlowColor;
  glow?: GlowIntensity;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      type = 'button',
      disabled,
      loading = false,
      loadingLabel,
      startIcon,
      endIcon,
      glowColor,
      glow,
      style,
      ...props
    },
    ref,
  ) => (
    <motion.button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn('lumi-button lumi-glow', className)}
      data-variant={variant}
      data-size={size}
      data-lumi-glow={glow}
      style={{ ...glowStyle(glowColor), ...style }}
    >
      {loading ? (
        <span className="lumi-spinner" aria-hidden="true" />
      ) : (
        startIcon && (
          <span className="lumi-button-icon" aria-hidden="true">
            {startIcon}
          </span>
        )
      )}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
      {endIcon && (
        <span className="lumi-button-icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </motion.button>
  ),
);
Button.displayName = 'Button';
