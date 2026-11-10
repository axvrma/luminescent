import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'soft' | 'outlined';
  size?: 'sm' | 'md';
  glowColor?: GlowColor;
  icon?: React.ReactNode;
  onDelete?: () => void;
  deleteLabel?: string;
  disabled?: boolean;
}

export function Chip({ children, variant = 'soft', size = 'md', glowColor = 'peach', icon, onDelete, deleteLabel = 'Remove chip', disabled, className, style, ...props }: ChipProps) {
  return (
    <span {...props} className={cn('lumi-chip', className)} style={glowStyle(glowColor, style)} data-variant={variant} data-size={size} data-disabled={disabled || undefined}>
      {icon && <span className="lumi-chip-icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {onDelete && <button type="button" className="lumi-icon-button" onClick={onDelete} disabled={disabled} aria-label={deleteLabel}><X size={13} aria-hidden="true" /></button>}
    </span>
  );
}
