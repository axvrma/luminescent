"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Visual variant of the container */
  variant?: "primary" | "secondary";
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  variant = "secondary",
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (48px to account for px-6)
      const textWidth = textRef.current.scrollWidth + 48;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000, ease: "anticipate" }}
      className={cn(
        "relative inline-flex align-middle items-center justify-center rounded-2xl py-2 px-6 text-center text-3xl font-bold tracking-tight md:text-4xl",
        variant === "secondary" && "bg-[#16181e]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] text-white",
        variant === "primary" && "text-[#1a0f0a]",
        className
      )}
      key={words[currentWordIndex]}
    >
      {variant === "secondary" && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(135deg, rgba(255, 170, 102, 0.8), rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {variant === "primary" && (
        <>
          {/* Outer intense ambient glow (bottom spread) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#ffaa66]/30 blur-[20px] rounded-2xl pointer-events-none" />

          {/* Core button background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#eeb996] to-[#dea178] pointer-events-none" />
          
          {/* Mesh Texture Overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)`
            }}
          />

          {/* Inner top highlight (bevel) */}
          <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" />
          
          {/* Inner bottom shadow (bevel) */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] pointer-events-none" />
          
          {/* Center Intense Spotlight from bottom */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-[#ffddaa]/60 blur-[10px] rounded-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-3 bg-[#fffce0] blur-[6px] rounded-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-white blur-[1px] rounded-2xl pointer-events-none" />
        </>
      )}

      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("relative z-10 inline-block whitespace-nowrap overflow-hidden py-1", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                y: 5,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
