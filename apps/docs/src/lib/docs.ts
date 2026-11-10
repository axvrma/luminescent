import documents from './docs.generated.json';
const docs: Record<string, { content: string; title: string; description: string }> = documents;
export function docSlugs() {
  return Object.keys(docs);
}
export function readDoc(slug: string) {
  return Object.hasOwn(docs, slug) ? docs[slug] : undefined;
}
