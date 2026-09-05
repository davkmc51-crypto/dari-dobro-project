import { useEffect, useRef, useState } from 'react';

/**
 * Анимированный счётчик от 0 до target, запускается один раз,
 * когда элемент появляется во вьюпорте.
 */
export function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(targetRef.current * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration]);

  useEffect(() => {
    if (started.current) setValue(target);
  }, [target]);

  return { ref, value };
}

export default useCountUp;