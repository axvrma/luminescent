export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
export function rangeBounds(min: number, max: number) {
  const lower = Number.isFinite(min) ? min : 0;
  return [lower, Number.isFinite(max) ? Math.max(lower, max) : Math.max(lower, 100)] as const;
}
export function snap(value: number, min: number, max: number, step: number | 'any') {
  const bounded = clamp(value, min, max);
  if (step === 'any') return bounded;
  const increment = Number.isFinite(step) && step > 0 ? step : 1;
  return clamp(
    Number((min + Math.round((bounded - min) / increment) * increment).toFixed(10)),
    min,
    max,
  );
}
