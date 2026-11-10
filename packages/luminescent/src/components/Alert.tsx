import React from 'react';
import { CircleCheck, CircleAlert, Info, TriangleAlert, X } from 'lucide-react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  severity?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  closeLabel?: string;
}

const severityStyles = {
  info: { color: 'blue' as GlowColor, icon: Info },
  success: { color: 'mint' as GlowColor, icon: CircleCheck },
  warning: { color: 'peach' as GlowColor, icon: TriangleAlert },
  error: { color: 'peach' as GlowColor, icon: CircleAlert },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    title,
    severity = 'info',
    onClose,
    closeLabel = 'Dismiss alert',
    className,
    style,
    children,
    ...props
  }: AlertProps,
  ref,
) {
  const { icon: Icon } = severityStyles[severity];
  return (
    <div
      ref={ref}
      role={severity === 'error' || severity === 'warning' ? 'alert' : 'status'}
      {...props}
      className={cn('lumi-alert', className)}
      style={glowStyle(undefined, {
        '--lumi-color': `var(--lumi-${severity === 'error' ? 'danger' : severity})`,
        ...style,
      } as React.CSSProperties)}
    >
      <Icon size={20} className="lumi-alert-icon" aria-hidden="true" />
      <div className="lumi-alert-content">
        {title && <div className="lumi-alert-title">{title}</div>}
        {children && <div className="lumi-alert-description">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="lumi-icon-button"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});
