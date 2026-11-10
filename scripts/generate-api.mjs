import ts from 'typescript';
import { readdir, readFile, writeFile } from 'node:fs/promises';
const directory = new URL('../packages/luminescent/src/components/', import.meta.url);
const result = {};
for (const name of (await readdir(directory))
  .filter((name) => name.endsWith('.tsx') && !name.includes('.stories.'))
  .sort()) {
  const source = ts.createSourceFile(
    name,
    await readFile(new URL(name, directory), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const props = [];
  for (const node of source.statements) {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      for (const member of node.members) {
        if (!ts.isPropertySignature(member) || !member.name) continue;
        props.push({
          interface: node.name.text,
          name: member.name.getText(source),
          type: member.type?.getText(source) ?? 'unknown',
          required: !member.questionToken,
          description: ts
            .getJSDocCommentsAndTags(member)
            .map((doc) => (typeof doc.comment === 'string' ? doc.comment : ''))
            .filter(Boolean)
            .join(' '),
        });
      }
    }
  }
  result[name.replace('.tsx', '')] = props;
}
const output = JSON.stringify(result, null, 2) + '\n';
const target = new URL('../apps/docs/src/lib/api.generated.json', import.meta.url);
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== output)
    throw Error('API reference is stale; run npm run docs:api');
} else await writeFile(target, output);

// Enumerate trusted repository MDX once, instead of tracing the entire filesystem at runtime.
const { default: matter } = await import('gray-matter');
const docsRoot = new URL('../apps/docs/content/docs/', import.meta.url);
const docs = {};
async function walk(directory, prefix = '') {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (entry.isDirectory())
      await walk(new URL(entry.name + '/', directory), prefix + entry.name + '/');
    else if (/\.mdx?$/.test(entry.name)) {
      const { content, data } = matter(await readFile(new URL(entry.name, directory), 'utf8'));
      const slug = prefix + entry.name.replace(/\.mdx?$/, '');
      docs[slug] = {
        title: typeof data.title === 'string' ? data.title : slug,
        description: typeof data.description === 'string' ? data.description : '',
        content,
      };
    }
  }
}
await walk(docsRoot);
const docsOutput = JSON.stringify(docs, null, 2) + '\n';
const docsTarget = new URL('../apps/docs/src/lib/docs.generated.json', import.meta.url);
if (process.argv.includes('--check')) {
  if ((await readFile(docsTarget, 'utf8')) !== docsOutput)
    throw Error('Docs manifest is stale; run npm run docs:api');
} else await writeFile(docsTarget, docsOutput);
