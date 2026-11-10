import React from 'react';
import { Highlight } from 'prism-react-renderer';
import { cn } from '../lib/classes';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  language?: string;
  lang?: string;
  glowVariant?: 'peach' | 'comet' | 'light';
  showLineNumbers?: boolean;
}
const theme = {
  plain: { color: 'var(--lumi-text)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog'], style: { color: 'var(--lumi-muted)' } },
    { types: ['keyword', 'tag', 'operator'], style: { color: 'var(--lumi-code-keyword)' } },
    { types: ['string', 'attr-value'], style: { color: 'var(--lumi-code-string)' } },
    { types: ['function', 'class-name', 'attr-name'], style: { color: 'var(--lumi-accent-text)' } },
  ],
};
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language,
      lang,
      glowVariant = 'peach',
      showLineNumbers = false,
      children,
      ...props
    },
    ref,
  ) => {
    const activeLanguage = (language || lang || 'tsx').toLowerCase();
    const [status, setStatus] = React.useState('');
    const preRef = React.useRef<HTMLPreElement>(null);
    const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const mounted = React.useRef(true);
    React.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        clearTimeout(timeout.current);
      };
    }, []);
    async function copy() {
      clearTimeout(timeout.current);
      try {
        await navigator.clipboard.writeText(code ?? preRef.current?.textContent ?? '');
        if (mounted.current) setStatus('Copied');
      } catch {
        if (mounted.current) setStatus('Unable to copy. Select and copy the code manually.');
      }
      if (mounted.current) timeout.current = setTimeout(() => setStatus(''), 3000);
    }
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-code lumi-surface', className)}
        data-variant={glowVariant}
      >
        <div className="lumi-code-header">
          <span>{activeLanguage}</span>
          <button type="button" className="lumi-code-copy" onClick={copy} aria-label="Copy code">
            {status === 'Copied' ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
        <div
          className="lumi-code-scroll"
          tabIndex={0}
          role="group"
          aria-label={`${activeLanguage} code`}
        >
          {code !== undefined && code.length <= 20000 ? (
            <Highlight theme={theme} code={code} language={activeLanguage}>
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre ref={preRef}>
                  <code>
                    {tokens.map((line, index) => (
                      <span {...getLineProps({ line })} key={index} className="lumi-code-line">
                        {showLineNumbers && (
                          <span className="lumi-code-number" aria-hidden="true">
                            {index + 1}
                          </span>
                        )}
                        <span>
                          {line.map((token, tokenIndex) => (
                            <span {...getTokenProps({ token })} key={tokenIndex} />
                          ))}
                        </span>
                        {'\n'}
                      </span>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          ) : (
            <pre ref={preRef}>
              <code>{code ?? children}</code>
            </pre>
          )}
        </div>
        <span role="status" className="lumi-visually-hidden">
          {status}
        </span>
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';
