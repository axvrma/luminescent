import Link from 'next/link';
import { Code2, ArrowUpRight } from 'lucide-react';
import { DocsSearch } from './DocsSearch';
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Luminescent home">
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            luminescent<span className="brand-period">.</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link href="/docs/getting-started">Docs</Link>
          <Link href="/docs/components">Components</Link>
          <Link href="/playground">
            Playground <span className="nav-new">NEW</span>
          </Link>
          <a href="/stroybook/">Storybook</a>
        </nav>
        <div className="header-actions">
          <DocsSearch />
          <a
            className="github-link"
            href="https://github.com/axvrma/luminescent"
            aria-label="Luminescent on GitHub"
          >
            <Code2 size={19} />
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </header>
  );
}
