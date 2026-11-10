import React from 'react';
import { cn } from '../lib/classes';
import { useReducedMotion } from '../lib/useReducedMotion';

export interface ContainerTextFlipProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  interval?: number;
  textClassName?: string;
  animationDuration?: number;
  variant?: 'primary' | 'secondary';
}
export const ContainerTextFlip = React.forwardRef<HTMLDivElement, ContainerTextFlipProps>(
  (
    {
      words = ['better', 'modern', 'beautiful', 'awesome'],
      interval = 3000,
      className,
      textClassName,
      animationDuration = 700,
      variant = 'secondary',
      style,
      ...props
    },
    ref,
  ) => {
    const [index, setIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);
    const reduced = useReducedMotion();
    React.useEffect(() => {
      if (words.length < 2 || paused || reduced) return;
      const timer = setInterval(
        () => {
          if (!document.hidden) setIndex((previous) => (previous + 1) % words.length);
        },
        Math.max(1000, Number.isFinite(interval) ? interval : 3000),
      );
      return () => clearInterval(timer);
    }, [words.length, interval, paused, reduced]);
    if (!words.length) return null;
    const current = reduced ? words[0] : words[index % words.length];
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-text-flip', className)}
        data-variant={variant}
        style={
          {
            '--lumi-flip-duration': `${Math.max(0, Number.isFinite(animationDuration) ? animationDuration : 700)}ms`,
            ...style,
          } as React.CSSProperties
        }
      >
        <span className="lumi-visually-hidden">{words.join(', ')}</span>
        <span className={cn('lumi-text-flip-grid', textClassName)} aria-hidden="true">
          {words.map((word, i) => (
            <span className="lumi-text-flip-measure" key={`${word}-${i}`}>
              {word}
            </span>
          ))}
          <span key={`${current}-${index}`} className="lumi-text-flip-word">
            {current}
          </span>
        </span>
        {!reduced && words.length > 1 && (
          <button
            type="button"
            className="lumi-flip-pause"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Resume text animation' : 'Pause text animation'}
            aria-pressed={paused}
          >
            {paused ? '▶' : 'Ⅱ'}
          </button>
        )}
      </div>
    );
  },
);
ContainerTextFlip.displayName = 'ContainerTextFlip';
