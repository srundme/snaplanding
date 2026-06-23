import { motion } from "framer-motion";
import LanguagePills from "./LanguagePills";
import { callerProfile, displayFacts, factCount } from "../../lib/sampleCallLog";

const transcript = [
  { who: "Caller", text: "Tambaram-la villa irukka? Budget 75 lakhs." },
  { who: "Agent", text: "Yes Karthik — I have your plot search in Red Hills saved too." },
];

export default function HeroVisual() {
  return (
    <div className="relative isolate flex h-full min-h-[420px] items-center justify-center overflow-hidden bg-black p-8 md:min-h-[480px] md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(20,184,166,0.12)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,153,51,0.06)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-md space-y-4">
        {/* Live call card */}
        <motion.div
          className="rounded-2xl border border-[#27272a] bg-[#0a0a0a]/90 p-5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              <span className="font-mono text-[11px] text-[#a1a1aa]">Live call</span>
            </div>
            <span className="font-mono text-[10px] text-[#52525b]">00:19</span>
          </div>
          {transcript.map((line, i) => (
            <motion.div
              key={line.text}
              className={`mb-2 last:mb-0 ${line.who === "Agent" ? "pl-3 border-l border-[#14B8A6]/40" : ""}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.25 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#52525b]">{line.who}</p>
              <p className="mt-0.5 text-sm leading-snug text-[#d4d4d8]">{line.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Memory inject arrow */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#14B8A6]/50" />
          <span className="font-mono text-[10px] text-[#14B8A6]">memory saved</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#14B8A6]/50" />
        </motion.div>

        {/* Memory preview card */}
        <motion.div
          className="rounded-2xl border border-[#14B8A6]/25 bg-[#0a0a0a]/95 p-5 shadow-[0_0_40px_rgba(20,184,166,0.08)] backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#71717a]">Caller memory</span>
            <span className="rounded-full bg-[#14B8A6]/15 px-2 py-0.5 font-mono text-[9px] text-[#14B8A6]">
              {factCount} facts · {callerProfile.callCount} calls
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {displayFacts.slice(0, 4).map((f, i) => (
              <motion.span
                key={f.label}
                className="rounded-lg border border-[#27272a] bg-[#111] px-3 py-1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              >
                <span className="block font-mono text-[8px] uppercase text-[#52525b]">{f.label}</span>
                <span className="text-xs font-medium text-white">{f.value}</span>
              </motion.span>
            ))}
          </div>
          <LanguagePills className="mt-4" />
        </motion.div>
      </div>
    </div>
  );
}
