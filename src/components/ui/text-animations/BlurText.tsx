import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  onAnimationComplete?: () => void;
  as?: "p" | "span" | "h2" | "h3";
};

function buildKeyframes(
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
) {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const keyframes: Record<string, Array<string | number | undefined>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
}

export default function BlurText({
  text = "",
  delay = 80,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.15,
  rootMargin = "0px",
  stepDuration = 0.28,
  onAnimationComplete,
  as: Tag = "p",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduceMotion]);

  const defaultFrom = useMemo(
    () =>
      reduceMotion
        ? { filter: "blur(0px)", opacity: 1, y: 0 }
        : direction === "top"
          ? { filter: "blur(8px)", opacity: 0, y: -18 }
          : { filter: "blur(8px)", opacity: 0, y: 18 },
    [direction, reduceMotion],
  );

  const defaultTo = useMemo(
    () =>
      reduceMotion
        ? [{ filter: "blur(0px)", opacity: 1, y: 0 }]
        : [
            {
              filter: "blur(3px)",
              opacity: 0.55,
              y: direction === "top" ? 4 : -4,
            },
            { filter: "blur(0px)", opacity: 1, y: 0 },
          ],
    [direction, reduceMotion],
  );

  const stepCount = defaultTo.length + 1;
  const totalDuration = reduceMotion ? 0 : stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  return (
    <Tag ref={ref as never} className={className}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);
        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: reduceMotion ? 0 : (index * delay) / 1000,
          ease: "easeOut",
        };

        return (
          <motion.span
            key={`${segment}-${index}`}
            initial={defaultFrom}
            animate={inView ? animateKeyframes : defaultFrom}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: "inline-block",
              willChange: reduceMotion ? undefined : "transform, filter, opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
          </motion.span>
        );
      })}
    </Tag>
  );
}
