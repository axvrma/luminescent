import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { count: 12, defaultPage: 3, 'aria-label': 'Project pages' },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Disabled: Story = { args: { ...Default.args, disabled: true } };
export const Empty: Story = { args: { count: 0 } };
export const LargeCount: Story = { args: { count: 1000000, defaultPage: 5000 } };
