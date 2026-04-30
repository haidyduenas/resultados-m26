import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Tweens a numeric value from 0 to `target` using rAF + ease-out cubic.
 * Returns the current intermediate value.
 */
export function useAnimatedValue(target, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    if (target === null || target === undefined || Number.isNaN(target)) {
      setValue(0);
      return undefined;
    }

    const from = 0;
    const to = Number(target);
    let start = null;

    const tick = (t) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      setValue(from + (to - from) * easeOutCubic(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}
