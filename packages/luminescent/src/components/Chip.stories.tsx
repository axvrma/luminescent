import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkles } from 'lucide-react';
import { Chip } from './Chip';

const meta = { title: 'Components/Chip', component: Chip, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { children: 'Luminescent', icon: <Sparkles /> } } satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Outlined: Story = { args: { variant: 'outlined', glowColor: 'violet' } };
export const Colors: Story = { render: () => <div className="flex flex-wrap gap-3">{(['peach', 'violet', 'blue', 'mint'] as const).map(color => <Chip key={color} glowColor={color}>{color}</Chip>)}</div> };
export const Deletable: Story = { render: function DeletableChips() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Design']);
  return <div className="flex gap-3">{tags.map(tag => <Chip key={tag} onDelete={() => setTags(tags.filter(item => item !== tag))} deleteLabel={`Remove ${tag}`}>{tag}</Chip>)}{tags.length === 0 && <span className="text-sm text-zinc-400">All tags removed.</span>}</div>;
} };
