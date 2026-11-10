import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './Button';
import { Toggle } from './Toggle';
import React from 'react';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0f18' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Notifications',
    size: 'md',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications',
    size: 'md',
    defaultChecked: true,
  },
};

export const Sizes = () => (
  <div className="flex items-center gap-8">
    <Toggle aria-label="Notifications" size="sm" />
    <Toggle aria-label="Notifications" size="md" defaultChecked />
    <Toggle aria-label="Notifications" size="lg" />
  </div>
);

export const Disabled = () => (
  <div className="flex items-center gap-8">
    <Toggle aria-label="Notifications" size="md" disabled />
    <Toggle aria-label="Notifications" size="md" defaultChecked disabled />
  </div>
);

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };

export const RequiredValidation: Story = {
  render: () => (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <Toggle label="Accept terms" required name="terms" />
      <Button type="submit">Submit form</Button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Submit form' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('This setting is required.');
    await expect(canvas.getByRole('switch')).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(canvas.getByRole('switch')).toBeChecked();
    await userEvent.click(canvas.getByRole('button', { name: 'Submit form' }));
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    canvasElement.dataset.interaction = 'passed';
  },
};
