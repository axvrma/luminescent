import { createContext, useContext, useSyncExternalStore } from 'react';
export const ReducedMotionContext = createContext(false);
const query = '(prefers-reduced-motion: reduce)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
export function useReducedMotion() {
  const reduced = useContext(ReducedMotionContext);
  const system = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  return reduced || system;
}
