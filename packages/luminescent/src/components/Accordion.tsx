import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { glowStyle, type GlowColor } from '../lib/glow';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  title: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  disabled?: boolean;
  glowColor?: GlowColor;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function Accordion({ title, expanded, defaultExpanded = false, onChange, disabled, glowColor = 'peach', headingLevel = 3, className, style, children, id, ...props }: AccordionProps) {
  const generatedId = React.useId();
  const accordionId = id ?? generatedId;
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = expanded ?? internalExpanded;
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <div {...props} id={accordionId} className={cn('lumi-surface lumi-accordion', className)} style={glowStyle(glowColor, style)} data-expanded={isExpanded} data-disabled={disabled || undefined}>
      <Heading className="lumi-accordion-heading">
        <button
          type="button"
          id={`${accordionId}-trigger`}
          className="lumi-accordion-trigger"
          disabled={disabled}
          aria-expanded={isExpanded}
          aria-controls={`${accordionId}-panel`}
          onClick={() => {
            if (expanded === undefined) setInternalExpanded(!isExpanded);
            onChange?.(!isExpanded);
          }}
        >
          <span>{title}</span>
          <ChevronDown size={18} className="lumi-accordion-chevron" aria-hidden="true" />
        </button>
      </Heading>
      <div id={`${accordionId}-panel`} role="region" aria-labelledby={`${accordionId}-trigger`} hidden={!isExpanded} className="lumi-accordion-panel">{children}</div>
    </div>
  );
}
