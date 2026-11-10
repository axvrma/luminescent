import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    title: 'No projects yet',
    description: 'Start something wonderful.',
    action: <Button>Create project</Button>,
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
