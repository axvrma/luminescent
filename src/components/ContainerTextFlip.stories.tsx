import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContainerTextFlip } from './ContainerTextFlip';

const meta = {
  title: 'Components/ContainerTextFlip',
  component: ContainerTextFlip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContainerTextFlip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    words: ["better", "modern", "Tyler Durden", "awesome"],
    variant: "secondary",
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center p-12">
      <ContainerTextFlip {...args} />
    </div>
  ),
};

export const PrimaryVariant: Story = {
  args: {
    words: ["highlighted", "luminescent", "tactile", "glowing"],
    variant: "primary",
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center p-12">
      <ContainerTextFlip {...args} />
    </div>
  ),
};

export const HeroSectionWithAnimation: Story = {
  args: {
    words: ["better", "modern", "beautiful", "awesome"],
    variant: "secondary",
  },
  render: (args) => (
    <div className="flex items-center justify-center text-left text-4xl leading-normal font-bold tracking-tight text-white md:text-7xl">
      <div className="inline-block">
        Make your websites look 10x <ContainerTextFlip {...args} />
      </div>
    </div>
  ),
};
