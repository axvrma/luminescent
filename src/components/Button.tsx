import React, { type ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface ButtonProps extends ComponentProps<typeof motion.button> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    // Added 'group' to base styles for hover/active targeted styling
    const baseStyles = "group relative flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18]";
    
    const sizeStyles = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-7 py-2.5 text-[15px]",
      lg: "px-9 py-3.5 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variant === "primary" ? "text-[#1a0f0a] focus-visible:ring-[#F6C29A]" : "text-zinc-300 hover:text-white focus-visible:ring-zinc-600",
          variant === "secondary" && "bg-[#16181e]/80 backdrop-blur-xl border border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-[#1f222a]/80",
          className
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
        {...props}
      >
        {variant === "primary" && (
          <>
            {/* Outer intense ambient glow (bottom spread) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#ffaa66]/30 blur-[20px] rounded-full pointer-events-none transition-colors duration-300 group-hover:bg-[#ffaa66]/60" />

            {/* Core button background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#eeb996] to-[#dea178] pointer-events-none" />
            
            {/* Mesh Texture Overlay */}
            <div 
              className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)`
              }}
            />

            {/* Inner top highlight (bevel) */}
            <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none transition-colors duration-300 group-hover:border-white/50" />
            
            {/* Inner bottom shadow (bevel) */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] pointer-events-none" />
            
            {/* Center Intense Spotlight from bottom */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-[#ffddaa]/60 blur-[10px] rounded-full pointer-events-none transition-all duration-300 group-hover:bg-[#ffddaa]/90 group-hover:w-[90%]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-3 bg-[#fffce0] blur-[6px] rounded-full pointer-events-none transition-all duration-300 group-hover:w-[60%] group-hover:h-4 group-hover:bg-white" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-white blur-[1px] rounded-full pointer-events-none transition-all duration-300 group-hover:w-[40%]" />
          </>
        )}
        
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

        {variant === "secondary" && (
          <>
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
                 className="absolute inset-[50px] rounded-full opacity-100 blur-[6px] transition-opacity duration-500"
                 style={{
                   background: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,170,102,1) 320deg, #fffce0 360deg)`,
                   animation: 'spin-border 3s linear infinite',
                 }}
               />

               {/* Massive Ambient Aura (Free-flowing, wide atmospheric bleed) */}
               <div 
                 className="absolute inset-[50px] rounded-full opacity-80 group-hover:opacity-100 blur-[24px] transition-opacity duration-500"
                 style={{
                   background: `conic-gradient(from var(--angle), transparent 0deg 180deg, rgba(255,170,102,1) 300deg, #fffce0 360deg)`,
                   animation: 'spin-border 3s linear infinite',
                 }}
               />
             </div>

             {/* Subtle top bevel for secondary */}
             <div className="absolute inset-0 rounded-full border border-white/[0.04] pointer-events-none" />
             <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100 group-active:opacity-100" />
          </>
        )}

        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
