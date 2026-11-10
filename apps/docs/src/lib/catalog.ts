import data from './catalog-data.json';
export type ComponentName = keyof typeof data;
export const catalog = data;
export const componentNames = Object.keys(data) as ComponentName[];
export const componentEntries = componentNames.map((name) => ({ name, ...data[name] }));
export function findComponent(slug: string) {
  return componentEntries.find((entry) => entry.slug === slug);
}
export const documentationGroups = [
  {
    title: 'Introduction',
    links: [
      ['Overview', 'overview'],
      ['Installation', 'getting-started'],
      ['Quick start', 'quick-start'],
      ['Framework integration', 'frameworks'],
      ['Design philosophy', 'philosophy'],
    ],
  },
  {
    title: 'Foundations',
    links: [
      ['Colors', 'foundations/colors'],
      ['Typography', 'foundations/typography'],
      ['Spacing', 'foundations/spacing'],
      ['Themes', 'foundations/themes'],
      ['Motion', 'foundations/motion'],
      ['Accessibility', 'foundations/accessibility'],
      ['Design tokens', 'foundations/tokens'],
    ],
  },
  {
    title: 'Advanced',
    links: [
      ['Custom themes', 'advanced/custom-themes'],
      ['Form integration', 'advanced/forms'],
      ['SSR / Next.js', 'advanced/ssr'],
      ['Performance', 'advanced/performance'],
      ['Migration', 'advanced/migration'],
    ],
  },
  {
    title: 'Project',
    links: [
      ['Changelog', 'project/changelog'],
      ['Contributing', 'project/contributing'],
      ['Version', 'project/version'],
    ],
  },
];
export const searchEntries = [
  {
    title: 'Component catalog',
    href: '/docs/components',
    description: 'Browse every Luminescent component',
  },
  {
    title: 'Playground',
    href: '/playground',
    description: 'Themes, glow, variants and working code',
  },
  ...documentationGroups.flatMap((group) =>
    group.links.map(([title, slug]) => ({
      title,
      href: `/docs/${slug}`,
      description: group.title,
    })),
  ),
  ...componentEntries.map((entry) => ({
    title: entry.name,
    href: `/docs/components/${entry.slug}`,
    description: `${entry.category} · ${entry.description}`,
  })),
];
