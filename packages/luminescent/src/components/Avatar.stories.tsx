import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
const meta = { title: 'Components/Avatar', component: Avatar, tags: ['autodocs'] } satisfies Meta<
  typeof Avatar
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { alt: 'Alex Morgan' } };
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Large: Story = { args: { ...Default.args, size: 'lg' } };
export const FailedImage: Story = { args: { ...Default.args, src: '/missing-avatar.png' } };
