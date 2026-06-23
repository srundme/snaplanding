import { motion, useReducedMotion } from "framer-motion";
import LanguagePills from "./LanguagePills";

const timeline = [
  { label: "Call 1", fact: "IL-28491 · Telugu", x: 48, y: 70, active: false },
  { label: "Call 2", fact: "Renewal Mar 15", x: 292, y: 175, active: false },
  { label: "Drop", fact: "Network lost", x: 170, y: 120, active: true, isDrop: true },
  { label: "Call 3", fact: "Auto-reconnected", x: 48, y: 310, active: false, isReconnect: true },
];

export default function MemoryThreads() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full min-h-[400px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.1)_0%,transparent_65%)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* Threads to memory core */}
        {[
          { x: 48, y: 70 },
          { x: 292, y: 175 },
          { x: 48, y: 310 },
        ].map((call, i) => (
          <g key={i}>
            <motion.path
              d={`M${call.x} ${call.y} Q 170 ${call.y * 0.45 + 90} 170 200`}
              fill="none"
              stroke="url(#thread-grad)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 1.2, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>
        ))}

        {/* Reconnect pulse from drop to call 3 */}
        {!reduce && (
          <motion.path
            d="M170 120 Q 100 200 48 310"
            fill="none"
            stroke="#FF9933"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          />
        )}

        <motion.circle
          cx="170"
          cy="200"
          r="30"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="1"
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle cx="170" cy="200" r="17" fill="#0a0a0a" stroke="url(#thread-grad)" strokeWidth="2" />
        <text x="170" y="204" textAnchor="middle" fill="#fafafa" fontSize="8" fontFamily="JetBrains Mono">
          MEM
        </text>

        {timeline.map((node, i) => (
          <g key={node.label}>
            <motion.rect
              x={node.x - 42}
              y={node.y - 26}
              width="84"
              height="52"
              rx="10"
              fill={node.isDrop ? "#1a0a0a" : node.isReconnect ? "#0a1a14" : "#111"}
              stroke={node.isDrop ? "#ef4444" : node.isReconnect ? "#14B8A6" : "#27272a"}
              strokeWidth={node.isDrop || node.isReconnect ? 1.5 : 1}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.12 }}
            />
            <text x={node.x} y={node.y - 8} textAnchor="middle" fill={node.isDrop ? "#ef4444" : node.isReconnect ? "#14B8A6" : "#71717a"} fontSize="8" fontFamily="Inter">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 10} textAnchor="middle" fill="#a1a1aa" fontSize="7" fontFamily="JetBrains Mono">
              {node.fact}
            </text>
          </g>
        ))}
      </svg>

      <motion.div
        className="absolute right-4 top-4 rounded-lg border border-[#FF9933]/30 bg-black/80 px-3 py-2 backdrop-blur-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="font-mono text-[9px] text-[#FF9933]">SMART RECONNECT</p>
        <p className="text-xs font-medium text-white">&lt; 1s callback</p>
      </motion.div>

      <LanguagePills className="absolute bottom-4 left-0 right-0" />
    </div>
  );
}
