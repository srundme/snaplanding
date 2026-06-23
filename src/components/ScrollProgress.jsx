import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="fixed top-0 left-[200px] right-0 z-[60] hidden h-[2px] lg:block">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#FF9933] via-[#14B8A6] to-[#6366f1]"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
