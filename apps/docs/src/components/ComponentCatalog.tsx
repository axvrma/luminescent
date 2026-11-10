'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { componentEntries } from '../lib/catalog';
const categories = ['All components', ...new Set(componentEntries.map((entry) => entry.category))];
export function ComponentCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All components');
  const entries = componentEntries.filter(
    (entry) =>
      (category === 'All components' || entry.category === category) &&
      `${entry.name} ${entry.description} ${entry.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="catalog-filter">
        <label className="catalog-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search components</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find your next building block…"
            type="search"
          />
        </label>
        <div className="category-list" role="group" aria-label="Component category">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <p className="catalog-count" role="status">
        {entries.length} components
      </p>
      <div className="component-catalog">
        {entries.map((entry) => (
          <Link key={entry.name} href={`/docs/components/${entry.slug}`} className="catalog-card">
            <span className="catalog-category">{entry.category}</span>
            <h2>
              {entry.name}
              <ArrowUpRight size={16} aria-hidden="true" />
            </h2>
            <p>{entry.description}</p>
          </Link>
        ))}
      </div>
      {!entries.length && (
        <div className="search-empty">
          <h2>No components found</h2>
          <p>Try a shorter name or choose another category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('All components');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
