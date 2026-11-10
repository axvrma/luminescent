import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
const meta = { title: 'Components/Badge', component: Badge, tags: ['autodocs'] } satisfies Meta<
  typeof Badge
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { children: 'Published', variant: 'success', dot: true } };
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Danger: Story = { args: { children: 'Needs attention', variant: 'danger' } };
