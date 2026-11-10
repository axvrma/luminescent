import { useEffect, type RefObject } from 'react';

/** Native form reset also resets state-backed, uncontrolled controls. */
export function useFormReset(
  ref: RefObject<HTMLInputElement | HTMLButtonElement | null>,
  reset: () => void,
) {
  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const onReset = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented) reset();
      });
    };
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, [ref, reset]);
}
