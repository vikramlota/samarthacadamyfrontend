import { useEffect, useState, useRef } from 'react';

// Hook to detect when element enters viewport
export const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Hook to animate numbers — uses rAF + easeOutCubic, works for any target value
export const useCounter = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();
  const counted = useRef(false);

  useEffect(() => {
    if (isVisible && !counted.current) {
      counted.current = true;
      if (!end || end <= 0) { setCount(end || 0); return; }

      const startTime = performance.now();
      let raf;

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setCount(Math.round(eased * end));
        if (progress < 1) raf = requestAnimationFrame(step);
      };

      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }
  }, [isVisible, end, duration]);

  return [ref, count];
};