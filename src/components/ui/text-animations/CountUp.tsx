import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  separator?: string;
};

export default function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 1.4,
  className = "",
  prefix = "",
  suffix = "",
  separator = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 28,
    stiffness: Math.max(40, 120 / duration),
  });
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const formatValue = useCallback(
    (latest: number) => {
      const rounded = Math.round(latest);
      const formatted = separator
        ? Intl.NumberFormat("en-US").format(rounded).replace(/,/g, separator)
        : String(rounded);
      return `${prefix}${formatted}${suffix}`;
    },
    [prefix, suffix, separator],
  );

  useEffect(() => {
    if (!ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = formatValue(to);
      return;
    }
    ref.current.textContent = formatValue(from);
  }, [from, to, formatValue, reduceMotion]);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const timeoutId = window.setTimeout(() => {
      motionValue.set(to);
    }, delay * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [isInView, reduceMotion, motionValue, to, delay]);

  useEffect(() => {
    if (reduceMotion) return;
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsubscribe();
  }, [springValue, formatValue, reduceMotion]);

  return <span ref={ref} className={className} />;
}
