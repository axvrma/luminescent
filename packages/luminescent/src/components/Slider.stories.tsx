import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = { title: 'Components/Slider', component: Slider, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { label: 'Light intensity', defaultValue: 64, formatValue: (value: number) => `${value}%` }, decorators: [(Story) => <div className="w-72"><Story /></div>] } satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Stepped: Story = { args: { min: 0, max: 10, step: 2, defaultValue: 6, formatValue: String, glowColor: 'violet' } };
export const Disabled: Story = { args: { disabled: true } };
export const Colors: Story = { render: () => <div className="flex flex-col gap-6">{(['peach', 'violet', 'blue', 'mint'] as const).map(glowColor => <Slider key={glowColor} label={glowColor} glowColor={glowColor} defaultValue={65} />)}</div> };
