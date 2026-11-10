'use client';
import { Children, isValidElement, type ReactNode, type HTMLAttributes } from 'react';
import { CodeBlock } from 'luminescent';
function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (isValidElement<{ children?: ReactNode }>(node)) return textContent(node.props.children);
  return Children.toArray(node)
    .map((child) =>
      isValidElement<{ children?: ReactNode }>(child)
        ? textContent(child.props.children)
        : typeof child === 'string' || typeof child === 'number'
          ? String(child)
          : '',
    )
    .join('');
}
export function DocsCodeBlock({ children }: HTMLAttributes<HTMLPreElement>) {
  const child = Children.toArray(children)[0];
  const language = isValidElement<{ className?: string }>(child)
    ? (child.props.className?.replace('language-', '') ?? 'text')
    : 'text';
  return <CodeBlock code={textContent(children).replace(/\n$/, '')} language={language} />;
}
