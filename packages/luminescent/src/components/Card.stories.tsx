import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkles } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { Button } from './Button';

const content = (
  <>
    <Sparkles size={26} className="mb-6 text-[#ffaa66]" />
    <div className="mb-3">
      <Chip size="sm">A brighter workspace</Chip>
    </div>
    <h2 className="mb-3 text-xl font-semibold text-[color:var(--lumi-text)]">
      Designed to feel alive.
    </h2>
    <p className="mb-6 text-sm leading-relaxed text-[color:var(--lumi-muted)]">
      Layered light and an illuminated edge give this surface depth. Enable the spotlight for an
      optional cursor-following treatment.
    </p>
    <Button variant="secondary" size="sm">
      Explore the collection
    </Button>
  </>
);
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: content, className: 'w-80' },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Violet: Story = { args: { glowColor: 'violet' } };
export const WithoutSpotlight: Story = { args: { spotlight: false } };

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };

export const Spotlight: Story = { args: { spotlight: true } };
