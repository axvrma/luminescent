import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email address...',
    glowVariant: 'peach',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email address...',
    glowVariant: 'peach',
  },
};

export const SearchInput: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Search the cosmos...',
    glowVariant: 'peach',
  },
};

export const LightTheme: Story = { ...Default, globals: { theme: 'light' } };
export const Validation: Story = {
  args: {
    label: 'Email',
    description: 'Work email address',
    error: 'Enter a valid email address.',
    defaultValue: 'not-an-email',
    type: 'email',
  },
};
export const Password: Story = {
  args: { label: 'Password', type: 'password', passwordToggle: true },
};
export const Disabled: Story = {
  args: { label: 'Email', defaultValue: 'alex@example.com', disabled: true },
};
