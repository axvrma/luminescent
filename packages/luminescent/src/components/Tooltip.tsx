import React from 'react';
import * as Primitive from '@radix-ui/react-tooltip';
import { cn } from '../lib/classes';
import { usePortalContainer } from './LuminescentProvider';
export interface TooltipProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Content>,
  'children' | 'content'
> {
  children: React.ReactElement;
  content: React.ReactNode;
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      delayDuration = 400,
      open,
      defaultOpen,
      onOpenChange,
      className,
      sideOffset = 8,
      ...props
    },
    ref,
  ) => {
    const container = usePortalContainer();
    return (
      <Primitive.Provider delayDuration={delayDuration}>
        <Primitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
          <Primitive.Trigger asChild>{children}</Primitive.Trigger>
          <Primitive.Portal container={container}>
            <Primitive.Content
              {...props}
              ref={ref}
              sideOffset={sideOffset}
              className={cn('lumi-tooltip', className)}
            >
              {content}
              <Primitive.Arrow className="lumi-tooltip-arrow" />
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);
Tooltip.displayName = 'Tooltip';
