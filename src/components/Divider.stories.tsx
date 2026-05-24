import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalLeftGlow: Story = {
  args: {
    orientation: 'vertical',
    intensity: 'high',
    glowDirection: 'left',
    color: '#a855f7', // Bright purple matching the screenshot
  },
};

export const HorizontalTopGlow: Story = {
  args: {
    orientation: 'horizontal',
    intensity: 'medium',
    glowDirection: 'top',
    color: '#3b82f6', // Blue
  },
};

export const SymmetricalBoth: Story = {
  args: {
    orientation: 'vertical',
    intensity: 'low',
    glowDirection: 'both',
    color: '#10b981', // Emerald
  },
};
