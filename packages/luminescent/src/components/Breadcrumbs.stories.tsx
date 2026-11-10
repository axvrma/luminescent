import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#projects' },
      { label: 'Luminescent' },
    ],
  },
};
export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const ReducedMotion: Story = { ...Default, globals: { motion: 'reduced' } };
