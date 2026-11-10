import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
// import { CodeBlock } from '../components/CodeBlock';
import { HomeClient } from '../components/HomeClient';
import { CodeBlock } from '@/components/luminescent-client';

// const components = {
//   pre: CodeBlock
// };

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark', keepBackground: false }]]
};

export default async function Home() {
  const installRaw = `
npm install luminescent
# or
yarn add luminescent
`;

  const configureRaw = `
import { Button } from "luminescent";

function App() {
  return <Button glowColor="peach">Click Me</Button>;
}
`;

  const buildRaw = `
<div className="luminescent-hero-bg">
  <SegmentedControl tabs={["Design", "Develop", "Deploy"]} />
</div>
`;

  const installCode = <CodeBlock code={installRaw} lang="bash" />;

  const configureCode = <CodeBlock code={configureRaw} lang="tsx" />;

  const buildCode = <CodeBlock code={buildRaw} lang="tsx" />;

  return (
    <HomeClient
      installCode={installCode}
      configureCode={configureCode}
      buildCode={buildCode}
    />
  );
}
