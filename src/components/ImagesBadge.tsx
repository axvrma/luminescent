import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  href?: string;
  target?: string;
  textPosition?: "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg";
  baseWidth?: number;
  imageSize?: { width: number; height: number };
}

export function ImagesBadge({
  text,
  images = [],
  className,
  href,
  target,
  textPosition = "bottom",
  size = "md",
  baseWidth = 80,
  imageSize = { width: 48, height: 32 },
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit to max 3 images
  const displayImages = images.slice(0, 3);
  const Component = href ? "a" : "div";

  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;

  return (
    <Component
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 perspective-[1000px] transform-3d relative",
        textPosition === "top" ? "flex-col-reverse" : 
        textPosition === "left" ? "flex-row-reverse" : 
        textPosition === "right" ? "flex-row" : 
        "flex-col",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for projector and images */}
      <div 
        className="relative flex flex-col items-center justify-center" 
        style={{ 
          width: 56 * scale, 
          height: 36 * scale,
        }}
      >
        <div
          className="absolute bottom-0 flex flex-col items-center justify-end"
          style={{
            width: 56,
            height: 36,
            transform: `scale(${scale})`,
            transformOrigin: "bottom center"
          }}
        >
          <div 
            className="relative w-full h-full"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Folder Back Group */}
          <div 
            className="absolute bottom-0 left-1/2 w-[56px] h-[36px] z-0"
            style={{ transform: "translateX(-50%) translateZ(-10px)" }}
          >
            {/* Folder Tab */}
            <div className="absolute -top-[8px] left-1 w-5 h-[8px] rounded-t-[4px] bg-[#ffaa66] border-t border-l border-r border-white/20" />
            
            {/* Folder Back */}
            <div className="absolute inset-0 rounded-[6px] bg-[#ffaa66] border border-white/20 shadow-inner overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            </div>

            {/* Internal Light Source */}
            <motion.div 
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-5 bg-[#ffaa66] rounded-full blur-[10px] pointer-events-none z-10"
              animate={{
                opacity: isHovered ? 0.9 : 0.5,
                scale: isHovered ? 1.6 : 1,
                bottom: isHovered ? "10px" : "6px"
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Floating Images */}
          {displayImages.map((image, index) => {
            const totalImages = displayImages.length;
            
            // Original horizontal fanning logic
            const hoverRotationAngle = 15;
            const hoverSpread = 25;
            const hoverTranslateY = -45;

            const baseRotation =
              totalImages === 1
                ? 0
                : totalImages === 2
                  ? (index - 0.5) * hoverRotationAngle
                  : (index - 1) * hoverRotationAngle;

            const hoverY = hoverTranslateY - (totalImages - 1 - index) * 3;
            const hoverX =
              totalImages === 1
                ? 0
                : totalImages === 2
                  ? (index - 0.5) * hoverSpread
                  : (index - 1) * hoverSpread;

            // Resting state (stacked neatly inside folder)
            const restY = -4 - (totalImages - 1 - index) * 2;
            const restRotation =
              totalImages === 1
                ? 0
                : totalImages === 2
                  ? (index - 0.5) * 3
                  : (index - 1) * 3;

            return (
              <motion.div
                key={index}
                className="absolute bottom-0 left-1/2 origin-bottom overflow-hidden rounded-[4px] bg-[#16181e]/90 shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-white/[0.1] backdrop-blur-md"
                style={{
                  zIndex: 10 + index, 
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${index}px)`, // Slight stagger in Z to prevent any fighting
                }}
                animate={{
                  x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                  y: isHovered ? hoverY : restY,
                  rotateZ: isHovered ? baseRotation : restRotation,
                  width: isHovered ? 56 : imageSize.width,
                  height: isHovered ? 40 : imageSize.height,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                  delay: isHovered ? index * 0.03 : 0, // Only delay on hover
                }}
              >
                {/* Scanline overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.05] z-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)`
                  }}
                />
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover opacity-90"
                />
              </motion.div>
            );
          })}

          {/* Folder Front (Animated to open in 3D) */}
          <motion.div 
            className="absolute bottom-0 left-1/2 w-[56px] h-[26px] origin-bottom rounded-[6px] bg-[#ffaa66]/90 backdrop-blur-md border border-white/20 shadow-[0_-4px_16px_rgba(255,170,102,0.4)] overflow-hidden z-20"
            style={{ 
              x: "-50%", 
              z: 10, // Explicitly push the folder front ahead of the images in 3D space
              transformStyle: "preserve-3d" 
            }}
            animate={{
              rotateX: isHovered ? -35 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Intense Luminescent Edge Glow on Hover */}
            <motion.div 
              className="absolute inset-x-0 bottom-0 h-1 bg-[#ffaa66] blur-[2px]"
              animate={{
                opacity: isHovered ? 1 : 0.8,
                boxShadow: isHovered ? "0 0 16px 6px rgba(255,170,102,0.8)" : "0 0 8px 3px rgba(255,170,102,0.6)",
                height: isHovered ? "4px" : "2px",
                backgroundColor: isHovered ? "#ffaa66" : "#ffaa66"
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Top highlight */}
            <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-[#ffcc99]/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

        {/* Base Floor Glow (Ambient) */}
        <motion.div 
          className="absolute bottom-0 w-[100%] h-3 bg-[#ffaa66]/30 blur-[10px] rounded-full pointer-events-none z-10"
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1.4 : 1.1,
            backgroundColor: isHovered ? "rgba(255, 170, 102, 0.5)" : "rgba(255, 170, 102, 0.35)"
          }}
        />
        </div>
      </div>

      {/* Text */}
      <span className="text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white">
        {text}
      </span>
    </Component>
  );
}
