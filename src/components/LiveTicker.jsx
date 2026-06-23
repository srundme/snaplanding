import { useEffect, useState } from "react";
import { LANGUAGE_COUNT } from "../lib/languages";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { label: "Calls with memory", value: 2847193, suffix: "+" },
  { label: "Reconnect time", value: 0.8, suffix: "s" },
  { label: "Regional languages", value: LANGUAGE_COUNT, suffix: "" },
  { label: "Uptime", value: 99.9, suffix: "%" },
];

function format(n, suffix) {
  if (suffix === "s") return `${n.toFixed(1)}s`;
  if (suffix === "%") return `${n.toFixed(1)}%`;
  if (suffix === "ms") return `${Math.round(n)}ms`;
  if (suffix === "+") {
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
    return String(n);
  }
  return String(n);
}

export default function LiveTicker() {
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="grid grid-cols-2 gap-px bg-[#27272a] md:grid-cols-4">
      {stats.map((stat, i) => {
        const display =
          stat.suffix === "+"
            ? `${format(stat.value + tick * 47, "+")}+`
            : format(stat.value, stat.suffix);

        return (
          <motion.div
            key={stat.label}
            className="group relative overflow-hidden bg-black px-6 py-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/0 to-[#14B8A6]/0 transition-all duration-500 group-hover:from-[#FF9933]/5 group-hover:to-[#14B8A6]/5" />
            <p className="relative font-mono text-2xl font-medium text-white tabular-nums">
              {display}
            </p>
            <p className="relative mt-1 text-xs text-[#52525b]">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
