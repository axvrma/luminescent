import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup } from './RadioGroup';

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
const RadioGroupWithState = (args: any) => {
  const [value, setValue] = useState(args.value || 'pro');
  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <RadioGroupWithState {...args} />,
  args: {
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
