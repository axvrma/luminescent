import type { Meta, StoryObj } from '@storybook/react-vite';
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
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </>
  ),
};

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const Loading: Story = {
  args: { children: 'Create project', loading: true, loadingLabel: 'Creating project' },
};
export const Disabled: Story = { args: { children: 'Create project', disabled: true } };
export const Destructive: Story = { args: { children: 'Delete project', variant: 'destructive' } };
export const Outline: Story = { args: { children: 'View project', variant: 'outline' } };
export const Ghost: Story = { args: { children: 'Cancel', variant: 'ghost' } };
