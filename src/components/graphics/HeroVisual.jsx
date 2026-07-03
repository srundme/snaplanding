import { motion } from "framer-motion";
import LanguagePills from "./LanguagePills";

const transcript = [
  { who: "Caller", text: "Mera policy renew kab hai? IL-28491." },
  { who: "Agent", text: "Karthik ji — your ICICI renewal is March 15. Shall I send the payment link?" },
];

const orchestrationSteps = [
  { label: "Provider", value: "Sarvam · Cartesia", color: "#52525b" },
  { label: "SnapServe", value: "orchestrating", color: "#14B8A6", active: true },
  { label: "Agent", value: "live call", color: "#52525b" },
];

const memoryFacts = [
  { label: "Policy", value: "IL-28491" },
  { label: "Renewal", value: "March 15" },
  { label: "Insurer", value: "ICICI Lombard" },
  { label: "Language", value: "Hindi + English" },
];

export default function HeroVisual() {
  return (
    <div className="relative isolate flex h-full min-h-[420px] items-center justify-center overflow-hidden bg-black p-6 md:min-h-[480px] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(20,184,166,0.12)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,153,51,0.06)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-md space-y-3">
        {/* Orchestration flow */}
        <motion.div
          className="rounded-xl border border-[#27272a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#52525b]">
              Orchestration layer
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#14B8A6]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14B8A6] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
              </span>
              LIVE
            </span>
          </div>
          <div className="flex items-center gap-1">
            {orchestrationSteps.map((step, i) => (
              <div key={step.label} className="flex flex-1 items-center gap-1">
                <div
                  className={`flex-1 rounded-lg border px-2 py-2 text-center ${
                    step.active
                      ? "border-[#14B8A6]/40 bg-[#14B8A6]/10"
                      : "border-[#27272a] bg-[#111]"
                  }`}
                >
                  <p className="font-mono text-[8px] uppercase text-[#52525b]">{step.label}</p>
                  <p
                    className="mt-0.5 truncate text-[10px] font-medium"
                    style={{ color: step.active ? "#14B8A6" : "#a1a1aa" }}
                  >
                    {step.value}
                  </p>
                </div>
                {i < orchestrationSteps.length - 1 && (
                  <span className="text-[#3f3f46]">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center font-mono text-[9px] text-[#14B8A6]">
            memory_inject · 28ms · caller context loaded
          </p>
        </motion.div>

        {/* Live call */}
        <motion.div
          className="rounded-2xl border border-[#27272a] bg-[#0a0a0a]/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              <span className="font-mono text-[11px] text-[#a1a1aa]">Inbound · Insurance renewal</span>
            </div>
            <span className="font-mono text-[10px] text-[#52525b]">02:14</span>
          </div>
          {transcript.map((line, i) => (
            <motion.div
              key={line.text}
              className={`mb-2 last:mb-0 ${line.who === "Agent" ? "border-l border-[#14B8A6]/40 pl-3" : ""}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.2 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#52525b]">
                {line.who}
              </p>
              <p className="mt-0.5 text-sm leading-snug text-[#d4d4d8]">{line.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Memory layer */}
        <motion.div
          className="rounded-2xl border border-[#14B8A6]/25 bg-[#0a0a0a]/95 p-4 shadow-[0_0_40px_rgba(20,184,166,0.08)] backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#71717a]">Caller memory · orchestrated</span>
            <span className="rounded-full bg-[#14B8A6]/15 px-2 py-0.5 font-mono text-[9px] text-[#14B8A6]">
              12 facts · 8 calls
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {memoryFacts.map((f, i) => (
              <motion.div
                key={f.label}
                className="rounded-lg border border-[#27272a] bg-[#111] px-3 py-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.06 }}
              >
                <span className="block font-mono text-[8px] uppercase text-[#52525b]">
                  {f.label}
                </span>
                <span className="text-xs font-medium text-white">{f.value}</span>
              </motion.div>
            ))}
          </div>
          <LanguagePills className="mt-3" />
        </motion.div>
      </div>
    </div>
  );
}
