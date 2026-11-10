import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
const meta = { title: 'Components/Tabs', component: Tabs, tags: ['autodocs'] } satisfies Meta<
  typeof Tabs
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Project details',
    items: [
      { value: 'overview', label: 'Overview', content: 'Your project at a glance.' },
      { value: 'activity', label: 'Activity', content: 'Recent activity.' },
      { value: 'settings', label: 'Settings', content: 'Settings.', disabled: true },
    ],
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const ManualActivation: Story = { args: { ...Default.args, activationMode: 'manual' } };
export const Vertical: Story = { args: { ...Default.args, orientation: 'vertical' } };
