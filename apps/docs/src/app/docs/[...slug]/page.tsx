import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import styles from '../docs.module.css';
import { Button, Divider, FloatingMenu, RadioGroup, ScreenReveal, SegmentedControl, TextField, CodeBlock, Toggle, ContainerTextFlip, ImagesBadge, Timeline } from '../../../components/luminescent-client';
import { InteractiveIntegrationForm } from '../../../components/InteractiveIntegrationForm';

const components = {
  InteractiveIntegrationForm,
  Button,
  Divider,
  FloatingMenu,
  RadioGroup,
  ScreenReveal,
  SegmentedControl,
  TextField,
  Toggle,
  CodeBlock,
  ContainerTextFlip,
  ImagesBadge,
  Timeline,
  pre: CodeBlock,
  Preview: ({ children }: { children: React.ReactNode }) => (
    <div className={styles.componentPreview}>
      {children}
    </div>
  )
};

export async function generateStaticParams() {
  return []; // Simplified for dynamic rendering, we can build a crawler if needed
}

import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const contentDir = path.join(process.cwd(), 'content/docs');
  const filePath = path.join(contentDir, `${slugPath}.md`);
  const mdxFilePath = path.join(contentDir, `${slugPath}.mdx`);

  let fileContent;
  try {
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, 'utf8');
    } else if (fs.existsSync(mdxFilePath)) {
      fileContent = fs.readFileSync(mdxFilePath, 'utf8');
    } else {
      notFound();
    }
  } catch (e) {
    notFound();
  }

  const { content, data } = matter(fileContent);

  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark', keepBackground: false }]]
  };

  return (
    <article className={styles.prose}>
      <h1>{data.title || slugPath}</h1>
      {data.description && <p className={styles.lead}>{data.description}</p>}
      <MDXRemote 
        source={content} 
        components={components} 
        options={{ mdxOptions: mdxOptions as any }} 
      />
    </article>
  );
}
