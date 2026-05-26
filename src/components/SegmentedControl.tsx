import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface SegmentedControlProps {
  tabs: string[];
  defaultActiveTab?: string;
  onChange?: (tab: string) => void;
  className?: string;
}

export function SegmentedControl({
  tabs = [],
  defaultActiveTab,
  onChange,
  className,
}: SegmentedControlProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onChange) {
      onChange(tab);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Segmented Control"
      className={cn(
        "relative flex items-center p-[5px] rounded-full",
        "bg-[#16181e]/80 backdrop-blur-xl",
        "border border-white/[0.04]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabClick(tab)}
            onMouseEnter={() => setIsHovered(tab)}
            onMouseLeave={() => setIsHovered(null)}
            className={cn(
              "relative px-7 py-2.5 rounded-full text-[15px] font-medium tracking-tight transition-colors duration-300 outline-none",
              isActive
                ? "text-[#1a0f0a]"
                : "text-zinc-500 hover:text-zinc-300"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 rounded-full"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 35,
                  mass: 0.8
                }}
              >
                {/* Outer intense ambient glow (bottom spread) */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#ffaa66]/30 blur-[20px] rounded-full pointer-events-none" />

                {/* Core button background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#eeb996] to-[#dea178]" />
                
                {/* Mesh Texture Overlay */}
                <div 
                  className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)`
                  }}
                />

                {/* Inner top highlight (bevel) */}
                <div className="absolute inset-0 rounded-full border border-white/30" />
                
                {/* Inner bottom shadow (bevel) */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]" />
                
                {/* Center Intense Spotlight from bottom */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-[#ffddaa]/60 blur-[10px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-3 bg-[#fffce0] blur-[6px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-white blur-[1px] rounded-full pointer-events-none" />

              </motion.div>
            )}

            {/* Hover state for inactive tabs */}
            {!isActive && isHovered === tab && (
              <motion.div
                layoutId="hover-tab-indicator"
                className="absolute inset-0 rounded-full bg-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}

            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
