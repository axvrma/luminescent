'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { componentEntries, documentationGroups } from '../lib/catalog';
export function DocsSidebar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  function link(title: string, href: string) {
    return (
      <Link
        key={href}
        href={href}
        className={pathname === href ? 'sidebar-link active' : 'sidebar-link'}
        aria-current={pathname === href ? 'page' : undefined}
        onClick={() => setOpenPath(null)}
      >
        {title}
      </Link>
    );
  }
  return (
    <>
      <button
        type="button"
        className="mobile-docs-toggle"
        onClick={() => setOpenPath(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="docs-navigation"
      >
        {open ? <X size={16} /> : <Menu size={16} />} Documentation menu
      </button>
      <aside className={`docs-sidebar${open ? ' open' : ''}`} id="docs-navigation">
        <nav aria-label="Documentation">
          {documentationGroups.slice(0, 2).map((group) => (
            <div className="sidebar-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([title, slug]) => link(title, `/docs/${slug}`))}
            </div>
          ))}
          <div className="sidebar-group">
            <h2>
              Components <span>{componentEntries.length}</span>
            </h2>
            {link('All components', '/docs/components')}
            {componentEntries.map((entry) => link(entry.name, `/docs/components/${entry.slug}`))}
          </div>
          {documentationGroups.slice(2).map((group) => (
            <div className="sidebar-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([title, slug]) => link(title, `/docs/${slug}`))}
            </div>
          ))}
          <div className="sidebar-group">
            <h2>Explore</h2>
            {link('Playground', '/playground')}
            {link('Component gallery', '/docs/examples/component-gallery')}
            <a className="sidebar-link" href="/stroybook/">
              Storybook
            </a>
            <a className="sidebar-link" href="https://github.com/axvrma/luminescent">
              GitHub <ArrowUpRight size={12} />
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
