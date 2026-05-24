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
      peach: `conic-gradient(from var(--angle), transparent 0deg 270deg, rgba(255,170,102,0.4) 330deg, #fffce0 360deg)`,
      comet: `conic-gradient(from var(--angle), transparent 0deg 180deg, rgba(249,115,22,0.6) 240deg, rgba(168,85,247,0.8) 300deg, rgba(59,130,246,0.9) 340deg, white 360deg)`,
      light: `conic-gradient(from var(--angle), transparent 0deg 270deg, rgba(255,255,255,0.4) 330deg, white 360deg)`
    };

    const gradientBorder = variants[glowVariant];
    const bgStyle = {
      background: `linear-gradient(#030303, #030303) padding-box, ${gradientBorder} border-box`,
      animation: 'spin-border 3s linear infinite'
    };

    return (
      <div className={cn("relative flex w-full max-w-md group", containerClassName)}>
        <style dangerouslySetInnerHTML={{ __html: propertyStyle }} />
        
        {/* AMBIENT BLOOM (Blurred version of the border glow) */}
        <div 
          className="absolute inset-0 rounded-full border-[2px] border-transparent pointer-events-none transition-opacity duration-1000 ease-out opacity-0 group-focus-within:opacity-100 blur-[8px]"
          style={bgStyle}
        />

        {/* SHARP BORDER GLOW */}
        <div 
          className="absolute inset-0 rounded-full border-[2px] border-transparent pointer-events-none transition-opacity duration-700 opacity-0 group-focus-within:opacity-100"
          style={bgStyle}
        />

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
