import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const barRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const progress = h > 0 ? window.scrollY / h : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="fixed top-0 left-[200px] right-0 z-[60] hidden h-[2px] lg:block">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#14B8A6]/70 via-[#14B8A6] to-[#4C8DF6]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
