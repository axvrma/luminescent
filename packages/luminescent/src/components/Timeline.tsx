import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { cn } from '../lib/classes';
import { useReducedMotion } from '../lib/useReducedMotion';
export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}
export interface TimelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
}
function TimelineBeam({
  target,
  containerRef,
}: {
  target: React.RefObject<HTMLDivElement | null>;
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target,
    container: containerRef,
    offset: ['start center', 'end center'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.span className="lumi-timeline-beam" style={{ scaleY }} aria-hidden="true" />;
}
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ data, title, description, className, containerRef, children, ...props }, ref) => {
    const target = React.useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    return (
      <div {...props} ref={ref} className={cn('lumi-timeline', className)}>
        {title && <h2 className="lumi-timeline-title">{title}</h2>}
        {description && <p className="lumi-description">{description}</p>}
        <div ref={target} className="lumi-timeline-track">
          {!reduced && data.length > 0 && (
            <TimelineBeam target={target} containerRef={containerRef} />
          )}
          <ol className="lumi-timeline-list">
            {data.map((item, index) => (
              <li key={`${item.title}-${index}`} className="lumi-timeline-item">
                <span className="lumi-timeline-dot" aria-hidden="true" />
                <div className="lumi-surface lumi-timeline-content">
                  <h3>{item.title}</h3>
                  <div className="lumi-description">{item.content}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {children}
      </div>
    );
  },
);
Timeline.displayName = 'Timeline';
