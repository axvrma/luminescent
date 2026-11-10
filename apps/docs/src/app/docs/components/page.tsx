import type { Metadata } from 'next';
import { ComponentCatalog } from '../../../components/ComponentCatalog';
import { componentEntries } from '../../../lib/catalog';
export const metadata: Metadata = {
  title: 'Components',
  description: 'Explore the complete Luminescent React component catalog.',
};
export default function ComponentsPage() {
  return (
    <>
      <div className="page-eyebrow">THE BUILDING BLOCKS</div>
      <h1>
        Components<span className="peach-text">.</span>
      </h1>
      <p className="page-lead">
        {componentEntries.length} thoughtfully crafted components. One shared visual language.
      </p>
      <ComponentCatalog />
    </>
  );
}
