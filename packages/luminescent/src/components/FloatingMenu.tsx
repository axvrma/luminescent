import React from 'react';
import { Sparkles, Box, Shield, Hexagon, Circle } from 'lucide-react';
import { Divider } from './Divider';
import { cn } from '../lib/classes';
import { glowStyle } from '../lib/glow';
export { cn } from '../lib/utils';

export interface FloatingMenuItem {
  id: string;
  label?: string;
  href?: string;
  icon?: React.ElementType;
  disabled?: boolean;
}
export interface FloatingMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  glowColor?: 'white' | 'peach';
  glowPosition?: 'top' | 'bottom';
  items?: FloatingMenuItem[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  withDivider?: boolean;
}
const defaults: FloatingMenuItem[] = [
  { id: '0', label: 'Discover', icon: Sparkles },
  { id: '1', label: 'Components', icon: Box },
  { id: '2', label: 'Security', icon: Shield },
  { id: '3', label: 'Design', icon: Hexagon },
  { id: '4', label: 'Settings', icon: Circle },
];
export const FloatingMenu = React.forwardRef<HTMLDivElement, FloatingMenuProps>(
  (
    {
      className,
      glowColor = 'peach',
      glowPosition = 'bottom',
      items = defaults,
      activeId,
      defaultActiveId,
      onChange,
      withDivider,
      style,
      ...props
    },
    ref,
  ) => {
    const [internalActive, setInternalActive] = React.useState(defaultActiveId ?? items[0]?.id);
    const selected = activeId ?? internalActive;
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-floating-menu', className)}
        role={props.role ?? 'group'}
        aria-label={props['aria-label'] ?? 'Quick navigation'}
        data-glow-position={glowPosition}
        style={glowStyle(undefined, {
          ...(glowColor === 'white' ? { '--lumi-color': '220, 220, 230' } : {}),
          ...style,
        } as React.CSSProperties)}
      >
        <div className="lumi-floating-menu-items">
          {items.map((item) => {
            const Icon = item.icon;
            const selectedItem = selected === item.id;
            const content = (
              <>
                {Icon && <Icon aria-hidden="true" width={18} height={18} />}
                {item.label && <span>{item.label}</span>}
              </>
            );
            const onClick = () => {
              if (item.disabled) return;
              if (activeId === undefined) setInternalActive(item.id);
              onChange?.(item.id);
            };
            return item.href ? (
              <a
                key={item.id}
                className="lumi-menu-action"
                role="link"
                href={item.disabled ? undefined : item.href}
                aria-disabled={item.disabled || undefined}
                tabIndex={item.disabled ? -1 : undefined}
                aria-label={item.label ?? `Item ${item.id}`}
                aria-current={selectedItem ? 'page' : undefined}
                data-active={selectedItem}
                onClick={onClick}
              >
                {content}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                className="lumi-menu-action"
                aria-label={item.label ?? `Item ${item.id}`}
                aria-pressed={selectedItem}
                data-active={selectedItem}
                disabled={item.disabled}
                onClick={onClick}
              >
                {content}
              </button>
            );
          })}
        </div>
        {withDivider && (
          <Divider orientation="horizontal" glowDirection={glowPosition} intensity="low" />
        )}
      </div>
    );
  },
);
FloatingMenu.displayName = 'FloatingMenu';
