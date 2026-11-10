import type { Meta, StoryObj } from '@storybook/react';
import { ImagesBadge } from './ImagesBadge';

const meta = {
  title: 'Components/ImagesBadge',
  component: ImagesBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[200px] flex items-center justify-center p-12 rounded-xl border border-white/[0.04] bg-[#0a0f18]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImagesBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'View Gallery',
    images: [
      'https://images.unsplash.com/photo-1506744626753-1fa44df14d28?q=80&w=2400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444464666168-49b626426095?q=80&w=2400&auto=format&fit=crop'
    ],
  },
};
