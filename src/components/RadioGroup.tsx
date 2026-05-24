import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const IndicatorContent = () => (
  <>
    {/* Outer glow bloom */}
    <div className="absolute -inset-2 rounded-full bg-[#ffaa66]/30 blur-[10px] pointer-events-none" />

    {/* Core background */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#eeb996] to-[#dea178] pointer-events-none" />
    
    {/* Mesh Texture Overlay */}
    <div 
      className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)`
      }}
    />

    {/* Inner top highlight */}
    <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
    
    {/* Inner bottom shadow */}
    <div className="absolute inset-0 rounded-full shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)] pointer-events-none" />
    
    {/* Center Intense Spotlight from bottom */}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-3 bg-[#ffddaa]/70 blur-[4px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-[#fffce0] blur-[2px] rounded-full pointer-events-none" />

    {/* Center Dot */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a0f0a] shadow-[0_1px_1px_rgba(255,255,255,0.4)]" />
  </>
);

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  indicatorAnimation?: 'slide' | 'fade';
}

export function RadioGroup({ 
  options, 
  value, 
  onChange, 
  className,
  layout = 'vertical',
  indicatorAnimation = 'fade'
}: RadioGroupProps) {
  return (
    <div 
      className={cn(
        "flex p-3 rounded-2xl bg-[#16181e]/40 backdrop-blur-md border border-white/[0.04]",
        layout === 'vertical' ? "flex-col gap-3" : "flex-row gap-6 flex-wrap",
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <label
            key={option.value}
            className={cn(
              "relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors duration-300",
              isSelected ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
            )}
            onClick={() => onChange?.(option.value)}
          >
            {/* Native hidden radio input for accessibility */}
            <input
              type="radio"
              className="sr-only"
              name="radiogroup"
              value={option.value}
              checked={isSelected}
              onChange={() => onChange?.(option.value)}
            />

            {/* Custom Radio Indicator */}
            <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
              {/* Inactive state border */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-full border transition-colors duration-300",
                  isSelected ? "border-transparent" : "border-white/10"
                )}
              />

              {/* Active Indicator */}
              {indicatorAnimation === 'slide' ? (
                isSelected && (
                  <motion.div
                    layoutId="radio-active-indicator"
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                      mass: 0.8
                    }}
                  >
                    <IndicatorContent />
                  </motion.div>
                )
              ) : (
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full transition-opacity duration-300",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                >
                  <IndicatorContent />
                </div>
              )}
            </div>

            {/* Label and Description */}
            <div className="flex flex-col">
              <span 
                className={cn(
                  "text-[15px] font-medium tracking-tight transition-colors duration-300 whitespace-nowrap",
                  isSelected ? "text-white" : "text-zinc-400"
                )}
              >
                {option.label}
              </span>
              {option.description && layout === 'vertical' && (
                <span className="text-[13px] text-zinc-500 mt-0.5 leading-snug">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
