/** Shared opt-in spring presets for consumer animations. */
export const motionPresets = {
  gentle: { type: 'spring', stiffness: 220, damping: 26, mass: 1 },
  responsive: { type: 'spring', stiffness: 450, damping: 35, mass: 0.8 },
} as const;
