import type { CSSProperties } from 'react';

export type GlowColor = 'peach' | 'violet' | 'blue' | 'mint';
export type GlowIntensity = 'none' | 'subtle' | 'normal' | 'intense';
export type LuminescentStyle = CSSProperties & {
  [key: `--lumi-${string}`]: string | number | undefined;
};

export const glowColors: Record<GlowColor, string> = {
  peach: '255, 170, 102',
  violet: '192, 155, 255',
  blue: '125, 190, 255',
  mint: '110, 231, 183',
};

export function glowStyle(color?: GlowColor, style?: CSSProperties): LuminescentStyle {
  return { ...(color ? { '--lumi-color': glowColors[color] } : {}), ...style };
}
