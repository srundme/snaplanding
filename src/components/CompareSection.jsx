import { motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";

const rows = [
  ["Persistent Caller Memory", false, false, false, true],
  ["Structured Fact Extraction", false, false, false, true],
  ["Auto-Redial on Mid-Call Drop", false, false, false, true],
  ["Real-Time Caller Gender Detection", false, false, false, true],
  ["Native Booking Engine", false, false, false, true],
  ["Campaign Engine + Batches", true, "partial", "partial", true],
  ["Meta & Website Form Auto-Dial", false, false, false, true],
  ["Bring Your Own Provider Keys", true, true, true, true],
];

function CellMark({ value }) {
  if (value === true) return <span className="text-[#22c55e]">✓</span>;
  if (value === "partial") return <span className="text-[#fbbf24]">~</span>;
  return <span className="text-[#52525b]">✗</span>;
}

export default function CompareSection() {
  return (
    <section id="compare" className="bento-border border-b p-8 md:p-12 lg:p-14">
      <Reveal>
        <p className="label">vs Vapi · Bolna · Retell</p>
        <h2 className="headline-lg mt-3">Feature by feature</h2>
        <p className="body-text mt-3 max-w-xl">
          What they&apos;re missing that SnapServe ships today.
        </p>
      </Reveal>

      <div className="mt-10 overflow-x-auto rounded-xl border border-[#27272a]">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#111]">
              <th className="p-4 text-left font-medium text-[#71717a]">Feature</th>
              {["Vapi", "Bolna", "Retell", "SnapServe"].map((col, i) => (
                <th
                  key={col}
                  className={`p-4 text-center font-medium ${
                    i === 3
                      ? "bg-gradient-to-b from-[#14B8A6]/10 to-transparent text-white"
                      : "text-[#71717a]"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([feature, vapi, bolna, retell, snap], i) => (
              <motion.tr
                key={feature}
                className={`transition-colors hover:bg-white/[0.02] ${
                  i < rows.length - 1 ? "border-b border-[#27272a]" : ""
                }`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <td className="p-4 font-medium text-white">{feature}</td>
                <td className="p-4 text-center text-[#71717a]">
                  <CellMark value={vapi} />
                </td>
                <td className="p-4 text-center text-[#71717a]">
                  <CellMark value={bolna} />
                </td>
                <td className="p-4 text-center text-[#71717a]">
                  <CellMark value={retell} />
                </td>
                <td className="bg-[#14B8A6]/[0.03] p-4 text-center text-[#a1a1aa]">
                  <CellMark value={snap} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
