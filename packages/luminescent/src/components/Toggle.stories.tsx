import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import React from 'react';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0f18' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    size: 'md',
    defaultChecked: true,
  },
};

export const Sizes = () => (
  <div className="flex items-center gap-8">
    <Toggle size="sm" />
    <Toggle size="md" defaultChecked />
    <Toggle size="lg" />
  </div>
);

export const Disabled = () => (
  <div className="flex items-center gap-8">
    <Toggle size="md" disabled />
    <Toggle size="md" defaultChecked disabled />
  </div>
);
