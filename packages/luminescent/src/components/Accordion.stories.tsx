import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta = { title: 'Components/Accordion', component: Accordion, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { title: 'What makes it luminescent?', children: 'Soft blooms, a fine illuminated edge, and a warm palette bring a little depth to everyday interfaces.' }, decorators: [(Story) => <div className="w-80"><Story /></div>] } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Expanded: Story = { args: { defaultExpanded: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Group: Story = { render: () => <div className="flex flex-col gap-3"><Accordion title="Your first detail" defaultExpanded>A fine edge of peach light.</Accordion><Accordion title="A different palette" glowColor="violet">A violet glow, with the same depth.</Accordion><Accordion title="One more thing" glowColor="mint">Built for your keyboard, too.</Accordion></div> };
