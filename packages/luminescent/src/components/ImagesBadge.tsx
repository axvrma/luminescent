import React from 'react';
import { cn } from '../lib/classes';
import { glowStyle, type GlowColor } from '../lib/glow';
export interface ImagesBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  images: string[];
  href?: string;
  target?: string;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  baseWidth?: number;
  imageSize?: { width: number; height: number };
  glowColor?: GlowColor;
}
export const ImagesBadge = React.forwardRef<HTMLDivElement, ImagesBadgeProps>(
  (
    {
      text,
      images = [],
      className,
      href,
      target,
      textPosition = 'bottom',
      size = 'md',
      baseWidth = 80,
      imageSize = { width: 48, height: 32 },
      glowColor,
      style,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        <span className="lumi-images-folder" aria-hidden="true">
          {images.slice(0, 3).map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt=""
              loading="lazy"
              width={imageSize.width}
              height={imageSize.height}
              style={{ '--lumi-image-index': index } as React.CSSProperties}
            />
          ))}
          <span className="lumi-images-folder-front" />
        </span>
        <span>{text}</span>
      </>
    );
    const visualStyle = glowStyle(glowColor, {
      '--lumi-folder-width': `${Math.max(32, baseWidth)}px`,
      '--lumi-image-width': `${Math.max(1, imageSize.width)}px`,
      '--lumi-image-height': `${Math.max(1, imageSize.height)}px`,
      ...style,
    } as React.CSSProperties);
    return (
      <div
        {...props}
        ref={ref}
        className={cn('lumi-images-badge', className)}
        data-size={size}
        data-position={textPosition}
        style={visualStyle}
      >
        {href ? (
          <a
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="lumi-images-content"
          >
            {content}
          </a>
        ) : (
          <span className="lumi-images-content">{content}</span>
        )}
      </div>
    );
  },
);
ImagesBadge.displayName = 'ImagesBadge';
