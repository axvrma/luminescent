import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownMenu } from './DropdownMenu';
import { Button } from './Button';
const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    trigger: <Button>Project actions</Button>,
    items: [
      { id: 'duplicate', label: 'Duplicate' },
      { id: 'archive', label: 'Archive', disabled: true },
      { id: 'delete', label: 'Delete', destructive: true },
    ],
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
