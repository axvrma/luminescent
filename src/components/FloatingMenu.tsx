import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Box, Shield, Hexagon, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FloatingMenuItem {
  id: string;
  label?: string;
  href?: string;
  icon?: React.ElementType;
}

export interface FloatingMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  glowColor?: 'white' | 'peach';
  glowPosition?: 'top' | 'bottom';
  items?: FloatingMenuItem[];
  activeId?: string;
  onChange?: (id: string) => void;
}

export const FloatingMenu = React.forwardRef<HTMLDivElement, FloatingMenuProps>(
  ({ className, glowColor = 'peach', glowPosition = 'bottom', items, activeId: propActiveId, onChange, ...props }, ref) => {
    const [activeIcon, setActiveIcon] = useState<string | null>(propActiveId || (items ? items[0]?.id : '0'));

    useEffect(() => {
      if (propActiveId !== undefined) {
        setActiveIcon(propActiveId);
      }
    }, [propActiveId]);

    const defaultItems: FloatingMenuItem[] = [
      { id: '0', icon: Sparkles },
      { id: '1', icon: Box },
      { id: '2', icon: Shield },
      { id: '3', icon: Hexagon },
      { id: '4', icon: Circle },
    ];

    const displayItems = items || defaultItems;

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

          {displayItems.map((item) => {
            const isActive = activeIcon === item.id;
            const Icon = item.icon;
            
            const content = (
              <>
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
                {Icon && <Icon className={cn("w-5 h-5 z-10 relative", item.label && "mr-2")} />}
                {item.label && <span className="z-10 relative text-sm font-medium">{item.label}</span>}
              </>
            );

            const btnClass = cn(
              "relative flex items-center justify-center h-10 rounded-full transition-colors duration-300 outline-none",
              item.label ? "px-4" : "w-10",
              isActive ? "text-[#1a0f0a]" : "text-neutral-500 hover:text-neutral-300"
            );

            const handleClick = (e: React.MouseEvent) => {
              if (item.href) {
                // If it's a link, we let the default behavior happen or handle it via a wrapper.
                // We just update state.
              } else {
                e.preventDefault();
              }
              if (propActiveId === undefined) {
                setActiveIcon(item.id);
              }
              onChange?.(item.id);
            };

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleClick}
                  className={btnClass}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {content}
                </a>
              );
            }

            return (
              <motion.button
                key={item.id}
                onClick={handleClick}
                className={btnClass}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {content}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
);

FloatingMenu.displayName = "FloatingMenu";
