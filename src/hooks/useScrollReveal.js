import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', delay = 0 } = options;

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const d = parseInt(el.dataset.delay || '0');
            setTimeout(() => el.classList.add('up'), d);
          }
        });
      },
      { threshold, rootMargin }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);
}

export function useRevealRef(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('up');
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
