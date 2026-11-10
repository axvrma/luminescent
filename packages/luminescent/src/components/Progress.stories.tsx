import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { label: 'Preparing your workspace', value: 64, showValue: true },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Indeterminate: Story = {
  args: { value: undefined, label: 'Syncing assets', glowColor: 'violet' },
};
export const Circular: Story = { args: { variant: 'circular' } };
export const CircularIndeterminate: Story = {
  args: { variant: 'circular', value: undefined, glowColor: 'mint' },
};

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
