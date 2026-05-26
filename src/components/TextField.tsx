import React from 'react';
import { cn } from '../lib/utils';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  glowVariant?: 'peach' | 'comet' | 'light';
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, containerClassName, glowVariant = 'light', ...props }, ref) => {
    
    // Inject the CSS @property to allow smooth animation of the conic-gradient angle.
    // This perfectly replicates the mathematically precise padding-box / border-box technique.
    const propertyStyle = `
      @property --angle {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      @keyframes spin-border {
        to { --angle: 360deg; }
      }
    `;

    const variants = {
      peach: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,170,102,1) 320deg, #fffce0 360deg)`,
      comet: `conic-gradient(from var(--angle), transparent 0deg 180deg, rgba(249,115,22,1) 240deg, rgba(168,85,247,1) 300deg, rgba(59,130,246,1) 340deg, white 360deg)`,
      light: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,255,255,1) 320deg, white 360deg)`
    };

    return (
      <div className={cn("relative flex w-full max-w-md group bg-[#030303] rounded-full", containerClassName)}>
        <style dangerouslySetInnerHTML={{ __html: propertyStyle }} />
        
        {/* Unclipped Ambient Aura Container (Massive 50px overflow area to let blur spread infinitely) */}
        <div 
          className="absolute -inset-[50px] rounded-full pointer-events-none"
          style={{
            padding: '50px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          {/* Core Glow (Tight, bright atmospheric bleed) */}
          <div 
            className="absolute inset-[50px] rounded-full opacity-0 group-focus-within:opacity-100 blur-[6px] transition-opacity duration-700"
            style={{
              background: variants[glowVariant],
              animation: 'spin-border 3s linear infinite',
            }}
          />

          {/* Massive Ambient Aura (Free-flowing, wide atmospheric bleed) */}
          <div 
            className="absolute inset-[50px] rounded-full opacity-0 group-focus-within:opacity-80 blur-[24px] transition-opacity duration-1000"
            style={{
              background: variants[glowVariant],
              animation: 'spin-border 3s linear infinite',
            }}
          />
        </div>

        {/* DEFAULT STATIC BORDER (when not focused) */}
        <div 
          className="absolute inset-0 rounded-full border border-white/10 transition-colors duration-700 pointer-events-none group-focus-within:border-transparent"
        />

        {/* ACTUAL INPUT */}
        <input
          ref={ref}
          {...props}
          className={cn(
            "relative w-full bg-transparent px-6 py-4 text-[15px] text-white placeholder-zinc-500 outline-none rounded-full text-center z-10",
            className
          )}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';
