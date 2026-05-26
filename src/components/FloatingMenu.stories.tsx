import type { Meta, StoryObj } from '@storybook/react';
import { FloatingMenu } from './FloatingMenu';

const meta = {
  title: 'Components/FloatingMenu',
  component: FloatingMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glowColor: 'peach',
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center w-[600px] h-[500px] relative rounded-xl overflow-hidden">
      <FloatingMenu {...args} />
    </div>
  )
};

export const WhiteGlow: Story = {
  args: {
    glowColor: 'white',
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center w-[600px] h-[500px] relative rounded-xl overflow-hidden">
      <FloatingMenu {...args} />
    </div>
  )
};

export const TopGlow: Story = {
  args: {
    glowColor: 'peach',
    glowPosition: 'top',
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center w-[600px] h-[500px] relative rounded-xl overflow-hidden">
      <FloatingMenu {...args} />
    </div>
  )
};
