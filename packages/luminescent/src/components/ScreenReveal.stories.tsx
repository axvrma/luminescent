import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenReveal, type RevealDirection } from './ScreenReveal';
import { Button } from './Button';
import { Badge } from './Badge';
import { SegmentedControl } from './SegmentedControl';
const meta = {
  title: 'Components/ScreenReveal',
  component: ScreenReveal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScreenReveal>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [direction, setDirection] = useState<RevealDirection>('bottom');
  const id = useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 24 }}>
      <SegmentedControl
        tabs={['top', 'bottom', 'left', 'right']}
        value={direction}
        aria-label="Reveal direction"
        onChange={(value) => {
          if (value === 'top' || value === 'bottom' || value === 'left' || value === 'right')
            setDirection(value);
        }}
      />
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close quick actions' : 'Show quick actions'}
      </Button>
      <ScreenReveal
        id={id}
        isOpen={open}
        revealDirection={direction}
        style={{ width: 'min(100%, 420px)', height: 480 }}
        frontContent={
          <div style={{ padding: 32 }}>
            <Badge>Workspace</Badge>
            <h3 style={{ marginTop: 20 }}>A new perspective.</h3>
            <p style={{ color: 'var(--lumi-muted)' }}>
              One composed surface. A little more room for your next idea.
            </p>
          </div>
        }
        revealContent={<Button>Quick action</Button>}
      />
    </div>
  );
}
export const Default: Story = {
  args: { isOpen: false, frontContent: 'Workspace', revealContent: 'Quick actions' },
  render: () => <Demo />,
};
export const InitiallyOpen: Story = { ...Default, render: () => <Demo initialOpen /> };
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
