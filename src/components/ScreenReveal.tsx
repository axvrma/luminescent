import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export type RevealDirection = 'top' | 'bottom' | 'left' | 'right';

export interface ScreenRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls whether the front screen is lifted to reveal the content */
  isOpen: boolean;
  /** The content to display on the main front screen */
  frontContent: React.ReactNode;
  /** The content to reveal underneath when lifted */
  revealContent: React.ReactNode;
  /** The direction the reveal content should appear from */
  revealDirection?: RevealDirection;
  /** How many pixels the front screen should slide */
  revealAmount?: number;
  /** The border radius of the front screen when revealed */
  frontCornerRadius?: number;
}

export const ScreenReveal = React.forwardRef<HTMLDivElement, ScreenRevealProps>(
  ({ 
    className, 
    isOpen, 
    frontContent, 
    revealContent, 
    revealDirection = 'bottom',
    revealAmount = 140, 
    frontCornerRadius = 48, 
    ...props 
  }, ref) => {
    
    // Calculate the translation for the front screen
    const x = isOpen ? (revealDirection === 'left' ? revealAmount : revealDirection === 'right' ? -revealAmount : 0) : 0;
    const y = isOpen ? (revealDirection === 'top' ? revealAmount : revealDirection === 'bottom' ? -revealAmount : 0) : 0;

    // We want the revealed content to slide in slightly from the edge.
    const revealInitialY = revealDirection === 'bottom' ? 20 : revealDirection === 'top' ? -20 : 0;
    const revealInitialX = revealDirection === 'right' ? 20 : revealDirection === 'left' ? -20 : 0;

    return (
      <div 
        ref={ref}
        className={cn("relative overflow-hidden w-full h-full bg-[#0a0a0a] rounded-[50px] shadow-2xl border-[6px] border-[#222]", className)}
        {...props}
      >
        {/* Bottom Layer: The revealed content */}
        <div className={cn(
          "absolute z-0 flex pointer-events-auto",
          revealDirection === 'bottom' && "inset-x-0 bottom-0 flex-col justify-end p-6",
          revealDirection === 'top' && "inset-x-0 top-0 flex-col justify-start p-6",
          revealDirection === 'left' && "inset-y-0 left-0 flex-row justify-start p-6",
          revealDirection === 'right' && "inset-y-0 right-0 flex-row justify-end p-6"
        )}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: revealInitialX, y: revealInitialY }}
            animate={{ 
              opacity: isOpen ? 1 : 0, 
              scale: isOpen ? 1 : 0.95,
              x: isOpen ? 0 : revealInitialX,
              y: isOpen ? 0 : revealInitialY
            }}
            transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
            className="w-full flex"
            style={{ 
              height: (revealDirection === 'top' || revealDirection === 'bottom') ? revealAmount : '100%',
              width: (revealDirection === 'left' || revealDirection === 'right') ? revealAmount : '100%'
            }}
          >
            {revealContent}
          </motion.div>
        </div>

        {/* Top Layer: The main front screen */}
        <motion.div
          className={cn(
            "absolute inset-0 z-10 w-full h-full bg-neutral-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)]",
            isOpen ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
          )}
          style={{
            originX: revealDirection === 'right' ? 0 : revealDirection === 'left' ? 1 : 0.5,
            originY: revealDirection === 'bottom' ? 0 : revealDirection === 'top' ? 1 : 0.5,
          }}
          initial={{ x: 0, y: 0, scale: 1, borderRadius: 0 }}
          animate={{
            x,
            y,
            borderRadius: isOpen ? frontCornerRadius : 0,
            scale: isOpen ? 0.95 : 1, // Slight 3D scale back
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30, mass: 1 }}
        >
          {frontContent}
          
          {/* iOS style home indicator removed as requested */}
        </motion.div>
      </div>
    );
  }
);

ScreenReveal.displayName = 'ScreenReveal';
