import React from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { cn } from '../lib/classes';
import { usePortalContainer } from './LuminescentProvider';
export interface DropdownMenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  destructive?: boolean;
  href?: string;
  shortcut?: string;
  onSelect?: () => void;
}
export interface DropdownMenuProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Content>,
  'children'
> {
  trigger: React.ReactElement;
  items: DropdownMenuItem[];
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAction?: (id: string) => void;
}
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      items,
      label = 'Actions',
      open,
      defaultOpen,
      onOpenChange,
      onAction,
      className,
      sideOffset = 8,
      ...props
    },
    ref,
  ) => {
    const container = usePortalContainer();
    return (
      <Primitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
        <Primitive.Portal container={container}>
          <Primitive.Content
            {...props}
            ref={ref}
            sideOffset={sideOffset}
            aria-label={label}
            className={cn('lumi-dropdown', className)}
            loop={props.loop ?? true}
          >
            {items.map((item) => (
              <Primitive.Item
                key={item.id}
                disabled={item.disabled}
                textValue={item.label}
                asChild={Boolean(item.href)}
                className="lumi-dropdown-item"
                data-destructive={item.destructive || undefined}
                onSelect={() => {
                  item.onSelect?.();
                  onAction?.(item.id);
                }}
              >
                {item.href ? (
                  <a href={item.disabled ? undefined : item.href}>
                    {item.label}
                    {item.shortcut && (
                      <span className="lumi-dropdown-shortcut">{item.shortcut}</span>
                    )}
                  </a>
                ) : (
                  <>
                    {item.label}
                    {item.shortcut && (
                      <span className="lumi-dropdown-shortcut">{item.shortcut}</span>
                    )}
                  </>
                )}
              </Primitive.Item>
            ))}
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    );
  },
);
DropdownMenu.displayName = 'DropdownMenu';
