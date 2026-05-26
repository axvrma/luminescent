import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Box, Shield, Hexagon, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FloatingMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'white' | 'peach';
  glowPosition?: 'top' | 'bottom';
}

export const FloatingMenu = React.forwardRef<HTMLDivElement, FloatingMenuProps>(
  ({ className, glowColor = 'peach', glowPosition = 'bottom', ...props }, ref) => {
    const [activeIcon, setActiveIcon] = useState<number | null>(0);

    const icons = [
      { id: 0, Icon: Sparkles },
      { id: 1, Icon: Box },
      { id: 2, Icon: Shield },
      { id: 3, Icon: Hexagon },
      { id: 4, Icon: Circle },
    ];

    // Map 'peach' to #FFCBA4 and 'white' to #FFFFFF
    const glowHex = glowColor === 'peach' ? '#FFCBA4' : '#FFFFFF';
    const glowRgba = glowColor === 'peach' ? '255, 203, 164' : '255, 255, 255';

    return (
      <div className={cn("relative group flex flex-col items-center", className)} ref={ref} {...props}>
        {/* The Menu Pill */}
        <div className={cn(
          "relative z-10 flex items-center gap-6 px-6 py-3 rounded-full",
          "bg-[#131313] backdrop-blur-xl border border-white/5 shadow-2xl",
          "transition-all duration-300 ease-out"
        )}>
          {/* Top inner rim highlight */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/10 pointer-events-none" />
          
          {/* Edge very bright light line */}
          <div 
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-[70%] h-[1px] pointer-events-none",
              glowPosition === 'bottom' ? "bottom-0" : "top-0"
            )}
            style={{
              background: `linear-gradient(90deg, transparent, ${glowHex}, transparent)`,
              opacity: 1,
              boxShadow: glowPosition === 'bottom' 
                ? `0 2px 12px 1px rgba(${glowRgba}, 0.8), 0 0 20px 2px rgba(${glowRgba}, 0.6)`
                : `0 -2px 12px 1px rgba(${glowRgba}, 0.8), 0 0 20px 2px rgba(${glowRgba}, 0.6)`
            }}
          />

          {/* Rest of the icons map... */}
          {icons.map((item) => {
            const isActive = activeIcon === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveIcon(item.id)}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 outline-none",
                  isActive ? "text-[#1a0f0a]" : "text-neutral-500 hover:text-neutral-300"
                )}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                      mass: 0.8
                    }}
                  >
                    {/* Outer intense ambient glow (spread) */}
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-[180%] h-16 bg-[#ffaa66]/30 blur-[20px] rounded-full pointer-events-none",
                      glowPosition === 'bottom' ? "-bottom-6" : "-top-6"
                    )} />

                    {/* Core indicator background */}
                    <div className={cn(
                      "absolute inset-0 rounded-full",
                      glowPosition === 'bottom' 
                        ? "bg-gradient-to-b from-[#eeb996] to-[#dea178]" 
                        : "bg-gradient-to-t from-[#eeb996] to-[#dea178]"
                    )} />
                    
                    {/* Mesh Texture Overlay */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)`
                      }}
                    />

                    {/* Inner highlight (bevel) */}
                    <div className="absolute inset-0 rounded-full border border-white/30" />
                    
                    {/* Inner shadow (bevel) */}
                    <div className={cn(
                      "absolute inset-0 rounded-full",
                      glowPosition === 'bottom'
                        ? "shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]"
                        : "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    )} />
                    
                    {/* Center Intense Spotlight */}
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-[120%] h-8 bg-[#ffddaa]/60 blur-[12px] rounded-full pointer-events-none",
                      glowPosition === 'bottom' ? "-bottom-3" : "-top-3"
                    )} />
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#fffce0] blur-[8px] rounded-full pointer-events-none",
                      glowPosition === 'bottom' ? "bottom-0" : "top-0"
                    )} />
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-white blur-[1px] rounded-full pointer-events-none",
                      glowPosition === 'bottom' ? "bottom-0" : "top-0"
                    )} />
                  </motion.div>
                )}
                <item.Icon className="w-5 h-5 z-10 relative" />
              </motion.button>
            )
          })}
        </div>
      </div>
    );
  }
);

FloatingMenu.displayName = "FloatingMenu";
