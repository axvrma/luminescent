'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { Dialog, TextField } from 'luminescent';
import { searchEntries } from '../lib/catalog';
export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const resultsRef = useRef<HTMLUListElement>(null);
  const results = searchEntries
    .filter((entry) =>
      `${entry.title} ${entry.description}`.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .slice(0, 12);
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setQuery('');
      }}
      trigger={
        <button type="button" className="docs-search-trigger">
          <Search size={16} aria-hidden="true" />
          <span>Search documentation…</span>
          <kbd>⌘ K</kbd>
        </button>
      }
      title="Search documentation"
      description="Find components, foundations, and guides."
      size="md"
    >
      <TextField
        label="Search"
        type="search"
        placeholder="Try dialog, themes, or forms…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            resultsRef.current?.querySelector('a')?.focus();
          }
        }}
      />
      <p className="search-result-count" role="status">
        {results.length
          ? `${results.length} results${results.length === 12 ? ' shown' : ''}`
          : 'No results found. Try a component name or topic.'}
      </p>
      <ul
        ref={resultsRef}
        className="docs-search-results"
        onKeyDown={(event) => {
          if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
          const links = [...(resultsRef.current?.querySelectorAll('a') ?? [])];
          const index = links.findIndex((link) => link === document.activeElement);
          const next =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? links.length - 1
                : (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
          event.preventDefault();
          links[next]?.focus();
        }}
      >
        {results.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href} onClick={() => setOpen(false)}>
              <span>
                <strong>{entry.title}</strong>
                <small>{entry.description}</small>
              </span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
