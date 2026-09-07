import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  y = 20,
  blur = 6,
  once = true,
}) {
  const reduce = useReducedMotion();
  const StaticTag = as;
  const MotionTag = as === "li" ? motion.li : motion.div;

  if (reduce) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({ children, className = "", stagger = 0.1 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", style }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.62, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function DrawBorder({ className = "" }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={`h-px bg-[#27272a] ${className}`} />;
  }

  return (
    <motion.div
      className={`h-px origin-left bg-gradient-to-r from-[#FF9933]/50 via-[#14B8A6]/50 to-transparent ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
    />
  );
}
