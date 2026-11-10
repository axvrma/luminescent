import type { Meta, StoryObj } from '@storybook/react-vite';
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
    color: '#ffaa66', // Peach
  },
};

export const HorizontalTopGlow: Story = {
  args: {
    orientation: 'horizontal',
    intensity: 'medium',
    glowDirection: 'top',
    color: '#ffaa66', // Peach
  },
};

export const SymmetricalBoth: Story = {
  args: {
    orientation: 'vertical',
    intensity: 'low',
    glowDirection: 'both',
    color: '#ffaa66', // Peach
  },
};

export const Default: Story = { args: { orientation: 'horizontal' } };
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
