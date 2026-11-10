import React from 'react';
import * as Primitive from '@radix-ui/react-tabs';
import { cn } from '../lib/classes';
export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}
export interface TabsProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Root>,
  'children'
> {
  items: TabItem[];
  label?: string;
}
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, label = 'Tabs', defaultValue, className, ...props }, ref) => (
    <Primitive.Root
      {...props}
      ref={ref}
      defaultValue={defaultValue ?? items.find((item) => !item.disabled)?.value}
      className={cn('lumi-tabs', className)}
    >
      <Primitive.List className="lumi-tab-list" aria-label={label}>
        {items.map((item) => (
          <Primitive.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="lumi-tab"
          >
            {item.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      {items.map((item) => (
        <Primitive.Content key={item.value} value={item.value} className="lumi-tab-panel">
          {item.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  ),
);
Tabs.displayName = 'Tabs';
