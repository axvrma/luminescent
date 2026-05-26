import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  args: {
    variant: 'primary',
    children: 'Schedule a call',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Schedule a call',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Contact us',
  },
};

export const Default: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button'
  },
  render: () => (
    <>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </>
  ),
};
