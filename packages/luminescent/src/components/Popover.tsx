import React from 'react';
import * as Primitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { cn } from '../lib/classes';
import { usePortalContainer } from './LuminescentProvider';
export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof Primitive.Content> {
  trigger: React.ReactElement;
  label: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
}
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      label,
      open,
      defaultOpen,
      onOpenChange,
      closeLabel = 'Close popover',
      children,
      className,
      sideOffset = 10,
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
            className={cn('lumi-popover', className)}
          >
            {children}
            <Primitive.Close
              className="lumi-icon-button lumi-overlay-close"
              aria-label={closeLabel}
            >
              <X size={16} aria-hidden="true" />
            </Primitive.Close>
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    );
  },
);
Popover.displayName = 'Popover';
