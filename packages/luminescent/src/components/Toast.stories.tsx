import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { ToastProvider } from './Toast';
const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    defaultOpen: true,
    title: 'Project created',
    description: 'Your workspace is ready.',
    duration: 60000,
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
