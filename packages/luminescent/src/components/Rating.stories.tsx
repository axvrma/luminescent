import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';

const meta = { title: 'Components/Rating', component: Rating, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { label: 'Rate your experience', defaultValue: 4 } } satisfies Meta<typeof Rating>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 5, glowColor: 'violet' } };
export const Disabled: Story = { args: { disabled: true } };
export const Sizes: Story = { render: () => <div className="flex flex-col gap-5"><Rating size="sm" defaultValue={3} label="Small rating" /><Rating defaultValue={4} label="Medium rating" /><Rating size="lg" defaultValue={5} label="Large rating" /></div> };
