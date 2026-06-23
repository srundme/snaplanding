import { motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";

const stats = [
  { value: "3-layer", label: "Memory Architecture" },
  { value: "<200ms", label: "Drop Detection" },
  { value: "20+", label: "Providers Supported" },
  { value: "99.9%", label: "Uptime" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-px bg-[#27272a] md:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 0.05}
          className="group relative overflow-hidden bg-black px-6 py-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/0 to-[#14B8A6]/0 transition-all duration-500 group-hover:from-[#FF9933]/5 group-hover:to-[#14B8A6]/5" />
          <motion.p
            className="relative font-mono text-2xl font-medium text-white tabular-nums"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            {stat.value}
          </motion.p>
          <p className="relative mt-1 text-xs text-[#52525b]">{stat.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
