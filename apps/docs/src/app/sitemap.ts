import type { MetadataRoute } from 'next';
import { docSlugs } from '../lib/docs';
import { componentEntries } from '../lib/catalog';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const routes = [
    '/',
    '/playground',
    '/docs/components',
    ...docSlugs().map((slug) => `/docs/${slug}`),
    ...componentEntries.map((entry) => `/docs/components/${entry.slug}`),
  ];
  return [...new Set(routes)].map((route) => ({ url: new URL(route, base).href }));
}
