import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LATENCY_MIN = 600;
const LATENCY_MAX = 2800;
const RETENTION_MIN = 84;
const RETENTION_MAX = 100;

const MEMORY_DATA = [
  { name: "snapserve", latency: 680, retention: 97.2, color: "#14B8A6", shape: "circle", highlight: true },
  { name: "gpt-4.1", latency: 910, retention: 91.4, color: "#ef4444", shape: "circle" },
  { name: "claude-sonnet", latency: 1680, retention: 96.1, color: "#a855f7", shape: "circle" },
  { name: "nova-2-pro", latency: 1040, retention: 87.8, color: "#06b6d4", shape: "square" },
  { name: "gpt-realtime", latency: 1320, retention: 85.2, color: "#22c55e", shape: "square" },
  { name: "stateless-stack", latency: 2400, retention: 82.5, color: "#f97316", shape: "square" },
];

const LANG_DATA = [
  { name: "snapserve", latency: 720, retention: 98.4, color: "#14B8A6", shape: "circle", highlight: true },
  { name: "gpt-4.1", latency: 980, retention: 86.2, color: "#ef4444", shape: "circle" },
  { name: "claude-sonnet", latency: 1550, retention: 84.8, color: "#a855f7", shape: "circle" },
  { name: "nova-2-pro", latency: 1100, retention: 79.5, color: "#06b6d4", shape: "square" },
  { name: "gpt-realtime", latency: 1280, retention: 76.1, color: "#22c55e", shape: "square" },
  { name: "stateless-stack", latency: 2200, retention: 71.3, color: "#f97316", shape: "square" },
];

function mapPoint(latency, retention, cw, ch) {
  const px = ((LATENCY_MAX - latency) / (LATENCY_MAX - LATENCY_MIN)) * cw;
  const py = ((RETENTION_MAX - retention) / (RETENTION_MAX - RETENTION_MIN)) * ch;
  return { px: Math.max(0, Math.min(cw, px)), py: Math.max(0, Math.min(ch, py)) };
}

function labelOffset(point, cw, ch) {
  const right = point.px > cw * 0.55;
  const top = point.py < ch * 0.35;
  const bottom = point.py > ch * 0.65;
  if (right && top) return { dx: -8, dy: -14, anchor: "end", baseline: "auto" };
  if (right && bottom) return { dx: -8, dy: 16, anchor: "end", baseline: "hanging" };
  if (right) return { dx: -8, dy: 4, anchor: "end", baseline: "middle" };
  if (top) return { dx: 10, dy: -12, anchor: "start", baseline: "auto" };
  return { dx: 10, dy: 4, anchor: "start", baseline: "middle" };
}

export default function ComparisonChart() {
  const [tab, setTab] = useState("memory");
  const data = tab === "memory" ? MEMORY_DATA : LANG_DATA;
  const yLabel = tab === "memory" ? "Context Retention" : "Multilingual Accuracy";

  const W = 720;
  const H = 400;
  const pad = { t: 28, r: 24, b: 56, l: 64 };
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;

  const ticks = useMemo(
    () => ({
      x: [2800, 2200, 1600, 1000, 600],
      y: [84, 88, 92, 96, 100],
    }),
    []
  );

  return (
    <div>
      <div className="inline-flex rounded-full border border-[#27272a] bg-[#111] p-1">
        {[
          ["memory", "Memory vs Latency"],
          ["lang", "Multilingual Score"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              tab === id ? "tab-active shadow-[0_0_20px_rgba(20,184,166,0.15)]" : "tab-inactive"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[#27272a] bg-[#050505] p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px]">
          <rect x={pad.l} y={pad.t} width={cw} height={ch} fill="#0a0a0a" stroke="#27272a" rx="6" />

          {ticks.y.map((v) => {
            const y = pad.t + mapPoint(LATENCY_MIN, v, cw, ch).py;
            return (
              <g key={`y-${v}`}>
                <line x1={pad.l} y1={y} x2={pad.l + cw} y2={y} stroke="#1a1a1a" strokeWidth="1" />
                <text x={pad.l - 8} y={y + 4} textAnchor="end" fill="#52525b" fontSize="10" fontFamily="JetBrains Mono">
                  {v}%
                </text>
              </g>
            );
          })}
          {ticks.x.map((v) => {
            const x = pad.l + mapPoint(v, RETENTION_MIN, cw, ch).px;
            return (
              <g key={`x-${v}`}>
                <line x1={x} y1={pad.t} x2={x} y2={pad.t + ch} stroke="#1a1a1a" strokeWidth="1" />
                <text x={x} y={pad.t + ch + 18} textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="JetBrains Mono">
                  {v}ms
                </text>
              </g>
            );
          })}

          <text x={pad.l + 12} y={pad.t + 16} fill="#52525b" fontSize="11">Slow &amp; Smart</text>
          <text x={pad.l + cw - 100} y={pad.t + 16} fill="#52525b" fontSize="11">Fast &amp; Smart</text>
          <text x={pad.l + 12} y={pad.t + ch - 8} fill="#52525b" fontSize="11">Slow &amp; Basic</text>
          <text x={pad.l + cw - 100} y={pad.t + ch - 8} fill="#52525b" fontSize="11">Fast &amp; Basic</text>

          <text x={pad.l + cw / 2} y={H - 12} textAnchor="middle" fill="#71717a" fontSize="12">
            Response Time (faster →)
          </text>
          <text
            x={16}
            y={pad.t + ch / 2}
            textAnchor="middle"
            fill="#71717a"
            fontSize="12"
            transform={`rotate(-90, 16, ${pad.t + ch / 2})`}
          >
            {yLabel}
          </text>

          <AnimatePresence mode="wait">
            <motion.g
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {data.map((d, i) => {
                const point = mapPoint(d.latency, d.retention, cw, ch);
                const cx = pad.l + point.px;
                const cy = pad.t + point.py;
                const lo = labelOffset(point, cw, ch);

                return (
                  <motion.g
                    key={d.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {d.highlight && (
                      <>
                        <motion.circle
                          cx={cx}
                          cy={cy}
                          r="20"
                          fill="none"
                          stroke="#14B8A6"
                          strokeWidth="1"
                          opacity="0.25"
                          animate={{ r: [18, 26, 18], opacity: [0.15, 0.35, 0.15] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                        <motion.circle
                          cx={cx}
                          cy={cy}
                          r="12"
                          fill="none"
                          stroke="#FF9933"
                          strokeWidth="1"
                          opacity="0.45"
                          animate={{ r: [10, 16, 10] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                        />
                      </>
                    )}
                    {d.shape === "circle" ? (
                      <circle cx={cx} cy={cy} r="5" fill={d.color} />
                    ) : (
                      <rect x={cx - 5} y={cy - 5} width="10" height="10" fill={d.color} rx="1" />
                    )}
                    <text
                      x={cx + lo.dx}
                      y={cy + lo.dy}
                      textAnchor={lo.anchor}
                      dominantBaseline={lo.baseline}
                      fill="#a1a1aa"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {d.name}
                    </text>
                  </motion.g>
                );
              })}
            </motion.g>
          </AnimatePresence>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <div
              className={d.shape === "circle" ? "h-2 w-2 rounded-full" : "h-2 w-2"}
              style={{ backgroundColor: d.color }}
            />
            <span className="font-mono text-[11px] text-[#71717a]">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
