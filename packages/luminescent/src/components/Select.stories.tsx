import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = <><option value="peach">Peach sunset</option><option value="violet">Violet haze</option><option value="blue">Blue hour</option><option value="mint">Mint aurora</option></>;
const meta = { title: 'Components/Select', component: Select, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { label: 'Glow palette', defaultValue: 'peach', children: options }, decorators: [(Story) => <div className="w-72"><Story /></div>] } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Violet: Story = { args: { glowColor: 'violet', defaultValue: 'violet', description: 'Focus the field to light up its border.' } };
export const Error: Story = { args: { error: 'Choose a palette to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
