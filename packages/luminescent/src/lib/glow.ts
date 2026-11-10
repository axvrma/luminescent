import type { CSSProperties } from 'react';

export type GlowColor = 'peach' | 'violet' | 'blue' | 'mint';

const colors: Record<GlowColor, string> = {
  peach: '255, 170, 102',
  violet: '192, 155, 255',
  blue: '125, 190, 255',
  mint: '110, 231, 183',
};

export function glowStyle(color: GlowColor = 'peach', style?: CSSProperties): CSSProperties {
  return { '--lumi-color': colors[color], ...style } as CSSProperties;
}
