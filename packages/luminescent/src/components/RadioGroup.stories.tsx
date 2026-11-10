import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to hold state for the story
const RadioGroupWithState = (args: RadioGroupProps) => {
  const [value, setValue] = useState(args.value || 'pro');
  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <RadioGroupWithState {...args} />,
  args: {
    label: 'Plan',
    value: 'pro',
    options: [
      {
        value: 'starter',
        label: 'Starter Plan',
        description: 'Perfect for small side projects.',
      },
      {
        value: 'pro',
        label: 'Pro Plan',
        description: 'For power users and scaling apps.',
      },
      {
        value: 'enterprise',
        label: 'Enterprise',
        description: 'Custom limits and dedicated support.',
      },
    ],
  },
};

export const HorizontalDiscrete: Story = {
  render: (args) => (
    <div className="w-[600px] max-w-full -ml-[100px]">
      <RadioGroupWithState {...args} />
    </div>
  ),
  args: {
    label: 'Plan',
    value: 'pro',
    layout: 'horizontal',
    indicatorAnimation: 'fade',
    options: [
      { value: 'starter', label: 'Starter' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
};

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const IndependentGroups: Story = {
  ...Default,
  render: () => (
    <div className="flex gap-8">
      <RadioGroup
        label="Plan"
        defaultValue="pro"
        options={[
          { value: 'starter', label: 'Starter' },
          { value: 'pro', label: 'Pro' },
        ]}
      />
      <RadioGroup
        label="Billing"
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly', disabled: true },
        ]}
      />
    </div>
  ),
};
