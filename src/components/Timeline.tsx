import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const TimelineItem = ({ item, containerRef }: { item: TimelineEntry, containerRef?: React.RefObject<HTMLElement> }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 60%", "start 40%"],
    ...(containerRef ? { container: containerRef } : {})
  });

  const circleBg = useTransform(scrollYProgress, [0, 1], ["transparent", "#ffddaa"]);
  const circleBorder = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]);
  const circleShadow = useTransform(scrollYProgress, [0, 1], ["0px 0px 0px rgba(255,170,102,0)", "0px 0px 24px rgba(255,170,102,0.9), 0px 0px 48px rgba(255,170,102,0.5)"]);

  const cardBorder = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.05)", "rgba(255,170,102,0.3)"]);
  const cardBg = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.02)", "rgba(255,170,102,0.05)"]);

  return (
    <div ref={itemRef} className="flex justify-start pt-12 md:pt-24 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start">
        <div className="h-10 absolute left-3 md:left-3 w-10 flex items-center justify-center">
          <motion.div
            style={{
              backgroundColor: circleBg,
              borderColor: circleBorder,
              boxShadow: circleShadow,
            }}
            className="h-4 w-4 rounded-full border-2"
          />
        </div>
      </div>

      <div className="relative pl-16 md:pl-24 pr-4 w-full">
        <motion.div
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
          }}
          className="group relative p-6 md:p-8 rounded-[32px] border backdrop-blur-md transition-colors overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffaa66]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-semibold text-zinc-100 tracking-tight mb-4 flex items-center gap-3">
            {item.title}
          </h3>
          <div className="text-zinc-400 text-sm md:text-base leading-relaxed relative z-10">
            {item.content}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Timeline = ({ data, title, description, className, containerRef: externalContainerRef }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 180px", "end 180px"],
    ...(externalContainerRef ? { container: externalContainerRef } : {})
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn("w-full bg-transparent font-sans md:px-10", className)}
      ref={containerRef}
    >
      {title && (
        <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl tracking-tight font-medium">
            {title}
          </h2>
          {description && (
            <p className="text-zinc-400 text-sm md:text-base max-w-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 mt-10">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} containerRef={externalContainerRef} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 w-16 -ml-[31px] flex justify-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Static background track */}
          <div className="absolute inset-y-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/[0.08] to-transparent to-[99%]" />
          
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              maskImage: "linear-gradient(to top, black 0%, black 20px, transparent 300px, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 0%, black 20px, transparent 300px, transparent 100%)"
            }}
            className="absolute top-0 w-[2px] bg-gradient-to-t from-[#ff8866] via-[#ffaa66] to-transparent from-[0%] via-[20%] rounded-full shadow-[0_0_12px_#ffaa66]"
          >
            {/* Core intense spotlight */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[8px] bg-gradient-to-t from-[#ffddaa]/80 via-[#ffddaa]/30 to-transparent blur-[4px] rounded-full pointer-events-none" />
            {/* Wide ambient aura */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[24px] bg-gradient-to-t from-[#ffaa66]/50 via-[#ffaa66]/20 to-transparent blur-[12px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
