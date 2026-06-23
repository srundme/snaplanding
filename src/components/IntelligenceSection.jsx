import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const promptLines = [
  "You are a helpful agent.",
  "If call drops, say sorry.",
  "Ask for policy number.",
  "Ask for language preference.",
  "Start from hello every time.",
];

const brainNodes = [
  "Caller asked: call back if we drop",
  "Last topic: IL-28491 renewal",
  "Regional language detected: Telugu",
  "Disposition: send payment link",
  "Action: auto-outbound in 0.8s",
];

export default function IntelligenceSection() {
  return (
    <div className="bento-border border-b">
      <div className="bento-border border-b px-8 pt-8 md:px-12 md:pt-12">
        <Reveal>
          <p className="label">Not a system prompt. A brain.</p>
          <h2 className="headline-lg mt-2">
            Stateless agents follow scripts.{" "}
            <span className="brand-gradient-text">SnapServe agents reason.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2">
        <Stagger className="p-8 md:p-12 lg:p-14" stagger={0.08}>
          <StaggerItem>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#52525b]">
              Typical voice AI
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-[#27272a] bg-[#0a0a0a] p-5 font-mono text-[12px] leading-relaxed">
              {promptLines.map((line, i) => (
                <motion.p
                  key={line}
                  className="text-[#52525b]"
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-[#3f3f46]">{"> "}</span>
                  {line}
                </motion.p>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-sm text-[#71717a]">
              Drop the call → caller phones back → agent starts over. Every time.
            </p>
          </StaggerItem>
        </Stagger>

        <div className="relative border-t border-[#27272a] p-8 md:border-t-0 md:border-l md:p-12 lg:p-14">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#14B8A6]">
            SnapServe orchestration
          </p>

          <div className="relative space-y-2">
            {brainNodes.map((node, i) => (
              <motion.div
                key={node}
                className="flex items-center gap-3 rounded-lg border border-[#14B8A6]/20 bg-[#14B8A6]/5 px-4 py-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ borderColor: "rgba(20,184,166,0.5)", x: 4 }}
              >
                <motion.span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/20 text-[10px] text-[#14B8A6]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
                >
                  {i + 1}
                </motion.span>
                <span className="text-sm text-[#d4d4d8]">{node}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 rounded-xl border border-[#FF9933]/30 bg-[#FF9933]/5 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-mono text-[11px] text-[#FF9933]">AUTO-ACTION</p>
            <p className="mt-1 text-sm text-white">
              Network drop detected → outbound callback in 0.8s → resume with full context
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
