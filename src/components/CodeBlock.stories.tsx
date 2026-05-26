import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `import React, { useState } from 'react';
import { Button } from './Button';

export function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-white">Count: {count}</h2>
      <Button 
        variant="primary" 
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </Button>
    </div>
  );
}`;

export const PeachGlow: Story = {
  args: {
    code: sampleCode,
    language: 'tsx',
    glowVariant: 'peach',
    showLineNumbers: true,
  },
};

export const CometGlow: Story = {
  args: {
    code: `function calculateOrbit(radius, velocity) {
  const G = 6.67430e-11;
  const M = 5.972e24; // Earth mass
  
  // Calculate orbital period
  const period = 2 * Math.PI * Math.sqrt(Math.pow(radius, 3) / (G * M));
  
  return {
    period: period / 3600, // hours
    stable: velocity > Math.sqrt(G * M / radius)
  };
}`,
    language: 'javascript',
    glowVariant: 'comet',
    showLineNumbers: false,
  },
};

export const LightGlow: Story = {
  args: {
    code: `/* Minimal CSS */
.glass-panel {
  background: rgba(22, 24, 30, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}`,
    language: 'css',
    glowVariant: 'light',
    showLineNumbers: true,
  },
};
