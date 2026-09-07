import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

/**
 * Scroll-triggered stagger for stat rows / grids — respects reduced motion.
 */
export default function GsapFadeStagger({
  children,
  className = "",
  childSelector = "[data-stagger-item]",
  y = 22,
}) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(childSelector, rootRef.current);
      if (!items.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
