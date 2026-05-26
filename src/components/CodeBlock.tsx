import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  glowVariant?: 'peach' | 'comet' | 'light';
  showLineNumbers?: boolean;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language = 'tsx', glowVariant = 'peach', showLineNumbers = false, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
      peach: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,170,102,1) 320deg, #fffce0 360deg)`,
      comet: `conic-gradient(from var(--angle), transparent 0deg 180deg, rgba(249,115,22,1) 240deg, rgba(168,85,247,1) 300deg, rgba(59,130,246,1) 340deg, white 360deg)`,
      light: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,255,255,1) 320deg, white 360deg)`
    };

    const gradientBorder = variants[glowVariant];

    return (
      <div 
        ref={ref}
        className={cn("relative group w-full max-w-3xl", className)}
        {...props}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @property --angle {
            syntax: "<angle>";
            inherits: true;
            initial-value: 0deg;
          }
          @keyframes spin-border {
            to { --angle: 360deg; }
          }
        ` }} />

        {/* Unclipped Ambient Aura Container (50px padding, matches rounded-3xl [24px] inner radius, so outer is 74px) */}
        <div 
          className="absolute -inset-[50px] pointer-events-none rounded-[74px]"
          style={{
            padding: '50px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          {/* Core Glow (Tight, bright atmospheric bleed) */}
          <div 
            className="absolute inset-[50px] rounded-3xl opacity-60 group-hover:opacity-100 blur-[8px] transition-opacity duration-700"
            style={{
              background: gradientBorder,
              animation: 'spin-border 4s linear infinite',
            }}
          />

          {/* Massive Ambient Aura (Free-flowing, wide atmospheric bleed) */}
          <div 
            className="absolute inset-[50px] rounded-3xl opacity-40 group-hover:opacity-90 blur-[32px] transition-opacity duration-1000"
            style={{
              background: gradientBorder,
              animation: 'spin-border 4s linear infinite',
            }}
          />
        </div>

        {/* Main Code Block Container */}
        <div className="relative rounded-3xl bg-[#16181e]/90 backdrop-blur-xl border border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05] bg-black/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-medium text-zinc-400 font-mono lowercase tracking-wider">
                {language}
              </span>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Copy code"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Code Content */}
          <div className="p-5 overflow-x-auto text-[13px] sm:text-sm custom-scrollbar">
            <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={cn(className, "m-0 bg-transparent")} style={{ ...style, backgroundColor: 'transparent' }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                      {showLineNumbers && (
                        <span className="table-cell text-right select-none opacity-30 pr-4 w-8 font-mono text-xs">
                          {i + 1}
                        </span>
                      )}
                      <span className="table-cell">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
          
          {/* Inner ambient shadows for depth */}
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
        </div>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
