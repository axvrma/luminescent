import React from 'react';
import * as Primitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '../lib/classes';
export interface ToastProviderProps extends React.ComponentProps<typeof Primitive.Provider> {
  label?: string;
}
export function ToastProvider({
  children,
  label = 'Notifications',
  duration = 5000,
  ...props
}: ToastProviderProps) {
  return (
    <Primitive.Provider {...props} duration={duration} label={label}>
      {children}
      <Primitive.Viewport className="lumi-toast-viewport" label={`${label} (F8)`} />
    </Primitive.Provider>
  );
}
export interface ToastProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Root>,
  'title'
> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: { label: string; altText: string; onClick: () => void };
  closeLabel?: string;
}
export const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  (
    {
      title,
      description,
      action,
      closeLabel = 'Dismiss notification',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Primitive.Root {...props} ref={ref} className={cn('lumi-toast', className)}>
      <Primitive.Title className="lumi-toast-title">{title}</Primitive.Title>
      {description && (
        <Primitive.Description className="lumi-description">{description}</Primitive.Description>
      )}
      {children}
      {action && (
        <Primitive.Action
          altText={action.altText}
          className="lumi-toast-action"
          onClick={action.onClick}
        >
          {action.label}
        </Primitive.Action>
      )}
      <Primitive.Close className="lumi-icon-button lumi-overlay-close" aria-label={closeLabel}>
        <X size={16} aria-hidden="true" />
      </Primitive.Close>
    </Primitive.Root>
  ),
);
Toast.displayName = 'Toast';
