import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import { Card } from './Card';

const meta = { title: 'Components/Skeleton', component: Skeleton, tags: ['autodocs'], parameters: { layout: 'centered' }, args: { width: 280, height: 16 } } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Circular: Story = { args: { variant: 'circular', width: 56, height: 56 } };
export const Pulse: Story = { args: { animation: 'pulse', glowColor: 'violet' } };
export const Static: Story = { args: { animation: 'none' } };
export const ProfileCard: Story = { render: () => <Card className="w-80"><div className="mb-6 flex gap-4"><Skeleton variant="circular" width={48} height={48} /><div className="flex flex-1 flex-col gap-3"><Skeleton width="75%" /><Skeleton width="45%" height={10} /></div></div><Skeleton variant="rectangular" height={140} /><div className="mt-5 flex flex-col gap-3"><Skeleton /><Skeleton width="80%" /></div></Card> };
