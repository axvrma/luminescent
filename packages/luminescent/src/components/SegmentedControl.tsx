import React from 'react';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';
import { cn } from '../lib/classes';

export interface SegmentedControlProps extends Omit<
  RadioGroupProps,
  'options' | 'layout' | 'defaultValue'
> {
  /** Legacy name for selection options, unrelated to tab panels. */
  tabs: string[];
  defaultActiveTab?: string;
  activeTab?: string;
}
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ tabs = [], defaultActiveTab, activeTab, value, className, ...props }, ref) => (
    <RadioGroup
      {...props}
      ref={ref}
      className={cn('lumi-segmented', className)}
      layout="horizontal"
      value={value ?? activeTab}
      defaultValue={defaultActiveTab ?? tabs[0]}
      options={tabs.map((tab) => ({ value: tab, label: tab }))}
    />
  ),
);
SegmentedControl.displayName = 'SegmentedControl';
