import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[100] h-[400px] w-[400px] rounded-full opacity-0 mix-blend-screen lg:opacity-100"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background:
          "radial-gradient(circle, rgba(20,184,166,0.06) 0%, rgba(255,153,51,0.03) 40%, transparent 70%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    />
  );
}
