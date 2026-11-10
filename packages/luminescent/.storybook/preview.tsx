import type { Preview } from '@storybook/react-vite';
import { LuminescentProvider } from '../src/components/LuminescentProvider';
import '../src/dev.css';
import '../src/index.css';
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Scoped color theme',
      toolbar: { icon: 'paintbrush', items: ['dark', 'light', 'system'], dynamicTitle: true },
    },
    motion: {
      description: 'Motion preference',
      toolbar: { icon: 'play', items: ['system', 'reduced'], dynamicTitle: true },
    },
    accent: {
      description: 'Accent palette',
      toolbar: { icon: 'circle', items: ['peach', 'violet', 'blue', 'mint'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'dark', motion: 'system', accent: 'peach' },
  decorators: [
    (Story, context) => (
      <LuminescentProvider
        theme={
          context.globals.theme === 'light' || context.globals.theme === 'system'
            ? context.globals.theme
            : 'dark'
        }
        motion={context.globals.motion === 'reduced' ? 'reduced' : 'system'}
        accent={
          context.globals.accent === 'violet' ||
          context.globals.accent === 'blue' ||
          context.globals.accent === 'mint'
            ? context.globals.accent
            : 'peach'
        }
        style={{ padding: 32, background: 'var(--lumi-bg)', minHeight: 140, width: '100%' }}
      >
        <h1 className="lumi-visually-hidden">Luminescent component laboratory</h1>
        <h2 className="lumi-visually-hidden">Component preview</h2>
        <Story />
      </LuminescentProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
  },
};
export default preview;
