import { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface StatCounterProps {
  end: number;
  suffix: string;
  prefix?: string;
}

export default function StatCounter({ end, suffix, prefix = '' }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView || !numRef.current) return;

    const controls = animate(0, end, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(value) {
        if (numRef.current) {
          numRef.current.textContent = Math.round(value).toLocaleString();
        }
      },
    });

    return () => controls.stop();
  }, [isInView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}
