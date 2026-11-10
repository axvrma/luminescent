import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from './Button';
import { TextField } from './TextField';
const meta = { title: 'Components/Popover', component: Popover, tags: ['autodocs'] } satisfies Meta<
  typeof Popover
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    trigger: <Button>Preferences</Button>,
    label: 'Display preferences',
    children: <TextField label="Workspace name" defaultValue="Studio" />,
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Open: Story = { args: { ...Default.args, defaultOpen: true } };
