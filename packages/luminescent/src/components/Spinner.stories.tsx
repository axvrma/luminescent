import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
const meta = { title: 'Components/Spinner', component: Spinner, tags: ['autodocs'] } satisfies Meta<
  typeof Spinner
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { label: 'Loading projects' } };
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Large: Story = { args: { ...Default.args, size: 'lg' } };
