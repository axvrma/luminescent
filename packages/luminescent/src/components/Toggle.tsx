import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked, defaultChecked = false, onChange, size = "md", disabled, ...props }, ref) => {
    const [isInternalChecked, setIsInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : isInternalChecked;

    const handleToggle = () => {
      if (disabled) return;
      const newValue = !isChecked;
      if (!isControlled) {
        setIsInternalChecked(newValue);
      }
      onChange?.(newValue);
    };

    const sizeStyles = {
      sm: { track: "w-10 h-5", thumb: "w-[16px] h-[16px]", checkedX: 22, uncheckedX: 2 },
      md: { track: "w-14 h-7", thumb: "w-[22px] h-[22px]", checkedX: 31, uncheckedX: 3 },
      lg: { track: "w-16 h-8", thumb: "w-[26px] h-[26px]", checkedX: 35, uncheckedX: 3 }
    };

    const currentSize = sizeStyles[size];

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "group relative flex items-center rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] focus-visible:ring-[#F6C29A]",
          currentSize.track,
          isChecked ? "bg-transparent" : "bg-[#16181e]/80 border border-white/5",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
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

        {/* Unchecked state gradient glow (like secondary button) */}
        <motion.div
          initial={false}
          animate={{ opacity: isChecked ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full"
        >
          {/* Unclipped Ambient Aura Container */}
          <div 
            className="absolute -inset-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              padding: '50px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            {/* Core Glow */}
            <div 
              className="absolute inset-[50px] rounded-full blur-[6px]"
              style={{
                background: `conic-gradient(from var(--angle), transparent 0deg 220deg, rgba(255,170,102,1) 320deg, #fffce0 360deg)`,
                animation: 'spin-border 3s linear infinite',
              }}
            />
            {/* Massive Ambient Aura */}
            <div 
              className="absolute inset-[50px] rounded-full blur-[24px]"
              style={{
                background: `conic-gradient(from var(--angle), transparent 0deg 180deg, rgba(255,170,102,1) 300deg, #fffce0 360deg)`,
                animation: 'spin-border 3s linear infinite',
              }}
            />
          </div>
        </motion.div>

        {/* Luminescent background when checked */}
        <motion.div
          initial={false}
          animate={{ opacity: isChecked ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full"
        >
          {/* Outer intense ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#ffaa66]/30 blur-[12px] rounded-full pointer-events-none group-hover:bg-[#ffaa66]/40 transition-colors duration-300" />
          
          {/* Core background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#eeb996] to-[#dea178] pointer-events-none" />
          
          {/* Mesh Texture Overlay */}
          <div 
            className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)`
            }}
          />

          {/* Inner top highlight (bevel) */}
          <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
          
          {/* Inner bottom shadow (bevel) */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] pointer-events-none" />
          
          {/* Center Intense Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-2 bg-[#fffce0]/60 blur-[4px] rounded-full pointer-events-none group-hover:bg-[#fffce0]/90 transition-all duration-300" />
        </motion.div>

        {/* The Toggle Thumb */}
        <motion.div
          className={cn(
            "relative z-10 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)] flex items-center justify-center transition-colors duration-300",
            currentSize.thumb,
            isChecked ? "bg-black" : "bg-zinc-300 group-hover:bg-white"
          )}
          initial={false}
          animate={{
            x: isChecked ? currentSize.checkedX : currentSize.uncheckedX,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.8
          }}
        >
          {isChecked && (
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_4px_rgba(255,170,102,0.4)] pointer-events-none" />
          )}
        </motion.div>
      </button>
    );
  }
);

Toggle.displayName = "Toggle";
