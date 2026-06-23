import { motion, useReducedMotion } from "framer-motion";

const curves = [
  { d: "M0 120 C80 40, 160 200, 280 80 S 400 160, 480 60", delay: 0, opacity: 0.22 },
  { d: "M0 160 C100 220, 200 60, 320 140 S 440 40, 520 100", delay: 0.15, opacity: 0.16 },
  { d: "M0 80 C120 180, 240 20, 360 120 S 480 200, 560 90", delay: 0.3, opacity: 0.12 },
];

export default function Spectrogram({ className = "", animate = false }) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Aurora mesh */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-3/4 w-3/4 rounded-full bg-[#14B8A6]/10 blur-[80px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-[#FF9933]/8 blur-[70px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 560 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="spec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="55%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9933" />
          </linearGradient>
        </defs>

        {curves.map((curve, i) => (
          <motion.path
            key={i}
            d={curve.d}
            fill="none"
            stroke="url(#spec-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { pathLength: 1, opacity: curve.opacity }
                : { pathLength: 1, opacity: curve.opacity * 0.85 }
            }
            transition={{
              pathLength: { duration: 2, delay: curve.delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 1, delay: curve.delay },
            }}
          />
        ))}

        {/* Soft nodes — production network metaphor */}
        {[
          [140, 100],
          [280, 80],
          [400, 130],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="#14B8A6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
          />
        ))}
      </svg>

      {/* Readability fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
    </div>
  );
}
