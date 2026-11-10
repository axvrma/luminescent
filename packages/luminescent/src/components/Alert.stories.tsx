import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from './Button';

const meta = { title: 'Components/Alert', component: Alert, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { title: 'A little heads-up', children: 'Your new components are ready to explore.' }, decorators: [(Story) => <div className="w-80"><Story /></div>] } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Severities: Story = { render: () => <div className="flex flex-col gap-4"><Alert severity="info" title="Stay in the loop">Your team has a new update.</Alert><Alert severity="success" title="All saved">Your changes are up to date.</Alert><Alert severity="warning" title="A gentle reminder">Your trial ends in three days.</Alert><Alert severity="error" title="Connection interrupted">Reconnect to keep everything in sync.</Alert></div> };
export const Dismissible: Story = { render: function DismissibleAlert() {
  const [visible, setVisible] = useState(true);
  return visible ? <Alert severity="success" title="Changes saved" onClose={() => setVisible(false)}>Your workspace is up to date.</Alert> : <Button size="sm" variant="secondary" onClick={() => setVisible(true)}>Show alert again</Button>;
} };
