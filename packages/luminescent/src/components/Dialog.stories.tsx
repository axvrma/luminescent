import { expect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { TextField } from './TextField';
const meta = { title: 'Components/Dialog', component: Dialog, tags: ['autodocs'] } satisfies Meta<
  typeof Dialog
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    trigger: <Button>Edit profile</Button>,
    title: 'Edit profile',
    description: 'Update your identity.',
    children: <TextField label="Display name" defaultValue="Alex Morgan" />,
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
export const Open: Story = { args: { ...Default.args, defaultOpen: true } };

export const KeyboardInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Edit profile' }));
    const document = within(canvasElement.ownerDocument.body);
    await expect(document.getByRole('dialog', { name: 'Edit profile' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(canvas.getByRole('button', { name: 'Edit profile' })).toHaveFocus();
    canvasElement.dataset.interaction = 'passed';
  },
};
