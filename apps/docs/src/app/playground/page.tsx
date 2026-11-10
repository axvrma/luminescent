import type { Metadata } from 'next';
import { ComponentWorkbench } from '../../components/ComponentWorkbench';
export const metadata: Metadata = {
  title: 'Component playground',
  description:
    'Explore every Luminescent component, customize its theme, and copy working React code.',
};
export default function PlaygroundPage() {
  return (
    <main id="main-content" className="playground-page">
      <div className="page-eyebrow">YOUR NEXT INTERFACE, IN THE MAKING</div>
      <h1>
        Make it yours<span className="peach-text">.</span>
      </h1>
      <p className="page-lead">
        A space to explore the details. Find your palette, tune the glow, and take the code with
        you.
      </p>
      <ComponentWorkbench full />
    </main>
  );
}
