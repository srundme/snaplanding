import { motion, useReducedMotion } from "framer-motion";

const W = 400;
const H = 200;

function wavePath(phase = 0, amp = 28, freq = 2.2) {
  const pts = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    const t = (i / steps) * Math.PI * freq + phase;
    const y = H / 2 + Math.sin(t) * amp + Math.sin(t * 2.3) * (amp * 0.35);
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function areaPath(phase, amp, freq) {
  return `${wavePath(phase, amp, freq)} L ${W} ${H} L 0 ${H} Z`;
}

export default function WaveformGrid() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden bg-[#050505] p-8">
      {/* Subtle dot field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #27272a 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Soft brand glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14B8A6]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-32 w-32 rounded-full bg-[#FF9933]/8 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
          <span>Call 1 — context captured</span>
          <span className="text-[#3f3f46]">→</span>
          <span className="text-[#71717a]">Call 2 — without memory</span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="wave-fill-a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-stroke-a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <linearGradient id="wave-stroke-b" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
            <linearGradient id="gap-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#050505" stopOpacity="0" />
              <stop offset="50%" stopColor="#050505" stopOpacity="1" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0" />
            </linearGradient>
            <clipPath id="wave-left">
              <rect x="0" y="0" width={W * 0.46} height={H} />
            </clipPath>
            <clipPath id="wave-right">
              <rect x={W * 0.54} y="0" width={W * 0.46} height={H} />
            </clipPath>
          </defs>

          {/* Baseline */}
          <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#27272a" strokeWidth="1" />

          {/* Gap divider */}
          <rect
            x={W * 0.46}
            y="0"
            width={W * 0.08}
            height={H}
            fill="url(#gap-fade)"
          />

          {/* Rich call — memory present */}
          <g clipPath="url(#wave-left)">
            <motion.path
              d={areaPath(0, 32, 2.4)}
              fill="url(#wave-fill-a)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={wavePath(0, 32, 2.4)}
              fill="none"
              stroke="url(#wave-stroke-a)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reduce && (
              <motion.path
                d={wavePath(0, 32, 2.4)}
                fill="none"
                stroke="#14B8A6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 12"
                initial={{ pathLength: 1, strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -80 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                opacity={0.5}
              />
            )}
          </g>

          {/* New call — flat / disconnected */}
          <g clipPath="url(#wave-right)">
            <motion.path
              d={wavePath(1.2, 10, 3.8)}
              fill="none"
              stroke="url(#wave-stroke-b)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>

          {/* Memory break marker */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <circle cx={W / 2} cy={H / 2} r="14" fill="#0a0a0a" stroke="#27272a" strokeWidth="1" />
            <path
              d={`M ${W / 2 - 4} ${H / 2 - 4} L ${W / 2 + 4} ${H / 2 + 4} M ${W / 2 + 4} ${H / 2 - 4} L ${W / 2 - 4} ${H / 2 + 4}`}
              stroke="#52525b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        <p className="mt-4 text-center text-xs text-[#52525b]">
          Context lost between calls — unless SnapServe remembers it.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}
