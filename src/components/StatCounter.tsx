import { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface StatCounterProps {
  end: number;
  suffix: string;
  prefix?: string;
}

export default function StatCounter({ end, suffix, prefix = '' }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, end, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
