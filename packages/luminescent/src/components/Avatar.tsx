import React from 'react';
import { cn } from '../lib/classes';
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt: string;
  fallback?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => {
    const [failedSource, setFailedSource] = React.useState<string>();
    const initials = alt
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
    return (
      <span
        {...props}
        ref={ref}
        role="img"
        aria-label={alt}
        className={cn('lumi-avatar', className)}
        data-size={size}
      >
        <span aria-hidden="true">{fallback ?? initials}</span>
        {src && src !== failedSource && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            onError={() => setFailedSource(src)}
            className="lumi-avatar-image"
          />
        )}
      </span>
    );
  },
);
Avatar.displayName = 'Avatar';
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  label?: string;
}
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 5, label = 'People', children, className, ...props }, ref) => {
    const avatars = React.Children.toArray(children);
    const limit = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
    return (
      <div
        {...props}
        ref={ref}
        role="group"
        aria-label={label}
        className={cn('lumi-avatar-group', className)}
      >
        {avatars.slice(0, limit)}
        {avatars.length > limit && (
          <span
            className="lumi-avatar"
            role="img"
            aria-label={`${avatars.length - limit} more people`}
          >
            +{avatars.length - limit}
          </span>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';
