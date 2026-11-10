import Link from 'next/link';
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="brand">
          luminescent<span className="brand-period">.</span>
        </Link>
        <p>Beautiful by default. Accessible by design.</p>
      </div>
      <nav aria-label="Footer">
        <Link href="/docs/project/version">v0.1.7</Link>
        <Link href="/docs/project/changelog">Changelog</Link>
        <a href="https://github.com/axvrma/luminescent">GitHub ↗</a>
        <a href="https://github.com/axvrma/luminescent/blob/main/LICENSE">MIT License</a>
      </nav>
    </footer>
  );
}
