import { useCallback, useEffect, useState } from 'react';

export function useSlideState(totalSlides) {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, totalSlides - 1)),
    [totalSlides]
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const goTo = useCallback(
    (i) => setIndex(Math.max(0, Math.min(i, totalSlides - 1))),
    [totalSlides]
  );

  useEffect(() => {
    if (index > totalSlides - 1) setIndex(Math.max(0, totalSlides - 1));
  }, [totalSlides, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(totalSlides - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, totalSlides]);

  return { index, next, prev, goTo, total: totalSlides };
}
