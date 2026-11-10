import React from 'react';
import * as Primitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/classes';
import { usePortalContainer } from './LuminescentProvider';

export interface DialogProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Content>,
  'title'
> {
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      trigger,
      title,
      description,
      open,
      defaultOpen,
      onOpenChange,
      closeLabel = 'Close dialog',
      size = 'md',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const container = usePortalContainer();
    return (
      <Primitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger && <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>}
        <Primitive.Portal container={container}>
          <Primitive.Overlay className="lumi-overlay" />
          <Primitive.Content
            {...props}
            ref={ref}
            className={cn('lumi-dialog', className)}
            data-size={size}
          >
            <Primitive.Title className="lumi-overlay-title">{title}</Primitive.Title>
            {description && (
              <Primitive.Description className="lumi-description">
                {description}
              </Primitive.Description>
            )}
            <div className="lumi-dialog-body">{children}</div>
            <Primitive.Close
              className="lumi-icon-button lumi-overlay-close"
              aria-label={closeLabel}
            >
              <X size={18} aria-hidden="true" />
            </Primitive.Close>
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    );
  },
);
Dialog.displayName = 'Dialog';
/** Modal is an alias; use one name consistently in your application. */
export const Modal = Dialog;
export type ModalProps = DialogProps;
