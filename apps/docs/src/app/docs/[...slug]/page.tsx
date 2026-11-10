import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import * as library from '../../../components/luminescent-client';
import { DocsCodeBlock } from '../../../components/DocsCodeBlock';
import { ComponentDocumentation } from '../../../components/ComponentDocumentation';
import { ComponentDemo, ComponentGallery } from '../../../components/ExtendedComponents';
import { InteractiveIntegrationForm } from '../../../components/InteractiveIntegrationForm';
import { componentEntries, findComponent } from '../../../lib/catalog';
import { docSlugs, readDoc } from '../../../lib/docs';
import styles from '../docs.module.css';
type Props = { params: Promise<{ slug: string[] }> };
const components = {
  Button: library.Button,
  Divider: library.Divider,
  FloatingMenu: library.FloatingMenu,
  RadioGroup: library.RadioGroup,
  ScreenReveal: library.ScreenReveal,
  SegmentedControl: library.SegmentedControl,
  TextField: library.TextField,
  CodeBlock: library.CodeBlock,
  Toggle: library.Toggle,
  ContainerTextFlip: library.ContainerTextFlip,
  ImagesBadge: library.ImagesBadge,
  Timeline: library.Timeline,
  ComponentDemo,
  ComponentGallery,
  InteractiveIntegrationForm,
  pre: DocsCodeBlock,
  Preview: ({ children }: { children?: React.ReactNode }) => (
    <div className={styles.componentPreview}>{children}</div>
  ),
};
export function generateStaticParams() {
  return [
    ...new Set([...docSlugs(), ...componentEntries.map((entry) => `components/${entry.slug}`)]),
  ].map((slug) => ({ slug: slug.split('/') }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const component =
    slug[0] === 'components' && slug.length === 2 ? findComponent(slug[1]) : undefined;
  const doc = component ?? readDoc(slug.join('/'));
  return doc
    ? { title: 'name' in doc ? doc.name : doc.title, description: doc.description }
    : { title: 'Page not found', robots: { index: false } };
}
export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const component =
    slug[0] === 'components' && slug.length === 2 ? findComponent(slug[1]) : undefined;
  if (component) return <ComponentDocumentation name={component.name} />;
  const doc = readDoc(slug.join('/'));
  if (!doc) notFound();
  return (
    <article className={styles.prose}>
      <h1>{doc.title}</h1>
      {doc.description && <p className={styles.lead}>{doc.description}</p>}
      <MDXRemote
        source={doc.content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
  );
}
