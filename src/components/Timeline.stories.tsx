import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import React from 'react';

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const dummyData = [
  {
    title: "Early 2024",
    content: (
      <div>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Released the first stable version of Luminescent UI. Bringing smooth framer-motion animations
          and dark-mode native components to developers worldwide.
        </p>
      </div>
    ),
  },
  {
    title: "Late 2023",
    content: (
      <div>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Designed the core design system and created the primary tokens for glassmorphism
          and gradient glows. We settled on OKLCH colors for vibrant transitions.
        </p>
      </div>
    ),
  },
  {
    title: "Mid 2023",
    content: (
      <div>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          The idea for Luminescent UI was born. A UI library that focuses entirely on
          rich, dark-mode aesthetics out of the box.
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    title: "Timeline of Innovation",
    description: "Follow along the journey of building the next generation of modern component libraries.",
    data: dummyData,
  },
  render: (args) => (
    <div className="bg-[#0f0f11] min-h-screen text-white">
      <Timeline {...args} />
    </div>
  ),
};
