import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = { title: 'Components/Checkbox', component: Checkbox, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { label: 'Ambient lighting', description: 'A softer light for your workspace.' } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Some projects selected' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const Sizes: Story = { render: () => <div className="flex gap-8"><Checkbox size="sm" label="Small" defaultChecked /><Checkbox label="Medium" defaultChecked /><Checkbox size="lg" label="Large" defaultChecked /></div> };
